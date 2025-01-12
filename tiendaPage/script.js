document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
  
    // Function to get product data from HTML elements
    const getProductData = () => {
      const products = [];
      const productElements = document.querySelectorAll('.product');
      productElements.forEach(productElement => {
        const main = productElement.getAttribute('data-main');
        const sub = JSON.parse(productElement.getAttribute('data-sub')); // Parse JSON for sub images
        const description = productElement.getAttribute('data-description');
        
        products.push({ main, sub, description });
      });
      return products;
    };
  
    // Image size for desktop (slightly smaller)
    const desktopImageSize = { width: 180, height: 180 };
  
    // Image size for mobile (scaled down)
    const mobileImageSize = { width: 70, height: 70 };
  
    // Function to generate random positions that allow overlap and reach full screen perimeter
    const getRandomPosition = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      // Allow random positions but ensure images can go from edge to edge (covering the whole perimeter)
      const x = Math.random() * screenWidth; // Allow images to go to the far right
      const y = Math.random() * screenHeight; // Allow images to go to the far bottom
  
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
  
      // Make the image clickable to show preview
      img.addEventListener("click", () => {
        showPreview(src);
      });
  
      return img;
    };
  
    // Function to show the preview of the clicked image
    const showPreview = (mainSrc) => {
      const product = getProductData().find(product => product.main === mainSrc);
  
      // Create a modal or preview for the clicked image
      const previewModal = document.createElement("div");
      previewModal.classList.add("preview-modal");
  
      // Modal content
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");
  
      // Preview image
      const previewImage = document.createElement("img");
      previewImage.src = mainSrc;
      previewImage.classList.add("preview-image");
  
      // Carousel images for sub-images
      const carouselContainer = document.createElement("div");
      carouselContainer.classList.add("carousel-container");
  
      product.sub.forEach(subImage => {
        const carouselImage = document.createElement("img");
        carouselImage.src = subImage;
        carouselImage.classList.add("carousel-image");
  
        // Add click event to switch the preview image when carousel image is clicked
        carouselImage.addEventListener("click", () => {
          previewImage.src = subImage;
        });
  
        carouselContainer.appendChild(carouselImage);
      });
  
      // Description text
      const descriptionText = document.createElement("p");
      descriptionText.classList.add("description-text");
      descriptionText.textContent = product.description;
  
      // Pay button
      const payButton = document.createElement("button");
      payButton.classList.add("pay-button");
      payButton.textContent = "$$$";
  
      // Modal close button (X)
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.classList.add("close-preview");
      closeButton.addEventListener("click", () => {
        previewModal.remove();
      });
  
      modalContent.appendChild(closeButton); // Close button goes on top right
      modalContent.appendChild(previewImage);
      modalContent.appendChild(carouselContainer);
      modalContent.appendChild(descriptionText);
      modalContent.appendChild(payButton);
  
      previewModal.appendChild(modalContent);
      document.body.appendChild(previewModal);
    };
  
    // Load random images when page is loaded
    const loadRandomImages = () => {
      const isMobile = window.innerWidth <= 768; // Check if it's mobile screen
      const imageCount = 15; // Number of clones of each image to generate
  
      // Get the product data from the HTML elements
      const products = getProductData();
  
      // For each product image, create 15 clones
      products.forEach(product => {
        for (let i = 0; i < imageCount; i++) {
          // Create and append the image element
          const img = createImageElement(product.main, isMobile);
          imageContainer.appendChild(img);
        }
      });
    };
  
    // Load the random images when the page loads
    loadRandomImages();
  });
  