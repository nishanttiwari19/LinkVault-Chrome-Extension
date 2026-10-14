# LinkVault - Profile Links & Smart Autofill Chrome Extension

**LinkVault** is a privacy-first, offline Chrome Extension (Manifest V3) built with HTML, CSS, and Vanilla JavaScript. It allows job seekers, students, and professionals to securely store profile links (LinkedIn, GitHub, Portfolio, Resume, Personal Website, Instagram, and custom URLs) and instantly copy or smart-autofill them into job applications, internship forms, and college portals.

---

## ✨ Features

1. **Profile Link Manager**
   - Built-in presets: **LinkedIn Profile**, **GitHub Profile**, **Personal Website**, **Portfolio Showcase**, **Resume / CV URL**, and **Instagram**.
   - Unlimited **Custom Links** with user-defined labels and matching keywords (e.g. Behance, Dribbble, Twitter/X, Medium, Kaggle, Discord).
   - Instant search and real-time filtering across all saved links.
   - Built-in URL validation ensuring clean, working URLs before saving.

2. **One-Click Instant Copy**
   - Copy button next to every configured profile link.
   - Copies exact URL to clipboard using the Modern Clipboard API with reliable textarea fallback.
   - Instant visual feedback: badge turns into a green checkmark with "Copied!" confirmation.
   - Graceful error handling for all edge cases.

3. **Smart Form Autofill**
   - Dedicated **"Autofill Current Page"** button in the popup.
   - Intelligent DOM heuristic analysis: inspects `<label>`, `placeholder`, `aria-label`, `aria-labelledby`, `name`, `id`, and container context.
   - Platform-aware matching:
     - LinkedIn fields &rarr; LinkedIn Profile URL
     - GitHub fields &rarr; GitHub Profile URL
     - Portfolio / Project fields &rarr; Portfolio URL
     - Resume / CV fields &rarr; Resume URL
     - Personal Website / Homepage fields &rarr; Personal Website URL
     - Instagram fields &rarr; Instagram URL
     - Custom fields &rarr; Custom link URLs
   - **Never overwrites existing values without user permission** (toggleable overwrite protection).
   - **Strict Privacy & Safety**: Ignores sensitive fields (passwords, credit cards, SSN, OTP, tokens) and hidden inputs.
   - **Never guesses**: Unrecognized fields are strictly left alone.
   - **Framework-friendly**: Dispatches native input, change, and blur events so reactive forms (React, Angular, Vue, Svelte) detect value changes automatically.
   - **Visual Confirmation**: Highlights autofilled fields on the page with a gentle blue pulse and displays a summary banner in the popup (and on-page toast).

4. **Dedicated Options & Settings Page**
   - Full-page manager for all links and autofill preferences.
   - One-click **JSON Backup Export** and **JSON Restore/Import** to sync between devices.
   - Reset button to restore default state.

5. **100% Private, Secure & Offline**
   - Stores all data in `chrome.storage.local`.
   - **Zero external network requests**: No analytics, no tracking, no external CDNs, no remote fonts or scripts.
   - Minimum Chrome permissions: `storage`, `activeTab`, `scripting`. No broad `<all_urls>` host permissions!
   - Runs fully offline without any paid developer account or backend server.

---

## 📁 Project Structure

```text
LinkVault/
├── manifest.json       # Manifest V3 configuration & minimal permissions
├── popup.html          # Extension popup UI
├── popup.css           # Clean white & blue design styling
├── popup.js            # Popup logic, search, copy & autofill caller
├── content.js          # Injected smart autofill engine & DOM heuristics
├── options.html        # Full settings & profile manager page
├── options.css         # Options styling & layout
├── options.js          # Options controller, JSON backup & restore
├── test_form.html      # Interactive mock application form for testing
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
└── README.md           # Documentation & instructions
```

---

## 🚀 How to Install in Google Chrome (Developer Mode)

You can load and use LinkVault locally without a paid Chrome Developer account in under 30 seconds:

1. Open Google Chrome on your computer.
2. In the Chrome address bar, navigate to:
   ```text
   chrome://extensions
   ```
