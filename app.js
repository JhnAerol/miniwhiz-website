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

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

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
