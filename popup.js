/**
 * LinkVault - Popup Controller
 * Manifest V3 - Vanilla JavaScript
 */

(() => {
  // SVG Icon definitions
  const ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
    website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    portfolio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    resume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    custom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`
  };

  // Default presets structure
  const DEFAULT_PRESETS = {
    website: {
      id: 'website',
      label: 'Personal Website',
      url: '',
      icon: 'website',
      category: 'Web',
      placeholder: 'https://yourwebsite.com'
    },
    linkedin: {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      url: '',
      icon: 'linkedin',
      category: 'Professional',
      placeholder: 'https://linkedin.com/in/username'
    },
    github: {
      id: 'github',
      label: 'GitHub Profile',
      url: '',
      icon: 'github',
      category: 'Development',
      placeholder: 'https://github.com/username'
    },
    portfolio: {
      id: 'portfolio',
      label: 'Portfolio',
      url: '',
      icon: 'portfolio',
      category: 'Work',
      placeholder: 'https://portfolio.dev or your portfolio link'
    },
    resume: {
      id: 'resume',
      label: 'Resume URL',
      url: '',
      icon: 'resume',
      category: 'Documents',
      placeholder: 'https://drive.google.com/... or resume link'
    },
    instagram: {
      id: 'instagram',
      label: 'Instagram',
      url: '',
      icon: 'instagram',
      category: 'Social',
      placeholder: 'https://instagram.com/username'
    }
  };

  // State
  let profileData = {
    presets: { ...DEFAULT_PRESETS },
    customLinks: [],
    settings: {
      overwriteNonEmpty: false
    }
  };

  let searchQuery = '';

  // DOM Elements
  const linksListContainer = document.getElementById('linksListContainer');
  const linksCountBadge = document.getElementById('linksCountBadge');
  const emptyState = document.getElementById('emptyState');
  const emptyStateTitle = document.getElementById('emptyStateTitle');
  const emptyStateText = document.getElementById('emptyStateText');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  const autofillBtn = document.getElementById('autofillBtn');
  const overwriteToggle = document.getElementById('overwriteToggle');
  const autofillResultBanner = document.getElementById('autofillResultBanner');
  const resultBannerIcon = document.getElementById('resultBannerIcon');
  const resultBannerTitle = document.getElementById('resultBannerTitle');
  const resultBannerDetails = document.getElementById('resultBannerDetails');
  const closeBannerBtn = document.getElementById('closeBannerBtn');

  const openOptionsBtn = document.getElementById('openOptionsBtn');
  const footerSettingsBtn = document.getElementById('footerSettingsBtn');
  const addNewLinkBtn = document.getElementById('addNewLinkBtn');

  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Modal DOM
  const linkModal = document.getElementById('linkModal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const linkForm = document.getElementById('linkForm');
  const editLinkId = document.getElementById('editLinkId');
  const editLinkType = document.getElementById('editLinkType');
  const labelGroup = document.getElementById('labelGroup');
  const linkNameInput = document.getElementById('linkNameInput');
  const linkUrlInput = document.getElementById('linkUrlInput');
  const linkKeywordsInput = document.getElementById('linkKeywordsInput');
  const keywordsGroup = document.getElementById('keywordsGroup');
  const labelError = document.getElementById('labelError');
  const urlError = document.getElementById('urlError');

  // Initialization
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupEventListeners();
    await loadStoredData();
    renderLinks();
  }

  /**
   * Set up all interactive event listeners
   */
  function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', clearSearch);

    // Autofill
    autofillBtn.addEventListener('click', handleAutofill);
    overwriteToggle.addEventListener('change', handleOverwriteChange);
    closeBannerBtn.addEventListener('click', hideResultBanner);

    // Settings Navigation
    openOptionsBtn.addEventListener('click', openOptionsPage);
    footerSettingsBtn.addEventListener('click', openOptionsPage);

    // Add / Edit Modal
    addNewLinkBtn.addEventListener('click', () => openModalForNewLink());
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);
    linkForm.addEventListener('submit', handleFormSubmit);

    // Close modal on backdrop click
    linkModal.addEventListener('click', (e) => {
      if (e.target === linkModal) closeModal();
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !linkModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /**
   * Load data from chrome.storage.local
   */
  async function loadStoredData() {
    try {
      const stored = await chrome.storage.local.get(['linkvault_profiles', 'linkvault_custom_links', 'linkvault_settings']);

      if (stored.linkvault_profiles) {
        // Merge with defaults to ensure all presets exist
        profileData.presets = { ...DEFAULT_PRESETS, ...stored.linkvault_profiles };
      } else {
        // First run: save defaults
        await saveProfilePresets(profileData.presets);
      }

      if (Array.isArray(stored.linkvault_custom_links)) {
        profileData.customLinks = stored.linkvault_custom_links;
      }

      if (stored.linkvault_settings) {
        profileData.settings = { ...profileData.settings, ...stored.linkvault_settings };
      }

      overwriteToggle.checked = Boolean(profileData.settings.overwriteNonEmpty);
    } catch (err) {
      console.error('Error loading LinkVault data:', err);
      showToast('Error loading saved links', true);
    }
  }

  /**
   * Persist presets to storage
   */
  async function saveProfilePresets(presets) {
    profileData.presets = presets;
    await chrome.storage.local.set({ linkvault_profiles: presets });
  }

  /**
   * Persist custom links to storage
   */
  async function saveCustomLinks(customLinks) {
    profileData.customLinks = customLinks;
    await chrome.storage.local.set({ linkvault_custom_links: customLinks });
  }

  /**
   * Persist settings to storage
   */
  async function saveSettings(settings) {
    profileData.settings = settings;
    await chrome.storage.local.set({ linkvault_settings: settings });
  }

  /**
   * Toggle overwrite non-empty fields
   */
  async function handleOverwriteChange() {
    profileData.settings.overwriteNonEmpty = overwriteToggle.checked;
    await saveSettings(profileData.settings);
  }

  /**
   * Render link cards with search filtering
   */
  function renderLinks() {
    linksListContainer.innerHTML = '';

    const query = searchQuery.trim().toLowerCase();
    const allItems = [];

    // Add presets in predefined order
    const presetKeys = ['linkedin', 'github', 'website', 'portfolio', 'resume', 'instagram'];
    presetKeys.forEach(key => {
      const p = profileData.presets[key];
      if (p) {
        allItems.push({ ...p, type: 'preset' });
      }
    });

    // Add custom links
    profileData.customLinks.forEach(c => {
      allItems.push({ ...c, type: 'custom', category: 'Custom' });
    });

    // Filter items based on search
    const filtered = allItems.filter(item => {
      if (!query) return true;
      const matchLabel = (item.label || '').toLowerCase().includes(query);
      const matchUrl = (item.url || '').toLowerCase().includes(query);
      const matchCategory = (item.category || '').toLowerCase().includes(query);
      const matchKeywords = (item.keywords || []).some(k => k.toLowerCase().includes(query));
      return matchLabel || matchUrl || matchCategory || matchKeywords;
    });

    // Update counter
    const configuredCount = allItems.filter(i => i.url && i.url.trim() !== '').length;
    if (query) {
      linksCountBadge.textContent = `${filtered.length} of ${allItems.length}`;
    } else {
      linksCountBadge.textContent = `${configuredCount} active • ${allItems.length} total`;
    }

    if (filtered.length === 0) {
      emptyState.classList.remove('hidden');
      if (query) {
        emptyStateTitle.textContent = 'No matching links';
        emptyStateText.textContent = `No links match "${query}". Try another search.`;
      } else {
        emptyStateTitle.textContent = 'No links available';
        emptyStateText.textContent = 'Click "Add Custom Link" below to add your first profile link.';
      }
      return;
    }

    emptyState.classList.add('hidden');

    filtered.forEach(item => {
      const card = createLinkCardElement(item);
      linksListContainer.appendChild(card);
    });
  }

  /**
   * Build DOM element for a single link card
   */
  function createLinkCardElement(item) {
    const card = document.createElement('div');
    const isConfigured = Boolean(item.url && item.url.trim());
    card.className = `link-card ${isConfigured ? '' : 'not-configured'}`;
    card.dataset.id = item.id;
    card.dataset.type = item.type;

    const iconSvg = ICONS[item.icon] || ICONS[item.id] || ICONS.custom;
    const avatarClass = `avatar-${item.icon || item.id || 'custom'}`;

    // Avatar
    const avatar = document.createElement('div');
    avatar.className = `link-avatar ${avatarClass}`;
    avatar.innerHTML = iconSvg;

    // Content
    const content = document.createElement('div');
    content.className = 'link-content';

    const header = document.createElement('div');
    header.className = 'link-header';

    const label = document.createElement('span');
    label.className = 'link-label';
    label.textContent = item.label;
    header.appendChild(label);

    if (item.type === 'custom') {
      const tag = document.createElement('span');
      tag.className = 'link-tag';
      tag.textContent = 'Custom';
      header.appendChild(tag);
    }

    content.appendChild(header);

    if (isConfigured) {
      const urlAnchor = document.createElement('a');
      urlAnchor.className = 'link-url';
      urlAnchor.href = formatDisplayUrl(item.url);
      urlAnchor.target = '_blank';
      urlAnchor.rel = 'noopener noreferrer';
      urlAnchor.title = item.url;
      urlAnchor.textContent = cleanUrlForDisplay(item.url);
      content.appendChild(urlAnchor);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'link-url-placeholder';
      placeholder.textContent = '+ Click to configure URL';
      placeholder.addEventListener('click', () => openModalForEdit(item));
      content.appendChild(placeholder);
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'link-actions';

    if (isConfigured) {
      // Copy Button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.title = 'Copy URL to clipboard';
      copyBtn.innerHTML = `${ICONS.copy}<span>Copy</span>`;
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleCopyLink(item.url, copyBtn);
      });
      actions.appendChild(copyBtn);

      // Open in new tab button
      const openBtn = document.createElement('button');
      openBtn.className = 'mini-btn';
      openBtn.title = 'Open URL in new tab';
      openBtn.innerHTML = ICONS.external;
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.tabs.create({ url: formatDisplayUrl(item.url) });
      });
      actions.appendChild(openBtn);
    }

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'mini-btn';
    editBtn.title = 'Edit link details';
    editBtn.innerHTML = ICONS.edit;
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModalForEdit(item);
    });
    actions.appendChild(editBtn);

    // Delete or Clear Button
    if (item.type === 'custom') {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'mini-btn delete-btn';
      deleteBtn.title = 'Delete custom link';
      deleteBtn.innerHTML = ICONS.trash;
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDeleteLink(item);
      });
      actions.appendChild(deleteBtn);
    } else if (isConfigured) {
      const clearBtn = document.createElement('button');
      clearBtn.className = 'mini-btn delete-btn';
      clearBtn.title = 'Clear URL';
      clearBtn.innerHTML = ICONS.trash;
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleClearPreset(item.id);
      });
      actions.appendChild(clearBtn);
    }

    card.appendChild(avatar);
    card.appendChild(content);
    card.appendChild(actions);

    return card;
  }

  /**
   * One-click copy handler with clipboard API & fallback
   */
  async function handleCopyLink(text, buttonElement) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      triggerCopiedState(buttonElement);
      showToast('Copied to clipboard!');
    } catch (err) {
      console.warn('Clipboard writeText failed, using fallback:', err);
      // Fallback using textarea
      const success = fallbackCopyText(text);
      if (success) {
        triggerCopiedState(buttonElement);
        showToast('Copied to clipboard!');
      } else {
        showToast('Failed to copy. Please allow clipboard access.', true);
      }
    }
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (e) {
      console.error('Fallback copy error:', e);
    }
    document.body.removeChild(textArea);
    return successful;
  }

  function triggerCopiedState(button) {
    if (!button) return;
    const originalHtml = button.innerHTML;
    button.classList.add('copied');
    button.innerHTML = `${ICONS.check}<span>Copied!</span>`;

    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = originalHtml;
    }, 1800);
  }

  /**
   * Smart Autofill Execution
   */
  async function handleAutofill() {
    autofillBtn.disabled = true;
    const originalContent = autofillBtn.innerHTML;
    autofillBtn.innerHTML = `<span>Scanning & Filling...</span>`;

    try {
      // Get current active tab
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!activeTab || !activeTab.id) {
        showBanner('error', 'No active tab found', 'Unable to determine the active browser tab.');
        return;
      }

      // Check if page is injectable (not chrome://, etc.)
      if (!isSupportedUrl(activeTab.url)) {
        showBanner(
          'warning',
          'Unsupported Page',
          'Autofill cannot run on internal Chrome pages (chrome://), web store, or blank tabs. Please navigate to a web form.'
        );
        return;
      }

      // Prepare profile data
      const dataToSend = {
        presets: profileData.presets,
        customLinks: profileData.customLinks
      };

      const options = {
        overwrite: overwriteToggle.checked,
        highlight: true,
        showNotification: true
      };

      // Inject content script if not already loaded, then send message
      let response = null;
      try {
        response = await chrome.tabs.sendMessage(activeTab.id, {
          action: 'AUTOFILL_PAGE',
          data: dataToSend,
          options
        });
      } catch (err) {
        // Content script might not be injected yet into this tab. Inject it now.
        await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          files: ['content.js']
        });

        // Retry sending message
        response = await chrome.tabs.sendMessage(activeTab.id, {
          action: 'AUTOFILL_PAGE',
          data: dataToSend,
          options
        });
      }

      handleAutofillResponse(response);

    } catch (err) {
      console.error('Autofill failed:', err);
      showBanner(
        'error',
        'Autofill Error',
        err.message || 'Could not connect to current webpage. Please refresh the page and try again.'
      );
    } finally {
      autofillBtn.disabled = false;
      autofillBtn.innerHTML = originalContent;
    }
  }

  /**
   * Process autofill results and display summary banner
   */
  function handleAutofillResponse(resp) {
    if (!resp) {
      showBanner('error', 'Autofill Failed', 'No response received from the webpage.');
      return;
    }

    if (resp.error) {
      showBanner('warning', 'Notice', resp.error);
      return;
    }

    const { filledCount, skippedCount, filledFields, skippedFields } = resp;

    if (filledCount === 0 && skippedCount === 0) {
      showBanner(
        'warning',
        'No Matching Fields Found',
        'LinkVault searched the page but found no input fields matching your saved profile URLs (LinkedIn, GitHub, Portfolio, etc.).'
      );
      return;
    }

    // Build details HTML
    let detailsHtml = '';

    if (filledCount > 0) {
      detailsHtml += `<div style="font-weight:600; color:#047857; margin-bottom:2px;">Filled (${filledCount}):</div>`;
      detailsHtml += '<div class="result-pill-group">';
      filledFields.forEach(f => {
        detailsHtml += `<span class="result-pill filled">✓ ${escapeHtml(f.label)}: ${escapeHtml(f.fieldName)}</span>`;
      });
      detailsHtml += '</div>';
    }

    if (skippedCount > 0) {
      detailsHtml += `<div style="font-weight:600; color:#b45309; margin-top:6px; margin-bottom:2px;">Skipped (${skippedCount}):</div>`;
      detailsHtml += '<div class="result-pill-group">';
      skippedFields.forEach(s => {
        detailsHtml += `<span class="result-pill skipped">ℹ ${escapeHtml(s.label)} (${escapeHtml(s.reason)})</span>`;
      });
      detailsHtml += '</div>';
    }

    const bannerType = filledCount > 0 ? 'success' : 'warning';
    const bannerTitle = filledCount > 0
      ? `Autofill Success (${filledCount} filled)`
      : `Autofill Skipped (${skippedCount} skipped)`;

    showBanner(bannerType, bannerTitle, detailsHtml, true);
    showToast(filledCount > 0 ? `Autofilled ${filledCount} field${filledCount > 1 ? 's' : ''}!` : 'Autofill complete');
  }

  /**
   * Display status banner
   */
  function showBanner(type, title, messageHtml, isRawHtml = false) {
    autofillResultBanner.className = `result-banner ${type}`;
    resultBannerTitle.textContent = title;

    if (type === 'success') {
      resultBannerIcon.textContent = '✓';
    } else if (type === 'warning') {
      resultBannerIcon.textContent = '⚠';
    } else {
      resultBannerIcon.textContent = '✕';
    }

    if (isRawHtml) {
      resultBannerDetails.innerHTML = messageHtml;
    } else {
      resultBannerDetails.textContent = messageHtml;
    }

    autofillResultBanner.classList.remove('hidden');
  }

  function hideResultBanner() {
    autofillResultBanner.classList.add('hidden');
  }

  /**
   * Check if URL allows content script injection
   */
  function isSupportedUrl(url) {
    if (!url) return false;
    const unsupportedProtocols = ['chrome:', 'chrome-extension:', 'edge:', 'about:', 'data:', 'view-source:'];
    return !unsupportedProtocols.some(p => url.startsWith(p));
  }

  /**
   * Search handling
   */
  function handleSearchInput(e) {
    searchQuery = e.target.value;
    if (searchQuery.trim().length > 0) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }
    renderLinks();
  }

  function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    searchInput.focus();
    renderLinks();
  }

  /**
   * Open Modal to Edit existing link
   */
  function openModalForEdit(item) {
    resetModalErrors();
    editLinkId.value = item.id;
    editLinkType.value = item.type;
    linkUrlInput.value = item.url || '';

    if (item.type === 'preset') {
      modalTitle.textContent = `Edit ${item.label}`;
      labelGroup.classList.add('hidden');
      linkNameInput.value = item.label;
      keywordsGroup.classList.add('hidden');
    } else {
      modalTitle.textContent = 'Edit Custom Link';
      labelGroup.classList.remove('hidden');
      linkNameInput.value = item.label || '';
      keywordsGroup.classList.remove('hidden');
      linkKeywordsInput.value = Array.isArray(item.keywords) ? item.keywords.join(', ') : '';
    }

    linkModal.classList.remove('hidden');
    setTimeout(() => {
      (item.type === 'preset' ? linkUrlInput : linkNameInput).focus();
    }, 50);
  }

  /**
   * Open Modal for adding a new Custom Link
   */
  function openModalForNewLink() {
    resetModalErrors();
    editLinkId.value = `custom_${Date.now()}`;
    editLinkType.value = 'custom';
    modalTitle.textContent = 'Add Custom Profile Link';
    labelGroup.classList.remove('hidden');
    keywordsGroup.classList.remove('hidden');
    linkNameInput.value = '';
    linkUrlInput.value = '';
    linkKeywordsInput.value = '';

    linkModal.classList.remove('hidden');
    setTimeout(() => linkNameInput.focus(), 50);
  }

  function closeModal() {
    linkModal.classList.add('hidden');
    resetModalErrors();
  }

  function resetModalErrors() {
    linkNameInput.classList.remove('input-error');
    linkUrlInput.classList.remove('input-error');
    labelError.classList.add('hidden');
    urlError.classList.add('hidden');
  }

  /**
   * Modal Form Submission with Validation
   */
  async function handleFormSubmit(e) {
    e.preventDefault();
    resetModalErrors();

    const id = editLinkId.value;
    const type = editLinkType.value;
    const label = linkNameInput.value.trim();
    let rawUrl = linkUrlInput.value.trim();
    const keywordsRaw = linkKeywordsInput.value.trim();

    let hasError = false;

    // Validate Label for custom links
    if (type === 'custom' && !label) {
      labelError.textContent = 'Please enter a label for this link.';
      labelError.classList.remove('hidden');
      linkNameInput.classList.add('input-error');
      hasError = true;
    }

    // Validate and normalize URL
    if (!rawUrl) {
      urlError.textContent = 'Please enter a URL.';
      urlError.classList.remove('hidden');
      linkUrlInput.classList.add('input-error');
      hasError = true;
    } else {
      // Auto-prefix https:// if missing
      if (!/^https?:\/\//i.test(rawUrl)) {
        rawUrl = `https://${rawUrl}`;
      }

      if (!isValidHttpUrl(rawUrl)) {
        urlError.textContent = 'Please enter a valid web URL (e.g. https://yourprofile.com).';
        urlError.classList.remove('hidden');
        linkUrlInput.classList.add('input-error');
        hasError = true;
      }
    }

    if (hasError) return;

    // Parse keywords
    const keywords = keywordsRaw
      ? keywordsRaw.split(',').map(k => k.trim()).filter(Boolean)
      : [];

    if (type === 'preset') {
      // Update preset URL
      if (profileData.presets[id]) {
        profileData.presets[id].url = rawUrl;
        await saveProfilePresets(profileData.presets);
        showToast(`${profileData.presets[id].label} updated!`);
      }
    } else {
      // Update or add custom link
      const existingIdx = profileData.customLinks.findIndex(c => c.id === id);
      const linkPayload = {
        id,
        label,
        url: rawUrl,
        keywords,
        icon: 'custom'
      };

      if (existingIdx >= 0) {
        profileData.customLinks[existingIdx] = linkPayload;
        showToast(`"${label}" updated!`);
      } else {
        profileData.customLinks.push(linkPayload);
        showToast(`"${label}" added!`);
      }
      await saveCustomLinks(profileData.customLinks);
    }

    closeModal();
    renderLinks();
  }

  /**
   * Delete Custom Link
   */
  async function handleDeleteLink(item) {
    if (!confirm(`Are you sure you want to delete "${item.label}"?`)) {
      return;
    }
    profileData.customLinks = profileData.customLinks.filter(c => c.id !== item.id);
    await saveCustomLinks(profileData.customLinks);
    showToast(`"${item.label}" deleted`);
    renderLinks();
  }

  /**
   * Clear preset URL
   */
  async function handleClearPreset(presetId) {
    if (profileData.presets[presetId]) {
      profileData.presets[presetId].url = '';
      await saveProfilePresets(profileData.presets);
      showToast(`Cleared ${profileData.presets[presetId].label}`);
      renderLinks();
    }
  }

  /**
   * URL validation helper
   */
  function isValidHttpUrl(string) {
    try {
      const url = new URL(string);
      return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
    } catch (_) {
      return false;
    }
  }

  function formatDisplayUrl(url) {
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }

  function cleanUrlForDisplay(url) {
    if (!url) return '';
    return url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
  }

  /**
   * Toast notification feedback
   */
  let toastTimer = null;
  function showToast(message, isError = false) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toastNotification.classList.remove('hidden');

    if (isError) {
      toastNotification.style.background = '#991b1b';
    } else {
      toastNotification.style.background = '#0f172a';
    }

    toastTimer = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 2200);
  }

  /**
   * Open full options/settings page
   */
  function openOptionsPage() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
