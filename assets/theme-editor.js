function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:unload', (event) => {
  document.querySelectorAll(`[data-section="${event.detail.sectionId}"]`).forEach((element) => {
    element.remove();
    document.body.classList.remove('overflow-hidden');
  });
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());


/* ──────────────────────────────────────────────
   Aequil Two-Column Section (Image + Copy)
─────────────────────────────────────────────── */
.aequil-two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}
@media (min-width: 768px) {
  .aequil-two-col {
    grid-template-columns: repeat(2, 1fr);
  }
}
.aequil-two-col img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0,0,0,0.1);
}

