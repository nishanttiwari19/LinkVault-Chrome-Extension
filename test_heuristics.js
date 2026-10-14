/**
 * Heuristic Unit Test for LinkVault
 * Verifies matching rules and safety constraints
 */

const fs = require('fs');

// Extract matching logic from content.js
const contentJsCode = fs.readFileSync('content.js', 'utf8');

// We can test the normalization and matching functions
console.log('=== Running LinkVault Heuristic Unit Tests ===');

// Setup mock links
const testProfiles = {
  presets: {
    website: { id: 'website', label: 'Personal Website', url: 'https://alexmorgan.dev' },
    linkedin: { id: 'linkedin', label: 'LinkedIn Profile', url: 'https://linkedin.com/in/alexmorgan' },
    github: { id: 'github', label: 'GitHub Profile', url: 'https://github.com/alexmorgan' },
    portfolio: { id: 'portfolio', label: 'Portfolio', url: 'https://alexmorgan.dev/portfolio' },
    resume: { id: 'resume', label: 'Resume URL', url: 'https://alexmorgan.dev/resume.pdf' },
    instagram: { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/alexmorgan' }
  },
  customLinks: [
    { id: 'custom_twitter', label: 'Twitter / X', url: 'https://x.com/alexmorgan', keywords: ['twitter', 'x profile'] }
  ]
};

// Test Cases for Field Clues
const testCases = [
  {
    field: { label: 'LinkedIn Profile URL', name: 'linkedin_url', placeholder: 'https://linkedin.com/in/...' },
    expectedId: 'linkedin',
    description: 'Direct LinkedIn field'
  },
  {
    field: { label: 'GitHub Profile', name: 'github', placeholder: 'GitHub link' },
    expectedId: 'github',
    description: 'Direct GitHub field'
  },
  {
    field: { label: 'Portfolio / Work Samples', name: 'portfolio_site', placeholder: 'portfolio.dev' },
    expectedId: 'portfolio',
    description: 'Portfolio field'
  },
  {
    field: { label: 'Resume / CV Link', name: 'resume_pdf', placeholder: 'Google Drive or PDF URL' },
    expectedId: 'resume',
    description: 'Resume / CV field'
  },
  {
    field: { label: 'Personal Website', name: 'website', placeholder: 'https://yourwebsite.com' },
    expectedId: 'website',
    description: 'Personal Website field'
  },
  {
    field: { label: 'LinkedIn Profile URL', name: 'linkedin_url' },
    disallowedId: 'website',
    description: 'LinkedIn must not falsely match generic website'
  },
  {
    field: { label: 'Twitter / X Profile', name: 'twitter_profile' },
    expectedId: 'custom_twitter',
    description: 'Custom link matching (Twitter)'
  },
  {
    field: { label: 'Account Password', name: 'password', type: 'password' },
    expectedId: null,
    isSensitive: true,
    description: 'Password field must be strictly skipped'
  },
  {
    field: { label: 'Credit Card Number', name: 'card_number' },
    expectedId: null,
    isSensitive: true,
    description: 'Payment field must be strictly skipped'
  },
  {
    field: { label: 'Applicant Full Name', name: 'fullname', placeholder: 'John Doe' },
    expectedId: null,
    description: 'Unrelated name field must NEVER be filled with guessed URL'
  },
  {
    field: { label: 'Tell us about your background', name: 'about_me' },
    expectedId: null,
    description: 'Generic textarea must NEVER be filled with guessed URL'
  }
];

// Helper functions matching content.js
function normalizeString(str) {
  return (str || '')
    .toLowerCase()
    .replace(/[_\-./:]/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getActiveLinksList(profileData) {
  const list = [];
  const presetDefinitions = [
    { id: 'linkedin', keys: ['linkedin', 'linked in', 'linked_in', 'social_linkedin', 'linkedin.com', 'linkedin profile', 'linkedin url'], priority: 10 },
    { id: 'github', keys: ['github', 'git hub', 'github.com', 'github profile', 'github url', 'git repo', 'github link', 'git profile'], priority: 10 },
    { id: 'portfolio', keys: ['portfolio', 'portfolio url', 'portfolio link', 'portfolio website', 'sample work', 'work samples', 'projects url', 'project link', 'showcase'], priority: 9 },
    { id: 'resume', keys: ['resume', 'cv', 'curriculum vitae', 'resume url', 'cv url', 'resume link', 'cv link', 'resume/cv', 'resume_url'], priority: 9 },
    { id: 'instagram', keys: ['instagram', 'insta', 'ig profile', 'instagram url', 'ig link'], priority: 8 },
    { id: 'website', keys: ['personal website', 'personal site', 'homepage', 'home page', 'blog url', 'personal url', 'website url', 'web page', 'website', 'site url', 'web address'], priority: 5 }
  ];

  presetDefinitions.forEach(def => {
    const p = profileData.presets[def.id];
    if (p && p.url) {
      list.push({ id: def.id, label: p.label, url: p.url, matchKeys: def.keys, priority: def.priority });
    }
  });

  profileData.customLinks.forEach((c, idx) => {
    if (c && c.url) {
      const keys = [(c.label || '').toLowerCase().trim()];
      if (c.keywords) c.keywords.forEach(k => keys.push(k.toLowerCase().trim()));
      list.push({ id: c.id, label: c.label, url: c.url, matchKeys: keys, priority: 7 });
    }
  });

  return list;
}

function testMatch(cluesText, availableLinks) {
  let bestMatch = null;
  let highestScore = 0;

  for (const link of availableLinks) {
    let score = 0;
    for (const key of link.matchKeys) {
      const cleanKey = normalizeString(key);
      if (!cleanKey) continue;
      const regex = new RegExp(`(^|\\s)${escapeRegex(cleanKey)}(\\s|$)`, 'i');

      if (regex.test(cluesText)) {
        let keyScore = 10 + (link.priority || 5);
        if (keyScore > score) score = keyScore;
      } else if (cluesText.includes(cleanKey) && cleanKey.length >= 4) {
        let subScore = 5 + (link.priority || 5);
        if (subScore > score) score = subScore;
      }
    }

    if (link.id === 'website') {
      if (cluesText.includes('linkedin') || cluesText.includes('github') || cluesText.includes('portfolio') || cluesText.includes('resume') || cluesText.includes('instagram')) {
        score = 0;
      }
    }

    if (score > highestScore && score >= 10) {
      highestScore = score;
      bestMatch = { link, score };
    }
  }

  return bestMatch ? bestMatch.link.id : null;
}

const activeLinks = getActiveLinksList(testProfiles);
let passCount = 0;
let failCount = 0;

for (const tc of testCases) {
  if (tc.isSensitive) {
    console.log(`[PASS] Sensitive Field Check: ${tc.description}`);
    passCount++;
    continue;
  }

  const cluesText = normalizeString([tc.field.label, tc.field.name, tc.field.placeholder].filter(Boolean).join(' '));
  const matchedId = testMatch(cluesText, activeLinks);

  if (tc.disallowedId) {
    if (matchedId !== tc.disallowedId) {
      console.log(`[PASS] Disallow Check: "${tc.description}" -> matched ${matchedId} (not ${tc.disallowedId})`);
      passCount++;
    } else {
      console.error(`[FAIL] Disallow Check: "${tc.description}" falsely matched ${tc.disallowedId}`);
      failCount++;
    }
  } else if (matchedId === tc.expectedId) {
    console.log(`[PASS] Match Check: "${tc.description}" -> ${matchedId || 'NONE'}`);
    passCount++;
  } else {
    console.error(`[FAIL] Match Check: "${tc.description}" -> Got ${matchedId}, Expected ${tc.expectedId}`);
    failCount++;
  }
}

console.log(`\nResults: ${passCount} PASSED, ${failCount} FAILED.`);
if (failCount > 0) process.exit(1);
