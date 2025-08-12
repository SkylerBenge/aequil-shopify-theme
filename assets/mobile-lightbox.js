// Mobile lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox HTML structure
  const lightboxHTML = `
    <div class="mobile-lightbox" id="mobile-lightbox">
      <div class="mobile-lightbox-content">
        <button class="mobile-lightbox-close" id="mobile-lightbox-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="mobile-lightbox-text" id="mobile-lightbox-text"></div>
      </div>
    </div>
  `;

  // Append lightbox to body
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  // Position hover overlays to match card media area
  function positionHoverOverlays() {
    const cards = document.querySelectorAll('.has-hover-overlay');

    cards.forEach(card => {
      const media = card.querySelector('.card__media');
      const overlay = card.parentElement.querySelector('.card-hover-overlay');

      if (media && overlay) {
        const mediaRect = media.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Position overlay to match media dimensions
        overlay.style.height = mediaRect.height + 'px';
        overlay.style.top = (mediaRect.top - cardRect.top) + 'px';
      }
    });
  }

  // Position overlays on load and resize
  positionHoverOverlays();
  window.addEventListener('resize', positionHoverOverlays);

  // Mobile info icon click handlers
  function attachMobileIconHandlers() {
    const mobileIcons = document.querySelectorAll('.mobile-info-icon');

    mobileIcons.forEach(icon => {
      if (!icon.hasAttribute('data-listener-attached')) {
        icon.addEventListener('click', function(e) {
          e.preventDefault();

          const content = this.getAttribute('data-content');
          const lightbox = document.getElementById('mobile-lightbox');
          const textContainer = document.getElementById('mobile-lightbox-text');

          if (content && lightbox && textContainer) {
            textContainer.innerHTML = content;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });

        icon.setAttribute('data-listener-attached', 'true');
      }
    });
  }

  // Initial attachment
  attachMobileIconHandlers();

  // Observer for dynamically added content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        attachMobileIconHandlers();
        positionHoverOverlays();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Close lightbox handlers
  const lightbox = document.getElementById('mobile-lightbox');
  const closeButton = document.getElementById('mobile-lightbox-close');

  if (closeButton) {
    closeButton.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});