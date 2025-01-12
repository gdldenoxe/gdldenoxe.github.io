// Modal functionality
const modal = document.getElementById('productModal');
const closeBtn = document.getElementById('closeBtn');
const carouselImage = document.getElementById('carouselImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const productTitle = document.getElementById('productTitle');
const productDescription = document.getElementById('productDescription');

// Variables for carousel
let currentIndex = 0;
let mainImage = "";
let subImages = [];

// Event listener for opening the modal
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(image => {
  image.addEventListener('click', () => {
    // Get product data from the clicked image
    mainImage = image.dataset.main;
    subImages = JSON.parse(image.dataset.subs);
    
    // Set initial image in the carousel
    carouselImage.src = mainImage;
    
    // Set product title and description
    productTitle.textContent = image.alt;
    productDescription.textContent = `This is a stylish ${image.alt} made for comfort and style. It's perfect for any occasion and a great addition to your wardrobe.`;
    
    // Open the modal
    modal.style.display = "flex";
  });
});

// Close modal functionality
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});

// Close modal if clicked outside of the modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Carousel functionality
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + [mainImage, ...subImages].length) % [mainImage, ...subImages].length;
  carouselImage.src = [mainImage, ...subImages][currentIndex];
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % [mainImage, ...subImages].length;
  carouselImage.src = [mainImage, ...subImages][currentIndex];
});

// Pay button functionality (this can link to a payment page or integration)
document.querySelector('.pay-button').addEventListener('click', () => {
  alert("Proceeding to payment...");
});
