// external js: packery.pkgd.js, imagesloaded.pkgd.js

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
