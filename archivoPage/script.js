// external js: packery.pkgd.js, imagesloaded.pkgd.js

// Always display the loading screen for 10 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none'; // Hide the loading screen after 10 seconds
  }
}, 18000); // 10 seconds

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
    // Fetch the folder contents from GitHub API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response contains files (some errors might return a different structure)
    if (Array.isArray(data)) {
      // Filter out files that are images (by checking file extensions)
      const imageFiles = data.filter(file =>
        /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(file.name)
      );

      // Get the total number of image files
      const totalImages = imageFiles.length;
      console.log(`Total images in folder: ${totalImages}`);
      return totalImages;
    } else {
      // Handle case when the API does not return an array (e.g., if there is an error)
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
  const totalImages = await getTotalImages(); // Wait for the total image count

  const galleryContainer = document.getElementById('image-gallery');
  const fragment = document.createDocumentFragment(); // To avoid frequent DOM updates

  // Loop in reverse order, so image with position 1 is last
  for (let i = totalImages; i >= 1; i--) {
    let found = false; // Track if a valid image was found

    extensions.forEach(ext => {
      if (!found) { // Only proceed if no valid image is found yet
        const imgUrl = `${baseUrl}(${i})${ext}`;
        const imgElement = document.createElement('div');
        imgElement.classList.add('grid-item');

        // Use lazy loading for images
        imgElement.innerHTML = `<img src="${imgUrl}" loading="lazy" alt="Image ${i}" onerror="handleImageError(this)" />`;

        // Append the image element to the fragment
        fragment.appendChild(imgElement);
        found = true;
      }
    });
  }

  // Append all the images to the gallery at once
  galleryContainer.appendChild(fragment);

  // Initialize Packery after images are added
  var grid = document.querySelector('.grid');
  var pckry = new Packery(grid, {
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