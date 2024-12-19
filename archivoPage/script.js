// Define the base URL and extensions
const baseUrl = "https://raw.githubusercontent.com/gdldenoxe/gdldenoxe.github.io/main/archivoPage/archiveImages/archiveImage%20";
const extensions = [".jpeg", ".png", ".gif"]; // Supported extensions
const owner = 'gdldenoxe'; // GitHub username
const repo = 'gdldenoxe.github.io'; // Repository name
const folder = 'archivoPage/archiveImages'; // Folder path in the repository
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

// Always display the loading screen for 10 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none'; // Hide the loading screen after 10 seconds
  }
}, 18000); // 18 seconds (10 seconds + fade-out duration)

// Check if the page has already been refreshed
if (!sessionStorage.getItem('hasRefreshed')) {
  setTimeout(() => {
    sessionStorage.setItem('hasRefreshed', 'true'); // Mark the refresh as done
    location.reload(); // Reload the page
  }, 10000); // 10 seconds
}

// Function to get the total number of images
async function getTotalImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (Array.isArray(data)) {
      const imageFiles = data.filter(file =>
        /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(file.name)
      );
      const totalImages = imageFiles.length;
      console.log(`Total images in folder: ${totalImages}`);
      return totalImages;
    } else {
      console.error('Error: Unexpected response structure:', data);
      return 0;
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
    return 0;
  }
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to generate and display images
async function displayImages(sortBy = 'order') {
  const totalImages = await getTotalImages();

  const galleryContainer = document.getElementById('image-gallery');
  galleryContainer.innerHTML = ''; // Clear existing images

  const imageArray = [];
  for (let i = 1; i <= totalImages; i++) {
    extensions.forEach(ext => {
      const imgUrl = `${baseUrl}(${i})${ext}`;
      imageArray.push(imgUrl);
    });
  }

  // Sort the images based on the selected option
  if (sortBy === 'random') {
    shuffleArray(imageArray);
  } else {
    imageArray.reverse(); // Display in reverse order for "Order"
  }

  // Add images to the gallery
  const fragment = document.createDocumentFragment(); // To avoid frequent DOM updates
  imageArray.forEach((imgUrl, index) => {
    const imgElement = document.createElement('div');
    imgElement.classList.add('grid-item');
    imgElement.innerHTML = `<img src="${imgUrl}" loading="lazy" alt="Image ${index + 1}" onerror="handleImageError(this)" />`;
    fragment.appendChild(imgElement);
  });

  galleryContainer.appendChild(fragment);

  // Initialize Packery after images are added
  const grid = document.querySelector('.grid');
  const pckry = new Packery(grid, {
    itemSelector: '.grid-item',
    percentPosition: true
  });

  // Layout Packery after each image loads
  imagesLoaded(grid).on('progress', function () {
    pckry.layout();
  });
}

// Error handling for images
function handleImageError(imgElement) {
  imgElement.parentElement.style.display = 'none'; // Hide the parent container if the image fails to load
}

// Toggle sort function
let currentSort = 'order';
document.getElementById('toggle-sort').addEventListener('click', () => {
  currentSort = currentSort === 'order' ? 'random' : 'order';
  const sortButton = document.getElementById('toggle-sort');
  sortButton.textContent = `Sort: ${currentSort === 'order' ? 'Random' : 'Order'}`;
  displayImages(currentSort);
});

// Call the function to display images initially
displayImages();
