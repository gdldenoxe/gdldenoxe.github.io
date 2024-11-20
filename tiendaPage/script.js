function randomizePositions(isMobile) {
    const images = document.querySelectorAll('.image');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    images.forEach((image) => {
      const margin = isMobile ? 50 : 350; // Leave smaller margin for mobile
      const randomLeft = Math.random() * (viewportWidth - margin);
      const randomTop = Math.random() * (viewportHeight - margin);
  
      image.style.left = `${randomLeft}px`;
      image.style.top = `${randomTop}px`;
    });
  }
  
  function adjustLayout() {
    const isMobile = window.innerWidth <= 768;
  
    // Apply random positions only if on desktop or mobile first-time load
    randomizePositions(isMobile);
  
    // Adjust scale and size for mobile
    if (isMobile) {
      document.querySelectorAll('.image').forEach((image) => {
        image.style.transform = 'scale(0.7)';
      });
    } else {
      document.querySelectorAll('.image').forEach((image) => {
        image.style.transform = 'scale(1)';
      });
    }
  }
  
  // Initialize positions on page load and resize
  window.addEventListener('load', adjustLayout);
  window.addEventListener('resize', adjustLayout);
  