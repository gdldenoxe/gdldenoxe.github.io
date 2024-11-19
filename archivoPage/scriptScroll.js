// Define the folder where your images are stored in the GitHub repository
const folder = 'archivoPage/archiveImages';  // Folder path in the repository

// Define the total number of images in your folder (replace with the actual number)
const totalImages = 17;  // Update this number to match the actual count of images

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Loop through the images and create <img> elements
for (let i = totalImages; i > 0; i--) {
    const imageName = `gdldenoxeArchive (${i}).jpg`;  // Update image name based on your format
    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/your-username/your-repository-name/main/${folder}/${imageName}`;  // Update with your GitHub username and repo name
    img.alt = `Image ${i}`;
    img.className = 'gallery-image';
    gallery.appendChild(img);
}
