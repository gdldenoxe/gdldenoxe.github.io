document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
  
    // List of image sources
    const imageSources = [
      "tiendaImages/imageTienda (1).png",
      "tiendaImages/imageTienda (2).png",
      "tiendaImages/imageTienda (3).png",
      "tiendaImages/imageTienda (4).png",
      "tiendaImages/imageTienda (5).png",
    ];
  
    // Image size for desktop (keep resolution for desktop)
    const desktopImageSize = { width: 312, height: 299 };
  
    // Image size for mobile (scaled down)
    const mobileImageSize = { width: 100, height: 100 };
  
    // Function to generate random positions that allow overlap
    const getRandomPosition = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      const x = Math.random() * screenWidth; // Allow positions to be anywhere on screen width
      const y = Math.random() * screenHeight; // Allow positions to be anywhere on screen height
  
      return { x, y };
    };
  
    // Function to create an image element
    const createImageElement = (src, isMobile) => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("image");
  
      // Set appropriate size based on screen size (mobile or desktop)
      const { width, height } = isMobile ? mobileImageSize : desktopImageSize;
      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
  
      // Assign random position
      const { x, y } = getRandomPosition();
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
  
      // Assign a random z-index to layer images on top of each other
      const randomZIndex = Math.floor(Math.random() * 1000); // Random z-index value
      img.style.zIndex = randomZIndex;
  
      return img;
    };
  
    // Determine if we are on mobile or desktop
    const isMobile = window.innerWidth <= 768;
  
    // Generate 5 copies of each image
    imageSources.forEach((src) => {
      for (let i = 0; i < 5; i++) {
        const img = createImageElement(src, isMobile);
        imageContainer.appendChild(img);
      }
    });
  });
  