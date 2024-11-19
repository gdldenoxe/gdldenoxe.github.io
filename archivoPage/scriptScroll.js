// Define the GitHub repository details
const owner = 'gdldenoxe';  // Your GitHub username
const repo = 'gdldenoxe.github.io';  // Your GitHub repository name
const folder = 'archivoPage/archiveImages';  // Folder path in the repository

// GitHub API URL to fetch the contents of the 'archiveImages' folder
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Random position generator for each image
const randomPosition = () => {
  const randomTop = Math.random() * 80 + 10;  // Random top value between 10% and 90%
  const randomLeft = Math.random() * 80 + 10;  // Random left value between 10% and 90%
  return {
    top: `${randomTop}%`,
    left: `${randomLeft}%`
  };
};

// Fetch the contents of the folder using the GitHub API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Reverse the data array to ensure the first image is the last to be displayed
    data.reverse();

    // Loop through the API response and create <img> elements dynamically
    data.forEach(file => {
      // Check if the file is an image
      if (file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) {
        const img = document.createElement('img');
        img.src = file.download_url;  // Use the download URL provided by the GitHub API
        img.alt = file.name;
        img.className = 'gallery-image';

        // Apply random rotation (90, 180, or 270 degrees)
        const randomRotation = [90, 180, 270][Math.floor(Math.random() * 3)];
        img.style.transform = `rotate(${randomRotation}deg)`;  // Random rotation

        // Apply random position
        const position = randomPosition();
        img.style.top = position.top;
        img.style.left = position.left;

        // Append the image to the gallery container
        gallery.appendChild(img);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching image data:', error);
  });