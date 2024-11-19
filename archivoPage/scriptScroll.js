// GitHub repository details
const owner = 'gdldenoxe'; // Your GitHub username
const repo = 'gdldenoxe.github.io'; // Your GitHub repository name
const folder = 'archivoPage/archiveImages'; // Folder path in the repository

// GitHub API URL to fetch the contents of the folder
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Fetch images dynamically from the GitHub API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Check if data is not empty
        if (!data || data.length === 0) {
            console.error('No images found or issue with the GitHub API request');
            return;
        }

        // Filter out only image files (based on extension)
        const imageFiles = data.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i));

        // Sort images by filename in ascending order (can adjust this for custom order)
        imageFiles.sort((a, b) => {
            const aName = a.name.match(/\d+/g) ? parseInt(a.name.match(/\d+/g)[0]) : 0;
            const bName = b.name.match(/\d+/g) ? parseInt(b.name.match(/\d+/g)[0]) : 0;
            return aName - bName;  // Sort by the number extracted from the image name
        });

        // Reverse the array to make the first image the last to be displayed
        imageFiles.reverse();

        // Loop through each image file and add it to the gallery
        imageFiles.forEach(file => {
            const img = document.createElement('img');
            img.src = file.download_url; // Use the GitHub file's raw URL
            img.alt = file.name;
            img.className = 'gallery-image';

            // Debugging: Check if the image URL is correct
            console.log(`Loading image: ${file.download_url}`);

            // Append image to the gallery
            gallery.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error fetching image data:', error);
    });
