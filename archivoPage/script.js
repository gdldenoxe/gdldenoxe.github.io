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
      const numA = parseInt(a.name.match(/\((\d+)\)/)?.[1], 10);
      const numB = parseInt(b.name.match(/\((\d+)\)/)?.[1], 10);
      return numB - numA;  // Reverse the order (largest first)
    });

    // Insert images into the grid
    insertImagesIntoGrid(imageFiles);

  } catch (error) {
    console.error('Error fetching images from GitHub:', error);
  }
}

// Function to insert images into the grid
function insertImagesIntoGrid(imageFiles) {
  const grid = document.querySelector('.grid');

  imageFiles.forEach(file => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    const img = document.createElement('img');
    img.src = file.download_url;
    img.alt = file.name;

    gridItem.appendChild(img);
    grid.appendChild(gridItem);
  });

  // Initialize Masonry after images are inserted (no loading animation)
  var msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    fitWidth: true // No overlap, no loading animation
  });
}

// Call the fetchImages function when the page loads
window.addEventListener('load', fetchImages);
