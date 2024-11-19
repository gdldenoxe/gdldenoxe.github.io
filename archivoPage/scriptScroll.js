// Define the GitHub repository details
const owner = 'gdldenoxe';  // Your GitHub username
const repo = 'gdldenoxe.github.io';  // Your GitHub repository name
const folder = 'archivoPage/archiveImages';  // Folder path in the repository

// GitHub API URL to fetch the contents of the 'archiveImages' folder
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Function to generate a static rotation
const randomRotation = (index) => {
    const rotations = [0, 90, -90, 15, -15]; // Add subtle variations
    return rotations[index % rotations.length]; // Keep it deterministic
};

// Fetch the contents of the folder using the GitHub API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Reverse the data array to ensure the first image is the last displayed
        data.reverse();

        // Define positioning variables
        const overlapFactor = 5; // Percentage of overlap between images
        let x = 0; // X-axis starting point
        let y = 0; // Y-axis starting point
        let rowHeight = 0; // Track height of the current row
        const imageWidth = 18; // Image size in vw

        // Loop through the API response and create <img> elements dynamically
        data.forEach((file, index) => {
            // Check if the file is an image
            if (file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) {
                const img = document.createElement('img');
                img.src = file.download_url; // Use the download URL provided by the GitHub API
                img.alt = file.name;
                img.className = 'gallery-image';

                // Apply static rotation
                const rotation = randomRotation(index);
                img.style.transform = `rotate(${rotation}deg)`;

                // Set position
                img.style.left = `${x}vw`;
                img.style.top = `${y}vh`;

                // Append the image to the gallery container
                gallery.appendChild(img);

                // Update row height based on this image
                const imgHeight = (imageWidth * 1.5); // Aspect ratio adjustment
                rowHeight = Math.max(rowHeight, imgHeight);

                // Increment x position for the next image
                x += imageWidth - overlapFactor;

                // Move to the next row if the current row exceeds screen width
                if (x + imageWidth > 100) {
                    x = 0; // Reset to the start of the row
                    y += rowHeight - overlapFactor; // Move down by the row height
                    rowHeight = 0; // Reset row height for the next row
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching image data:', error);
    });