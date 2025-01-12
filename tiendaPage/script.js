document.addEventListener("DOMContentLoaded", () => {
  const imageContainer = document.getElementById("image-container");

  const getProductData = () => {
    const products = [];
    const productElements = document.querySelectorAll('.product');
    
    productElements.forEach(productElement => {
      const title = productElement.getAttribute('data-title');  // Get the title
      const main = productElement.getAttribute('data-main');
      const sub = JSON.parse(productElement.getAttribute('data-sub')); // Parse JSON for sub images
      const description = productElement.getAttribute('data-description');
      const price = productElement.getAttribute('data-price');
      const buyUrl = productElement.getAttribute('data-buy-url');  // Get the buy URL
  
      products.push({ title, main, sub, description, price, buyUrl });
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

  const showPreview = (mainSrc) => {
    const product = getProductData().find(product => product.main === mainSrc);
  
    if (!product) {
      console.error('Product not found for:', mainSrc);
      return;
    }
  
    const previewModal = document.createElement("div");
    previewModal.classList.add("preview-modal");
  
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
  
    // Product title
    const productTitle = document.createElement("h2");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;  // Display product title
  
    const previewImage = document.createElement("img");
    previewImage.src = mainSrc;
    previewImage.classList.add("preview-image");
  
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");
  
    product.sub.forEach(subImage => {
      const carouselImage = document.createElement("img");
      carouselImage.src = subImage;
      carouselImage.classList.add("carousel-image");
  
      carouselImage.addEventListener("click", () => {
        previewImage.src = subImage;
      });
  
      carouselContainer.appendChild(carouselImage);
    });
  
    const descriptionText = document.createElement("p");
    descriptionText.classList.add("description-text");
    descriptionText.textContent = product.description;
  
    const priceText = document.createElement("p");
    priceText.classList.add("price-text");
    priceText.textContent = `${product.price}`;
  
    const payButton = document.createElement("button");
    payButton.classList.add("pay-button");
    payButton.textContent = "Buy Now";
    payButton.addEventListener("click", () => {
      if (product.buyUrl) {
        window.location.href = product.buyUrl;
      } else {
        alert("Buy URL is missing for this product.");
      }
    });
  
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.classList.add("close-preview");
    closeButton.addEventListener("click", () => {
      previewModal.remove();
    });
  
    modalContent.appendChild(closeButton);
    modalContent.appendChild(productTitle); // Append the title
    modalContent.appendChild(previewImage);
    modalContent.appendChild(carouselContainer);
    modalContent.appendChild(descriptionText);
    modalContent.appendChild(priceText);
    modalContent.appendChild(payButton);
  
    previewModal.appendChild(modalContent);
    document.body.appendChild(previewModal);
  };
  
  // Load random images when page is loaded
  const loadRandomImages = () => {
    const isMobile = window.innerWidth <= 768; // Check if it's mobile screen
    const imageCount = 20; // Number of clones of each image to generate

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
