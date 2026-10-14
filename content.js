/**
 * LinkVault - Smart Autofill Content Script
 * Manifest V3 - Vanilla JavaScript
 * Responsibilities:
 * 1. Safely discover form fields on the active webpage.
 * 2. Analyze semantic clues (labels, placeholders, names, aria attributes).
 * 3. Match fields with user-saved profile links.
 * 4. Respect safety rules: skip passwords/payments/hidden fields, never overwrite without permission.
 * 5. Trigger synthetic input & change events for modern reactive frameworks (React, Vue, etc.).
 * 6. Provide visual feedback and return structured summary.
 */

(() => {
  // Guard against multiple injection
  if (window.__LINKVAULT_CONTENT_SCRIPT_LOADED__) {
    return;
  }
  window.__LINKVAULT_CONTENT_SCRIPT_LOADED__ = true;

  // Sensitive keywords to strictly ignore
  const SENSITIVE_KEYWORDS = [
    'password', 'pass', 'pwd', 'card', 'cvv', 'cvc', 'credit', 'debit',
    'ssn', 'social_sec', 'socialsecurity', 'otp', 'pin', 'token', 'captcha',
    'auth', 'security_code', 'account_number', 'routing', 'iban', 'secret'
  ];

  // Disallowed input types
  const DISALLOWED_TYPES = [
    'password', 'hidden', 'checkbox', 'radio', 'submit', 'reset',
    'button', 'image', 'file', 'color', 'range', 'date', 'datetime-local',
    'month', 'time', 'week', 'number'
  ];

  /**
   * Listen for messages from popup or background
   */
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'AUTOFILL_PAGE') {
      try {
        const result = executeSmartAutofill(message.data, message.options || {});
        sendResponse(result);
      } catch (err) {
        console.error('[LinkVault] Autofill error:', err);
        sendResponse({
          success: false,
          error: err.message || 'An unexpected error occurred during autofill.',
          filledCount: 0,
          skippedCount: 0,
          filledFields: [],
          skippedFields: []
        });
      }
      return true;
    }

    if (message.action === 'PING') {
      sendResponse({ status: 'ready' });
      return true;
    }
  });

  /**
   * Main autofill execution logic
   */
  function executeSmartAutofill(profileData, options) {
    const allowOverwrite = Boolean(options.overwrite);
    const highlightElements = options.highlight !== false;
    const showNotification = options.showNotification !== false;

    // Collect all active profile links with valid URLs
    const availableLinks = getActiveLinksList(profileData);

    if (availableLinks.length === 0) {
      return {
        success: false,
        error: 'No saved links found in LinkVault with valid URLs. Please add your links first.',
        filledCount: 0,
        skippedCount: 0,
        filledFields: [],
        skippedFields: []
      };
    }

    // Find all candidate input elements on page
    const candidateInputs = findCandidateInputs();

    const filledFields = [];
    const skippedFields = [];
    const filledInputElements = [];

    // Track which profile link types have been filled to avoid assigning the same link multiple times unless needed
    const usedLinkIds = new Set();

    for (const input of candidateInputs) {
      const clues = extractFieldClues(input);

      // Check if clues match any available link
      const match = findBestMatchingLink(clues, availableLinks, usedLinkIds);

      if (!match) {
        // Unknown field - per requirement: never fill an unknown field with a guessed URL
        continue;
      }

      const displayName = clues.label || input.getAttribute('placeholder') || input.name || input.id || match.link.label;
      const currentValue = (input.value || '').trim();

      // Check non-empty field safety rule
      if (currentValue !== '') {
        // If current value is already identical to the URL, mark as skipped (already filled)
        if (currentValue.toLowerCase() === match.link.url.toLowerCase()) {
          skippedFields.push({
            label: match.link.label,
            fieldName: displayName,
            reason: 'Already contains this exact link'
          });
          continue;
        }

        // If not allowed to overwrite, respect user's data and skip
        if (!allowOverwrite) {
          skippedFields.push({
            label: match.link.label,
            fieldName: displayName,
            reason: 'Field already has a value (overwrite disabled)'
          });
          continue;
        }
      }

      // Fill the field
      const fillSuccess = setInputValue(input, match.link.url);
      if (fillSuccess) {
        filledFields.push({
          label: match.link.label,
          fieldName: displayName,
          url: match.link.url
        });
        filledInputElements.push(input);
        usedLinkIds.add(match.link.id);
      }
    }

    // Visual feedback
    if (highlightElements && filledInputElements.length > 0) {
      highlightFilledInputs(filledInputElements);
    }

    if (showNotification) {
      displayPageToast(filledFields.length, skippedFields.length);
    }

    return {
      success: true,
      totalScanned: candidateInputs.length,
      filledCount: filledFields.length,
      skippedCount: skippedFields.length,
      filledFields,
      skippedFields
    };
  }

  /**
   * Build unified array of links to test against form fields
   */
  function getActiveLinksList(profileData) {
    const list = [];
    if (!profileData) return list;

    // Standard preset links
    const presets = profileData.presets || {};
    const presetDefinitions = [
      {
        id: 'linkedin',
        keys: ['linkedin', 'linked in', 'linked_in', 'social_linkedin', 'linkedin.com', 'linkedin profile', 'linkedin url'],
        priority: 10
      },
      {
        id: 'github',
        keys: ['github', 'git hub', 'github.com', 'github profile', 'github url', 'git repo', 'github link', 'git profile'],
        priority: 10
      },
      {
        id: 'portfolio',
        keys: ['portfolio', 'portfolio url', 'portfolio link', 'portfolio website', 'sample work', 'work samples', 'projects url', 'project link', 'showcase'],
        priority: 9
      },
      {
        id: 'resume',
        keys: ['resume', 'cv', 'curriculum vitae', 'resume url', 'cv url', 'resume link', 'cv link', 'resume/cv', 'resume_url'],
        priority: 9
      },
      {
        id: 'instagram',
        keys: ['instagram', 'insta', 'ig profile', 'instagram url', 'ig link'],
        priority: 8
      },
      {
        id: 'website',
        // Generic website keys have lower priority so specific sites (linkedin, github, portfolio) match first
        keys: ['personal website', 'personal site', 'homepage', 'home page', 'blog url', 'personal url', 'website url', 'web page', 'website', 'site url', 'web address'],
        priority: 5
      }
    ];

    presetDefinitions.forEach(def => {
      const p = presets[def.id];
      if (p && p.url && p.url.trim() !== '') {
        list.push({
          id: def.id,
          label: p.label || def.id,
          url: p.url.trim(),
          matchKeys: def.keys,
          priority: def.priority
        });
      }
    });

    // Custom links
    const customLinks = profileData.customLinks || [];
    customLinks.forEach((c, idx) => {
      if (c && c.url && c.url.trim() !== '') {
        const labelKey = (c.label || '').toLowerCase().trim();
        const customKeys = [labelKey];
        if (c.keywords && Array.isArray(c.keywords)) {
          c.keywords.forEach(k => {
            if (k && k.trim()) customKeys.push(k.toLowerCase().trim());
          });
        }
        // Extract domain slug as fallback match key
        try {
          const u = new URL(c.url.startsWith('http') ? c.url : `https://${c.url}`);
          const domain = u.hostname.replace('www.', '').split('.')[0];
          if (domain && domain.length > 2 && !customKeys.includes(domain)) {
            customKeys.push(domain);
          }
        } catch (_) {}

        list.push({
          id: c.id || `custom_${idx}`,
          label: c.label || 'Custom Link',
          url: c.url.trim(),
          matchKeys: customKeys,
          priority: 7
        });
      }
    });

    return list;
  }

  /**
   * Find candidate inputs on page
   */
  function findCandidateInputs() {
    const rawElements = Array.from(document.querySelectorAll('input, textarea'));
    const validInputs = [];

    for (const el of rawElements) {
      if (isElementEligible(el)) {
        validInputs.push(el);
      }
    }

    return validInputs;
  }

  /**
   * Determine if an input is eligible for autofill
   */
  function isElementEligible(el) {
    if (!el || !(el instanceof HTMLElement)) return false;

    // Disabled or readonly
    if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') {
      return false;
    }
    if (el.hasAttribute('readonly') || el.readOnly) {
      return false;
    }

    // Check input type
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'input') {
      const type = (el.getAttribute('type') || 'text').toLowerCase();
      if (DISALLOWED_TYPES.includes(type)) {
        return false;
      }
    }

    // Ignore sensitive fields
    const sensitiveTokens = [
      el.id,
      el.name,
      el.getAttribute('autocomplete') || '',
      el.className || '',
      el.getAttribute('placeholder') || ''
    ].join(' ').toLowerCase();

    for (const kw of SENSITIVE_KEYWORDS) {
      if (sensitiveTokens.includes(kw)) {
        return false;
      }
    }

    // Visibility checks
    if (el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
      return false;
    }

    // Dimension check
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return false;
    }

    return true;
  }

  /**
   * Extract semantic clues from surrounding DOM
   */
  function extractFieldClues(input) {
    const clues = {
      label: '',
      placeholder: (input.getAttribute('placeholder') || '').trim(),
      name: (input.name || '').trim(),
      id: (input.id || '').trim(),
      ariaLabel: (input.getAttribute('aria-label') || '').trim(),
      ariaLabelledBy: '',
      containerText: '',
      autocomplete: (input.getAttribute('autocomplete') || '').trim(),
      allText: ''
    };

    // 1. Direct label association: <label for="id"> or input.labels
    if (input.labels && input.labels.length > 0) {
      clues.label = Array.from(input.labels).map(l => l.innerText || l.textContent).join(' ').trim();
    } else if (input.id) {
      const explicitLabel = document.querySelector(`label[for="${CSS.escape(input.id)}"]`);
      if (explicitLabel) {
        clues.label = (explicitLabel.innerText || explicitLabel.textContent || '').trim();
      }
    }

    // 2. Parent label wrapping input: <label>LinkedIn: <input /></label>
    if (!clues.label) {
      const parentLabel = input.closest('label');
      if (parentLabel) {
        // Clone and remove input to get label text only
        const clone = parentLabel.cloneNode(true);
        const childInputs = clone.querySelectorAll('input, select, textarea');
        childInputs.forEach(c => c.remove());
        clues.label = (clone.innerText || clone.textContent || '').trim();
      }
    }

    // 3. aria-labelledby
    const labelledById = input.getAttribute('aria-labelledby');
    if (labelledById) {
      const targetEl = document.getElementById(labelledById);
      if (targetEl) {
        clues.ariaLabelledBy = (targetEl.innerText || targetEl.textContent || '').trim();
      }
    }

    // 4. Surrounding container text (e.g. form-group, field, div with label-like text)
    const container = input.closest('.form-group, .form-row, .field, [class*="form-"], [class*="field-"], [class*="input-"], div, li, td');
    if (container) {
      const headingOrLabel = container.querySelector('label, dt, h4, h5, h6, strong, span.label, div.label');
      if (headingOrLabel && headingOrLabel !== input) {
        clues.containerText = (headingOrLabel.innerText || headingOrLabel.textContent || '').trim();
      }
    }

    // Aggregate cleaned search text
    const rawTokens = [
      clues.label,
      clues.ariaLabel,
      clues.ariaLabelledBy,
      clues.placeholder,
      clues.name,
      clues.id,
      clues.containerText,
      clues.autocomplete
    ].filter(Boolean).join(' ');

    clues.allText = normalizeString(rawTokens);
    return clues;
  }

  /**
   * Clean and normalize string for keyword matching
   */
  function normalizeString(str) {
    return str
      .toLowerCase()
      .replace(/[_\-./:]/g, ' ')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Find the single best matching LinkVault profile for an input field
   */
  function findBestMatchingLink(clues, availableLinks, usedLinkIds) {
    const text = clues.allText;
    if (!text || text.length < 2) return null;

    let bestMatch = null;
    let highestScore = 0;

    for (const link of availableLinks) {
      let score = 0;

      for (const key of link.matchKeys) {
        const cleanKey = normalizeString(key);
        if (!cleanKey) continue;

        // Exact token boundary matching or substring matching
        const regex = new RegExp(`(^|\\s)${escapeRegex(cleanKey)}(\\s|$)`, 'i');

        if (regex.test(text)) {
          // Strong match
          let keyScore = 10;

          // Bonus if found directly in label or placeholder
          const normLabel = normalizeString(clues.label + ' ' + clues.ariaLabel + ' ' + clues.placeholder);
          if (normLabel.includes(cleanKey)) {
            keyScore += 5;
          }

          // Bonus for link priority (e.g. linkedin > generic website)
          keyScore += (link.priority || 5);

          // If this link hasn't been used yet on this form, prefer it
          if (!usedLinkIds.has(link.id)) {
            keyScore += 2;
          }

          if (keyScore > score) {
            score = keyScore;
          }
        } else if (text.includes(cleanKey) && cleanKey.length >= 4) {
          // Substring match
          let subScore = 5 + (link.priority || 5);
          if (subScore > score) {
            score = subScore;
          }
        }
      }

      // Check for disqualifying collisions:
      // For instance: if the field explicitly says "github" or "linkedin", DO NOT match generic "website"
      if (link.id === 'website') {
        if (text.includes('linkedin') || text.includes('github') || text.includes('portfolio') || text.includes('resume') || text.includes('instagram')) {
          score = 0; // Invalidate generic website match when a specific platform is requested
        }
      }

      if (score > highestScore && score >= 10) {
        highestScore = score;
        bestMatch = {
          link,
          score
        };
      }
    }

    return bestMatch;
  }

  /**
   * Safely set input value and dispatch all necessary DOM events
   */
  function setInputValue(input, value) {
    try {
      input.focus();

      // Modern React / Angular / Vue safe value setter
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;

      const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;

      const setter = input instanceof HTMLTextAreaElement
        ? nativeTextAreaValueSetter
        : nativeInputValueSetter;

      if (setter) {
        setter.call(input, value);
      } else {
        input.value = value;
      }

      // Dispatch realistic synthetic events
      input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));

      return true;
    } catch (e) {
      console.warn('[LinkVault] Failed to set input value:', e);
      try {
        input.value = value;
        return true;
      } catch (_) {
        return false;
      }
    }
  }

  /**
   * Highlight autofilled inputs with an animated, accessible pulse
   */
  function highlightFilledInputs(elements) {
    // Inject highlight styles if not yet present
    const styleId = 'linkvault-autofill-styles';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        @keyframes linkvaultPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.6);
            border-color: #2563eb;
          }
          70% {
            box-shadow: 0 0 0 6px rgba(37, 99, 235, 0);
            border-color: #2563eb;
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }
        .linkvault-highlight-active {
          outline: 2px solid #2563eb !important;
          outline-offset: 2px !important;
          transition: outline 0.2s ease-in-out !important;
          animation: linkvaultPulse 1.8s ease-out 1 !important;
        }
      `;
      (document.head || document.documentElement).appendChild(styleEl);
    }

    elements.forEach(el => {
      el.classList.add('linkvault-highlight-active');
      setTimeout(() => {
        el.classList.remove('linkvault-highlight-active');
      }, 2600);
    });
  }

  /**
   * Display a clean, non-intrusive floating toast on the webpage
   */
  function displayPageToast(filledCount, skippedCount) {
    const existing = document.getElementById('linkvault-floating-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'linkvault-floating-toast';

    let messageText = '';
    let badgeColor = '#2563eb';

    if (filledCount > 0) {
      messageText = `Filled <strong>${filledCount}</strong> field${filledCount > 1 ? 's' : ''}`;
      if (skippedCount > 0) {
        messageText += ` (${skippedCount} skipped)`;
      }
    } else if (skippedCount > 0) {
      messageText = `0 fields filled (${skippedCount} skipped: already filled)`;
      badgeColor = '#d97706';
    } else {
      messageText = 'No matching profile fields detected on this page.';
      badgeColor = '#64748b';
    }

    toast.innerHTML = `
      <div style="
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 2147483647;
        background: #0f172a;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        font-size: 13px;
        line-height: 1.4;
        padding: 12px 18px;
        border-radius: 10px;
        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3), 0 8px 10px -6px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(255,255,255,0.12);
        pointer-events: auto;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.25s ease, transform 0.25s ease;
      ">
        <span style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: ${badgeColor};
          color: #ffffff;
          font-weight: bold;
          font-size: 11px;
        ">LV</span>
        <span>${messageText}</span>
      </div>
    `;

    document.body.appendChild(toast);
    const container = toast.firstElementChild;

    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      container.style.opacity = '0';
      container.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
})();
