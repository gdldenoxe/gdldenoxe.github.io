// Define the GitHub repository details
const owner = 'gdldenoxe';  // Your GitHub username
const repo = 'gdldenoxe.github.io';  // Your GitHub repository name
const folder = 'archivoPage/archiveImages';  // Folder path in the repository

// GitHub API URL to fetch the contents of the 'archiveImages' folder
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Fetch the contents of the folder using the GitHub API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Loop through the API response and create <img> elements dynamically
    data.forEach(file => {
      // Check if the file is an image (you can adjust this check for other file types if needed)
      if (file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) {
        const img = document.createElement('img');
        img.src = file.download_url;  // Use the download URL provided by the GitHub API
        img.alt = file.name;
        img.className = 'gallery-image';
        gallery.appendChild(img);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching image data:', error);
  });