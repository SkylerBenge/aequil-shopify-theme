document.addEventListener('DOMContentLoaded', function() {
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

    // Open lightbox
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
  });

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