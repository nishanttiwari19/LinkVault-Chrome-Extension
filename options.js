/**
 * LinkVault - Options & Settings Controller
 * Manifest V3 - Vanilla JavaScript
 */

(() => {
  const ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
    website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    portfolio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    resume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    custom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`
  };

  const DEFAULT_PRESETS = {
    website: {
      id: 'website',
      label: 'Personal Website',
      url: '',
      icon: 'website',
      category: 'Web',
      placeholder: 'https://yourwebsite.com',
      hint: 'Your main portfolio or personal domain'
    },
    linkedin: {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      url: '',
      icon: 'linkedin',
      category: 'Professional',
      placeholder: 'https://linkedin.com/in/username',
      hint: 'Full link to your LinkedIn profile'
    },
    github: {
      id: 'github',
      label: 'GitHub Profile',
      url: '',
      icon: 'github',
      category: 'Development',
      placeholder: 'https://github.com/username',
      hint: 'Your GitHub profile or repository URL'
    },
    portfolio: {
      id: 'portfolio',
      label: 'Portfolio',
      url: '',
      icon: 'portfolio',
      category: 'Work',
      placeholder: 'https://portfolio.dev or your portfolio link',
      hint: 'Design, writing, or software showcase'
    },
    resume: {
      id: 'resume',
      label: 'Resume URL',
      url: '',
      icon: 'resume',
      category: 'Documents',
      placeholder: 'https://drive.google.com/... or hosted PDF',
      hint: 'Direct link to Google Drive, Dropbox, or hosted CV'
    },
    instagram: {
      id: 'instagram',
      label: 'Instagram',
      url: '',
      icon: 'instagram',
      category: 'Social',
      placeholder: 'https://instagram.com/username',
      hint: 'Your Instagram profile link'
    }
  };

  // State
  let profileData = {
    presets: { ...DEFAULT_PRESETS },
    customLinks: [],
    settings: {
      overwriteNonEmpty: false,
      highlight: true,
      showNotification: true
    }
  };

  // DOM Elements
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const standardProfilesGrid = document.getElementById('standardProfilesGrid');
  const saveStandardProfilesBtn = document.getElementById('saveStandardProfilesBtn');

  const customLinksList = document.getElementById('customLinksList');
  const openNewCustomBtn = document.getElementById('openNewCustomBtn');

  const prefOverwrite = document.getElementById('prefOverwrite');
  const prefHighlight = document.getElementById('prefHighlight');
  const prefToast = document.getElementById('prefToast');
  const savePreferencesBtn = document.getElementById('savePreferencesBtn');

  const exportJsonBtn = document.getElementById('exportJsonBtn');
  const importJsonBtn = document.getElementById('importJsonBtn');
  const importFileInput = document.getElementById('importFileInput');
  const resetAllDataBtn = document.getElementById('resetAllDataBtn');

  // Modal DOM
  const customModal = document.getElementById('customModal');
  const customModalTitle = document.getElementById('customModalTitle');
  const closeCustomModalBtn = document.getElementById('closeCustomModalBtn');
  const cancelCustomModalBtn = document.getElementById('cancelCustomModalBtn');
  const customLinkForm = document.getElementById('customLinkForm');
  const customLinkId = document.getElementById('customLinkId');
  const customLabel = document.getElementById('customLabel');
  const customUrl = document.getElementById('customUrl');
  const customKeywords = document.getElementById('customKeywords');
  const customUrlError = document.getElementById('customUrlError');

  const optionsToast = document.getElementById('optionsToast');
  const optionsToastMessage = document.getElementById('optionsToastMessage');

  // Init
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    setupNavigation();
    setupEventListeners();
    await loadData();
    renderStandardProfiles();
    renderCustomLinks();
    renderPreferences();
  }

  function setupNavigation() {
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.dataset.tab;

        navItems.forEach(n => n.classList.remove('active'));
        contentSections.forEach(s => s.classList.remove('active'));

        item.classList.add('active');
        const target = document.getElementById(tabId);
        if (target) {
          target.classList.add('active');
        }
      });
    });
  }

  function setupEventListeners() {
    saveStandardProfilesBtn.addEventListener('click', handleSaveStandardProfiles);
    savePreferencesBtn.addEventListener('click', handleSavePreferences);

    openNewCustomBtn.addEventListener('click', () => openCustomModal());
    closeCustomModalBtn.addEventListener('click', closeCustomModal);
    cancelCustomModalBtn.addEventListener('click', closeCustomModal);
    customLinkForm.addEventListener('submit', handleSaveCustomLink);

    exportJsonBtn.addEventListener('click', handleExportJson);
    importJsonBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImportFile);
    resetAllDataBtn.addEventListener('click', handleResetAllData);

    // Modal outside click
    customModal.addEventListener('click', (e) => {
      if (e.target === customModal) closeCustomModal();
    });
  }

  async function loadData() {
    try {
      const stored = await chrome.storage.local.get(['linkvault_profiles', 'linkvault_custom_links', 'linkvault_settings']);

      if (stored.linkvault_profiles) {
        profileData.presets = { ...DEFAULT_PRESETS, ...stored.linkvault_profiles };
      } else {
        profileData.presets = { ...DEFAULT_PRESETS };
      }

      if (Array.isArray(stored.linkvault_custom_links)) {
        profileData.customLinks = stored.linkvault_custom_links;
      }

      if (stored.linkvault_settings) {
        profileData.settings = { ...profileData.settings, ...stored.linkvault_settings };
      }
    } catch (err) {
      console.error('Error loading LinkVault options data:', err);
      showToast('Error loading saved settings', true);
    }
  }

  /**
   * Render Standard Profile Cards
   */
  function renderStandardProfiles() {
    standardProfilesGrid.innerHTML = '';
    const order = ['website', 'linkedin', 'github', 'portfolio', 'resume', 'instagram'];

    order.forEach(key => {
      const preset = profileData.presets[key] || DEFAULT_PRESETS[key];
      const card = document.createElement('div');
      card.className = 'profile-card';

      const iconSvg = ICONS[preset.icon] || ICONS.custom;
      const avatarClass = `avatar-${preset.icon || 'custom'}`;

      card.innerHTML = `
        <div class="profile-card-header">
          <div class="profile-card-icon ${avatarClass}">
            ${iconSvg}
          </div>
          <div>
            <div class="profile-card-title">${escapeHtml(preset.label)}</div>
          </div>
          <span class="profile-card-badge">${escapeHtml(preset.category || 'Preset')}</span>
        </div>
        <div class="profile-input-group">
          <input type="url" 
                 class="profile-input" 
                 id="input_${preset.id}" 
                 value="${escapeHtml(preset.url || '')}" 
                 placeholder="${escapeHtml(preset.placeholder || 'https://...')}" 
                 spellcheck="false">
          <button type="button" class="btn-secondary open-url-btn" title="Open URL in new tab" data-id="${preset.id}">
            ${ICONS.external}
          </button>
        </div>
        <div class="profile-hint">${escapeHtml(preset.hint || '')}</div>
      `;

      standardProfilesGrid.appendChild(card);

      const openBtn = card.querySelector('.open-url-btn');
      openBtn.addEventListener('click', () => {
        const inputVal = card.querySelector('.profile-input').value.trim();
        if (inputVal) {
          const finalUrl = /^https?:\/\//i.test(inputVal) ? inputVal : `https://${inputVal}`;
          window.open(finalUrl, '_blank');
        } else {
          showToast('Please enter a URL first', true);
        }
      });
    });
  }

  /**
   * Save All Standard Profiles
   */
  async function handleSaveStandardProfiles() {
    const order = ['website', 'linkedin', 'github', 'portfolio', 'resume', 'instagram'];
    let hasInvalid = false;

    for (const key of order) {
      const input = document.getElementById(`input_${key}`);
      if (!input) continue;

      let val = input.value.trim();
      if (val) {
        if (!/^https?:\/\//i.test(val)) {
          val = `https://${val}`;
        }
        if (!isValidHttpUrl(val)) {
          input.focus();
          showToast(`Invalid URL for ${profileData.presets[key]?.label || key}`, true);
          hasInvalid = true;
          return;
        }
      }
      profileData.presets[key] = {
        ...profileData.presets[key],
        url: val
      };
    }

    if (hasInvalid) return;

    await chrome.storage.local.set({ linkvault_profiles: profileData.presets });
    showToast('All standard profiles saved successfully!');
    renderStandardProfiles();
  }

  /**
   * Render Custom Links
   */
  function renderCustomLinks() {
    customLinksList.innerHTML = '';

    if (profileData.customLinks.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-custom-state';
      empty.innerHTML = `
        <h3>No Custom Links Added Yet</h3>
        <p>Add custom platforms such as Behance, Dribbble, Medium, Kaggle, or Discord.</p>
        <button class="btn-primary" id="emptyAddCustomBtn">
          <span>Add Your First Custom Link</span>
        </button>
      `;
      customLinksList.appendChild(empty);
      empty.querySelector('#emptyAddCustomBtn').addEventListener('click', () => openCustomModal());
      return;
    }

    profileData.customLinks.forEach(link => {
      const row = document.createElement('div');
      row.className = 'custom-link-row';

      const keywordsText = link.keywords && link.keywords.length > 0
        ? `Keywords: ${link.keywords.join(', ')}`
        : 'Keywords: default name match';

      row.innerHTML = `
        <div class="custom-link-info">
          <div class="custom-link-label">${escapeHtml(link.label)}</div>
          <a href="${escapeHtml(formatDisplayUrl(link.url))}" target="_blank" rel="noopener noreferrer" class="custom-link-url" title="${escapeHtml(link.url)}">
            ${escapeHtml(link.url)}
          </a>
          <div class="custom-link-keywords">${escapeHtml(keywordsText)}</div>
        </div>
        <div class="custom-link-actions">
          <button class="btn-secondary edit-custom-btn" title="Edit Link">
            ${ICONS.edit}
            <span>Edit</span>
          </button>
          <button class="btn-danger delete-custom-btn" title="Delete Link">
            ${ICONS.trash}
            <span>Delete</span>
          </button>
        </div>
      `;

      row.querySelector('.edit-custom-btn').addEventListener('click', () => openCustomModal(link));
      row.querySelector('.delete-custom-btn').addEventListener('click', () => handleDeleteCustomLink(link));

      customLinksList.appendChild(row);
    });
  }

  /**
   * Open Modal for Custom Link
   */
  function openCustomModal(link = null) {
    customUrlError.classList.add('hidden');
    customUrl.classList.remove('input-error');

    if (link) {
      customModalTitle.textContent = 'Edit Custom Link';
      customLinkId.value = link.id;
      customLabel.value = link.label || '';
      customUrl.value = link.url || '';
      customKeywords.value = Array.isArray(link.keywords) ? link.keywords.join(', ') : '';
    } else {
      customModalTitle.textContent = 'Add Custom Link';
      customLinkId.value = `custom_${Date.now()}`;
      customLabel.value = '';
      customUrl.value = '';
      customKeywords.value = '';
    }

    customModal.classList.remove('hidden');
    setTimeout(() => customLabel.focus(), 50);
  }

  function closeCustomModal() {
    customModal.classList.add('hidden');
  }

  /**
   * Save Custom Link from Modal
   */
  async function handleSaveCustomLink(e) {
    e.preventDefault();
    customUrlError.classList.add('hidden');

    const id = customLinkId.value;
    const label = customLabel.value.trim();
    let urlVal = customUrl.value.trim();
    const keywordsVal = customKeywords.value.trim();

    if (!label) {
      customLabel.focus();
      return;
    }

    if (!urlVal) {
      customUrlError.textContent = 'Please enter a URL.';
      customUrlError.classList.remove('hidden');
      customUrl.focus();
      return;
    }

    if (!/^https?:\/\//i.test(urlVal)) {
      urlVal = `https://${urlVal}`;
    }

    if (!isValidHttpUrl(urlVal)) {
      customUrlError.textContent = 'Please enter a valid HTTP/HTTPS URL.';
      customUrlError.classList.remove('hidden');
      customUrl.focus();
      return;
    }

    const keywords = keywordsVal
      ? keywordsVal.split(',').map(k => k.trim()).filter(Boolean)
      : [];

    const linkPayload = {
      id,
      label,
      url: urlVal,
      keywords,
      icon: 'custom'
    };

    const existingIndex = profileData.customLinks.findIndex(c => c.id === id);
    if (existingIndex >= 0) {
      profileData.customLinks[existingIndex] = linkPayload;
      showToast(`"${label}" updated!`);
    } else {
      profileData.customLinks.push(linkPayload);
      showToast(`"${label}" added!`);
    }

    await chrome.storage.local.set({ linkvault_custom_links: profileData.customLinks });
    closeCustomModal();
    renderCustomLinks();
  }

  /**
   * Delete Custom Link
   */
  async function handleDeleteCustomLink(link) {
    if (!confirm(`Are you sure you want to delete "${link.label}"?`)) return;

    profileData.customLinks = profileData.customLinks.filter(c => c.id !== link.id);
    await chrome.storage.local.set({ linkvault_custom_links: profileData.customLinks });
    showToast(`"${link.label}" deleted.`);
    renderCustomLinks();
  }

  /**
   * Render Preferences
   */
  function renderPreferences() {
    prefOverwrite.checked = Boolean(profileData.settings.overwriteNonEmpty);
    prefHighlight.checked = profileData.settings.highlight !== false;
    prefToast.checked = profileData.settings.showNotification !== false;
  }

  /**
   * Save Preferences
   */
  async function handleSavePreferences() {
    profileData.settings = {
      overwriteNonEmpty: prefOverwrite.checked,
      highlight: prefHighlight.checked,
      showNotification: prefToast.checked
    };

    await chrome.storage.local.set({ linkvault_settings: profileData.settings });
    showToast('Autofill preferences saved!');
  }

  /**
   * Export to JSON file
   */
  function handleExportJson() {
    const exportObject = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      profiles: profileData.presets,
      customLinks: profileData.customLinks,
      settings: profileData.settings
    };

    const jsonString = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `LinkVault_Backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Backup exported successfully!');
  }

  /**
   * Import JSON file
   */
  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);

        if (!json || typeof json !== 'object') {
          throw new Error('Invalid JSON structure');
        }

        if (json.profiles && typeof json.profiles === 'object') {
          profileData.presets = { ...DEFAULT_PRESETS, ...json.profiles };
        }

        if (Array.isArray(json.customLinks)) {
          profileData.customLinks = json.customLinks;
        }

        if (json.settings && typeof json.settings === 'object') {
          profileData.settings = { ...profileData.settings, ...json.settings };
        }

        // Persist to local storage
        await chrome.storage.local.set({
          linkvault_profiles: profileData.presets,
          linkvault_custom_links: profileData.customLinks,
          linkvault_settings: profileData.settings
        });

        renderStandardProfiles();
        renderCustomLinks();
        renderPreferences();

        showToast('Backup restored successfully!');
      } catch (err) {
        console.error('Import error:', err);
        showToast('Failed to import JSON: file format invalid.', true);
      } finally {
        importFileInput.value = '';
      }
    };
    reader.readAsText(file);
  }

  /**
   * Reset All Data to Clean Defaults
   */
  async function handleResetAllData() {
    const confirmed = confirm(
      'Are you sure you want to clear all LinkVault links and settings? This action cannot be undone.'
    );
    if (!confirmed) return;

    profileData.presets = { ...DEFAULT_PRESETS };
    profileData.customLinks = [];
    profileData.settings = {
      overwriteNonEmpty: false,
      highlight: true,
      showNotification: true
    };

    await chrome.storage.local.clear();
    await chrome.storage.local.set({
      linkvault_profiles: profileData.presets,
      linkvault_custom_links: profileData.customLinks,
      linkvault_settings: profileData.settings
    });

    renderStandardProfiles();
    renderCustomLinks();
    renderPreferences();
    showToast('All LinkVault data has been reset.');
  }

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

  let toastTimer = null;
  function showToast(message, isError = false) {
    if (toastTimer) clearTimeout(toastTimer);
    optionsToastMessage.textContent = message;
    optionsToast.classList.remove('hidden');

    if (isError) {
      optionsToast.style.background = '#991b1b';
    } else {
      optionsToast.style.background = '#0f172a';
    }

    toastTimer = setTimeout(() => {
      optionsToast.classList.add('hidden');
    }, 2400);
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