3. Enable **Developer mode** using the toggle switch located in the **top-right corner**.
4. In the top-left corner, click the **"Load unpacked"** button.
5. In the file picker dialog, select the project folder:
   ```text
   E:\LinkVault
   ```
   *(Or the folder where you extracted `LinkVault-extension.zip`)*
6. LinkVault will appear immediately in your extensions list.
7. Click the **Extensions puzzle icon** in Chrome's top toolbar and click the **Pin icon** next to **LinkVault** for quick access.

---

## 🧪 How to Test and Verify All Features

### Quick Step-by-Step Test Guide:

1. **Configure Your Profile Links**:
   - Click the LinkVault icon in your Chrome toolbar to open the popup.
   - Click **"+ Click to configure URL"** or the **Edit (pencil)** button next to LinkedIn, GitHub, Website, Portfolio, and Resume.
   - Enter your URLs (e.g. `https://linkedin.com/in/alexmorgan`, `https://github.com/alexmorgan`, `https://alexmorgan.dev`).
   - Click **"Save Link"**. A confirmation message confirms the save.

2. **Test One-Click Copy**:
   - Click the **"Copy"** button next to any configured link.
   - Notice the button transforms to a green checkmark with **"Copied!"** and a toast notification appears.
   - Paste into any text editor or address bar to verify the exact URL was copied.

3. **Test Search and Filtering**:
   - Type `git` into the search bar: only the GitHub link appears.
   - Type `resume`: only the Resume link appears.
   - Click the **"×"** button to clear search and see all links.

4. **Test Smart Autofill Using the Built-In Test Form**:
   - Open `test_form.html` in Chrome:
     - You can double-click `E:\LinkVault\test_form.html`, or
     - Drag and drop `test_form.html` into a new Chrome tab.
   - Click the LinkVault extension icon to open the popup.
   - Click the **"Autofill Current Page"** button.
   - **Observe the Results**:
     - LinkedIn, GitHub, Website, Portfolio, and Resume fields are automatically filled!
     - The filled fields pulse with a gentle blue highlight on the webpage.
     - A floating notification badge appears at the bottom-right of the page.
     - The popup displays a detailed breakdown:
       - `✓ Filled (5): LinkedIn Profile, GitHub Profile, Personal Website...`
     - Personal information (Name, Email, Phone) and sensitive fields (Password) are **untouched**!

5. **Test Overwrite Protection ("Never overwrite without permission")**:
   - On the `test_form.html` page, click the **"Pre-fill LinkedIn (Test Overwrite Protection)"** button. This puts existing text into the LinkedIn input field.
   - Open LinkVault and ensure **"Overwrite existing values"** is **UNCHECKED**.
   - Click **"Autofill Current Page"**.
   - Notice the LinkedIn field is **preserved** and LinkVault reports:
     - `ℹ LinkedIn Profile (Field already has a value)`
   - Now check **"Overwrite existing values"** and click **"Autofill Current Page"** again. Notice the field now updates!

6. **Test Options & Backup**:
   - Click the **Gear icon** in the popup header or click **"Manage All & Backup &rarr;"** in the footer.
   - The full options page opens in a new tab.
   - Add a custom link (e.g. Behance or Twitter).
   - Go to **"Backup & Export"** and click **"Export to JSON"**. Your settings and links download instantly as a `.json` file!
   - You can test importing this file back at any time.

---

## 🔒 Security & Privacy Guarantees

* **No Remote Servers**: No profile data leaves your local machine.
* **No Telemetry / Ads**: LinkVault contains 0 trackers, 0 third-party analytics, and 0 advertisements.
* **Minimal Manifest Permissions**:
  - `storage`: Required to save profile data locally across browser restarts.
  - `activeTab`: Grants temporary access to the active webpage **only** when the user explicitly clicks the extension.
  - `scripting`: Executes the autofill logic on demand on the active tab.
* **No Background Overhead**: No persistent background service workers running in the background when not in use.

---

## 📦 Sharing and Distribution

A clean ZIP package `LinkVault-extension.zip` is included in the project directory. You can share this ZIP with colleagues or friends, who can unzip it and load it locally into Chrome using Developer Mode.
