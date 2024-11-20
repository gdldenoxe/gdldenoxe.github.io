// External libraries are loaded at the top of the HTML file

// Always display the loading screen for 10 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none'; // Hide the loading screen after 10 seconds
  }
}, 18000); // 18 seconds (10 seconds + fade out duration)

// Check if the page has already been refreshed
if (!sessionStorage.getItem('hasRefreshed')) {
  // Mark the refresh as done and reload the page after 10 seconds
  setTimeout(() => {
    sessionStorage.setItem('hasRefreshed', 'true'); // Track the refresh
    location.reload(); // Reload the page
  }, 10000); // 10 seconds
}

// Define the number of images you want
const baseUrl = "https://raw.githubusercontent.com/gdldenoxe/gdldenoxe.github.io/main/archivoPage/archiveImages/archiveImage%20";
const extensions = [".jpeg", ".png", ".gif"]; // Array of supported extensions
const owner = 'gdldenoxe'; // Your GitHub username
const repo = 'gdldenoxe.github.io'; // Your GitHub repository name
const folder = 'archivoPage/archiveImages'; // Folder path in the repository
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

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

// Function to generate images and display them in the gallery
async function displayImages() {
  const totalImages = await getTotalImages();

  const galleryContainer = document.getElementById('image-gallery');
  const fragment = document.createDocumentFragment(); // To avoid frequent DOM updates

  // Loop in reverse order
  for (let i = totalImages; i >= 1; i--) {
    let found = false;

    extensions.forEach(ext => {
      if (!found) {
        const imgUrl = `${baseUrl}(${i})${ext}`;
        const imgElement = document.createElement('div');
        imgElement.classList.add('grid-item');

        // Use lazy loading for images
        imgElement.innerHTML = `<img src="${imgUrl}" loading="lazy" alt="Image ${i}" onerror="handleImageError(this)" />`;

        fragment.appendChild(imgElement);
        found = true;
      }
    });
  }

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

// Call the function to display images
displayImages();
