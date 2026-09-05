/* ==========================================================================
   MINIWHIZ CONFIGURATION - EDIT VERSION HERE (1 EDIT ONLY)
   Updating `version` below automatically updates all download buttons,
   links, and version labels across index.html, privacy.html, and terms.html.
   ========================================================================== */
const APP_CONFIG = {
  version: '1.1.1',
  repoUrl: 'https://github.com/JhnAerol/miniwhiz-website',
  apkFilename: 'com.miniwhiz.miniwhiz-Signed.apk',
};

// Build download URL helper
function getApkDownloadUrl() {
  return `${APP_CONFIG.repoUrl}/releases/download/${APP_CONFIG.version}/${APP_CONFIG.apkFilename}`;
}

// --- Dynamic Version & Link Updater ---
function applyAppConfig() {
  const downloadUrl = getApkDownloadUrl();

  // Update all APK download links (matching data attribute, GitHub releases, or .apk files)
  const downloadLinks = document.querySelectorAll(
    'a[data-apk-download], a[href*="/releases/download/"], a[href$=".apk"]'
  );
  downloadLinks.forEach(link => {
    link.href = downloadUrl;
  });

  // Update elements specifically marked for version badge text, e.g. "(v1.1.1)"
  const versionBadges = document.querySelectorAll('[data-apk-version]');
  versionBadges.forEach(el => {
    el.textContent = `(v${APP_CONFIG.version})`;
  });

  // Update elements marked for raw version number, e.g. "1.1.1"
  const rawVersionElements = document.querySelectorAll('[data-apk-version-raw]');
  rawVersionElements.forEach(el => {
    el.textContent = APP_CONFIG.version;
  });
}

// Execute immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState !== 'loading') {
  applyAppConfig();
} else {
  document.addEventListener('DOMContentLoaded', applyAppConfig);
}

/* ==========================================================================
   MINIWHIZ QA TESTER PORTAL SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarScroll();
  setupGalleryFilters();
  setupChecklistToggle();
});

// --- Navbar Scroll & Mobile Menu ---
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.innerHTML = isExpanded
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
  }
}

// --- Screenshot Gallery Category Filter ---
function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const screenCards = document.querySelectorAll('.screen-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      screenCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Interactive QA Checklist Toggling ---
function setupChecklistToggle() {
  const items = document.querySelectorAll('.checklist-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });
}
