document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
  
    // List of product images (Main and Sub images for each product)
    const productImages = [
        {
            main: "tiendaImages/blueGDNJacketMain (1).jpg",
            sub: [
                "tiendaImages/blueGDNJacketSub (1).jpg",
                "tiendaImages/blueGDNJacketSub (2).jpg"
            ],
            description: "A stylish blue jacket perfect for any occasion.",
        },
        {
            main: "tiendaImages/blueGDNShirtMain (1).jpg",
            sub: ["tiendaImages/blueGDNShirtSub (1).jpg"],
            description: "A comfortable and sleek blue shirt.",
        },
        {
            main: "tiendaImages/grayGDNShirtMain (1).jpg",
            sub: ["tiendaImages/grayGDNShirtSub (1).jpg"],
            description: "A classic gray shirt for a smart look.",
        },
        {
            main: "tiendaImages/orangeGDNJacketMain (1).jpg",
            sub: [
                "tiendaImages/orangeGDNJacketSub (1).jpg",
                "tiendaImages/orangeGDNJacketSub (2).jpg"
            ],
            description: "A bright and bold orange jacket.",
        },
        {
            main: "tiendaImages/pinGDNJacketMain (1).jpg",
            sub: [
                "tiendaImages/pinGDNJacketSub (1).jpg",
                "tiendaImages/pinGDNJacketSub (2).jpg"
            ],
            description: "A sharp pinstripe jacket with a modern design.",
        },
        {
            main: "tiendaImages/redGDNJacketMain (1).jpg",
            sub: [
                "tiendaImages/redGDNJacketSub (1).jpg",
                "tiendaImages/redGDNJacketSub (2).jpg"
            ],
            description: "A fiery red jacket that stands out.",
        }
    ];
  
    // Image size for desktop (slightly smaller)
    const desktopImageSize = { width: 180, height: 180 };
  
    // Image size for mobile (scaled down)
    const mobileImageSize = { width: 70, height: 70 };
  
    // Function to generate random positions that allow overlap
    const getRandomPosition = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
  
        // Allow random positions with tighter packing but still allow overlap
        const x = Math.random() * (screenWidth - 120); // Prevent images from overflowing on the right side
        const y = Math.random() * (screenHeight - 120); // Prevent images from overflowing on the bottom side
  
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
        const product = productImages.find(product => product.main === mainSrc);
  
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
        payButton.textContent = "Buy Now";
  
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
  
        // For each product image, create 15 clones
        productImages.forEach(product => {
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
  