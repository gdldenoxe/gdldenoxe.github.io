// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeEzdJmuUP2f3YzPsxN0YJ8PkpLEYMves",
  authDomain: "gdldenoxe-d930c.firebaseapp.com",
  projectId: "gdldenoxe-d930c",
  storageBucket: "gdldenoxe-d930c.firebasestorage.app",
  messagingSenderId: "280833225882",
  appId: "1:280833225882:web:b58cd00861e495e3179b23",
  measurementId: "G-22DDTRK44P"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Get a reference to the gallery container
const gallery = document.getElementById('gallery');

// Get a reference to the 'archiveImages' folder in Firebase Storage
const storageRef = storage.ref('archiveImages/');

// List all items (images) in the folder
storageRef.listAll().then((result) => {
  result.items.forEach((imageRef) => {
      // Get the download URL for each image
      imageRef.getDownloadURL().then((url) => {
          const img = document.createElement('img');
          img.src = url;  // Set the image source to the URL
          img.alt = imageRef.name;  // Use the image file name as alt text
          img.className = 'gallery-image';  // Add styling class
          gallery.appendChild(img);  // Append image to the gallery
      }).catch(error => {
          console.error('Error getting image URL:', error);
      });
  });
}).catch((error) => {
  console.error('Error fetching image list:', error);
});