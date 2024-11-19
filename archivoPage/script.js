// Function to fetch and display images from GitHub
async function fetchImages() {
  const owner = 'gdldenoxe'; // Your GitHub username
  const repo = 'gdldenoxe.github.io'; // Your GitHub repository name
  const folder = 'archivoPage/archiveImages'; // Folder path in the repository
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;
  
  try {
    // Fetch image data from GitHub API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Filter out non-image files
    const imageFiles = data.filter(item => item.name.match(/\.(jpg|jpeg|png|gif)$/i));

    // Sort images based on the number inside parentheses in their filename (in reverse order)
    imageFiles.sort((a, b) => {
      const numA = extractNumberFromFilename(a.name);
      const numB = extractNumberFromFilename(b.name);
      return numB - numA;  // Sort descending (largest number first)
    });

    // Load images one by one with a slight delay
    loadImagesOneByOne(imageFiles);

  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
  }
}

// Helper function to extract the number inside parentheses from a filename
function extractNumberFromFilename(filename) {
  const match = filename.match(/\((\d+)\)/);
  return match ? parseInt(match[1], 10) : 0; // Return 0 if no number is found
}

// Function to load images one by one with a slight delay
function loadImagesOneByOne(imageFiles) {
  const grid = document.querySelector('.grid');
  let index = 0;

  // Function to insert an image into the grid
  const insertImage = () => {
    if (index < imageFiles.length) {
      const file = imageFiles[index];
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const img = document.createElement('img');
      img.src = file.download_url;
      img.alt = file.name;

      gridItem.appendChild(img);
      grid.appendChild(gridItem);

      // Increment index to load the next image
      index++;

      // Call this function again with a delay to load the next image
      setTimeout(insertImage, 300);  // Delay of 300ms for each image
    }
  };

  // Start loading the first image
  insertImage();

  // Use imagesLoaded to ensure the layout only initializes once all images have been loaded
  imagesLoaded(grid, function() {
    // Initialize Masonry layout after all images are loaded
    const msnry = new Masonry('.grid', {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      fitWidth: true
    });

    // Force reflow of the layout to ensure everything is aligned
    msnry.layout();

    // Show the grid and hide the loading screen
    document.querySelector('.loading-screen').style.display = 'none';
    document.querySelector('.grid').style.display = 'block';
  });
}

// Show the loading screen for 3 seconds, then refresh the page
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Initially set the grid to fill the viewport height (100vh)
  document.querySelector('.grid').style.height = '100vh';

  // Hide the loading screen after 3 seconds
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    document.querySelector('.grid').style.display = 'block'; // Show the grid
    fetchImages(); // Start fetching and displaying images
  }, 3000); // 3000ms = 3 seconds
});
