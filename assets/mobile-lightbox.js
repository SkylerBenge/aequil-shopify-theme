document.addEventListener('DOMContentLoaded', function() {
  // Global flag to track if lightbox should be opened
  let shouldOpenLightbox = false;
  let lightboxContent = null;
  // Create single lightbox element
  const lightboxHTML = `
    <div class="mobile-lightbox" id="mobile-lightbox">
      <div class="mobile-lightbox-content">
        <button class="mobile-lightbox-close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
          </svg>
        </button>
        <div class="mobile-lightbox-text" id="mobile-lightbox-text"></div>
      </div>
    </div>
  `;

    // Add lightbox to body
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('mobile-lightbox');
  const lightboxText = document.getElementById('mobile-lightbox-text');
  const closeButton = document.querySelector('.mobile-lightbox-close');

  // Add direct click handlers to all mobile info icons
  function addIconHandlers() {
    const infoIcons = document.querySelectorAll('.mobile-info-icon');
    infoIcons.forEach(icon => {
      // Use capture phase to intercept clicks before they reach card links
      icon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const content = this.getAttribute('data-content');
        if (content) {
          lightboxText.innerHTML = content;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        return false;
      }, true); // Use capture phase
      
      // Also add pointer and mouse events to catch all interactions
      ['mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend'].forEach(eventType => {
        icon.addEventListener(eventType, function(e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          // Set flags for opening lightbox
          if (eventType === 'mousedown' || eventType === 'pointerdown' || eventType === 'touchstart') {
            shouldOpenLightbox = true;
            lightboxContent = this.getAttribute('data-content');
          }
          
          return false;
        }, true);
      });
    });
  }

  // Initial setup
  addIconHandlers();

  // Watch for new icons (in case of dynamic content)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        addIconHandlers();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

        // Global click handler as backup (using capture phase)
  document.addEventListener('click', function(e) {
    if (e.target.closest('.mobile-info-icon')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const icon = e.target.closest('.mobile-info-icon');
      const content = icon.getAttribute('data-content');

      if (content) {
        lightboxText.innerHTML = content;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      return false;
    }
  }, true); // Use capture phase

  // Also add a global handler to stop any clicks on card links when icon is clicked
  document.addEventListener('click', function(e) {
    // If clicking on a card link and there's an icon inside, check if we're near it
    if (e.target.closest('.full-unstyled-link')) {
      const cardLink = e.target.closest('.full-unstyled-link');
      const icon = cardLink.querySelector('.mobile-info-icon');
      
      if (icon) {
        const rect = icon.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // If click is within 10px of the icon, prevent the link
        if (clickX >= rect.left - 10 && clickX <= rect.right + 10 &&
            clickY >= rect.top - 10 && clickY <= rect.bottom + 10) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          // Trigger the lightbox
          const content = icon.getAttribute('data-content');
          if (content) {
            lightboxText.innerHTML = content;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
          
          return false;
        }
      }
    }
  }, true);

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close button click
  closeButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    closeLightbox();
  });

  // Close when clicking outside
  lightbox.addEventListener('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  // Close with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});