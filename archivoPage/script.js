// external js: packery.pkgd.js, imagesloaded.pkgd.js

   // Check if the page has already been refreshed
   if (!sessionStorage.getItem('refreshed')) {
    setTimeout(() => {
      sessionStorage.setItem('refreshed', true); // Mark the refresh as done
      location.reload(); // Refresh the page
    }, 5000);
  } else {
    // Hide the loading screen if the page has already been refreshed
    document.getElementById('loading-screen').style.display = 'none';
  }
  
  const totalImages = 51; // Define the number of images you want
  const baseUrl = "https://raw.githubusercontent.com/gdldenoxe/gdldenoxe.github.io/main/archivoPage/archiveImages/archiveImage%20";
  const extensions = [".jpeg", ".png", ".gif"]; // Array of supported extensions

  for (let i = 1; i <= totalImages; i++) {
    let found = false; // Track if a valid image was found
    extensions.forEach(ext => {
      if (!found) { // Only proceed if no valid image is found yet
        const imgUrl = `${baseUrl}(${i})${ext}`;
        const imgElement = `<div class="grid-item"><img src="${imgUrl}" onerror="this.parentElement.style.display='none'" /></div>`;
        document.getElementById('image-gallery').innerHTML += imgElement;
        found = true;
      }
    });
  }
// init Packery
var grid = document.querySelector('.grid');
var pckry = new Packery( grid, {
  itemSelector: '.grid-item',
  percentPosition: true
});
// layout Packery after each image loads
imagesLoaded( grid ).on( 'progress', function() {
  pckry.layout();
});  
