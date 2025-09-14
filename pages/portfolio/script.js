// Portfolio page specific JavaScript
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
}

// Photo data from the photo folder
const photos = [
  'photo_2025-09-12_02-17-28.jpg',
  'photo_2025-09-12_02-17-22.jpg',
  'photo_2025-09-12_02-17-18.jpg',
  'photo_2025-09-12_02-17-13.jpg',
  'photo_2025-09-12_02-17-10.jpg',
  'photo_2025-09-12_02-17-01.jpg',
  'photo_2025-09-12_02-16-57.jpg',
  'photo_2025-09-12_02-16-54.jpg',
  'photo_2025-09-12_02-16-51.jpg',
  'photo_2025-09-12_02-16-48.jpg',
  'photo_2025-09-12_02-16-45.jpg',
  'photo_2025-09-12_02-16-36.jpg',
  'photo_2025-09-12_02-16-33.jpg',
  'photo_2025-09-12_02-16-29.jpg',
  'photo_2025-09-12_02-16-27.jpg',
  'photo_2025-09-12_02-16-23.jpg',
  'photo_2025-09-12_02-16-18.jpg',
  'photo_2025-09-12_02-16-04.jpg',
  'photo_2025-09-12_02-16-01.jpg',
  'photo_2025-09-12_02-15-53.jpg',
  'photo_2025-09-12_02-15-47.jpg',
  'photo_2025-09-12_02-15-44.jpg',
  'photo_2025-09-12_02-15-40.jpg',
  'photo_2025-09-12_02-15-37.jpg',
  'photo_2025-09-12_02-15-31.jpg',
  'photo_2025-09-12_02-15-27.jpg',
  'photo_2025-09-12_02-15-24.jpg',
  'photo_2025-09-12_02-15-21.jpg',
  'photo_2025-09-12_02-15-17.jpg',
  'photo_2025-09-12_02-15-11.jpg'
];

function loadPortfolioGrid() {
  const grid = document.getElementById('portfolioGrid');
  const loadingContainer = document.getElementById('loadingContainer');
  
  // Create grid items
  grid.innerHTML = photos.map((photo, index) => `
    <div class="portfolio-item" onclick="openViewer(${index})">
      <img src="./photo/${photo}" alt="Татуировка ${index + 1}" loading="eager">
    </div>
  `).join('');
  
  // Wait for all images to load
  const images = grid.querySelectorAll('img');
  let loadedCount = 0;
  const totalImages = images.length;
  
  // Function to check if all images are loaded
  function checkAllLoaded() {
    loadedCount++;
    if (loadedCount === totalImages) {
      // All images loaded, show grid and hide loading
      setTimeout(() => {
        loadingContainer.style.display = 'none';
        grid.style.display = 'grid';
      }, 500); // Small delay for smooth transition
    }
  }
  
  // Add load event listeners to all images
  images.forEach(img => {
    if (img.complete) {
      // Image already loaded
      checkAllLoaded();
    } else {
      // Wait for image to load
      img.addEventListener('load', checkAllLoaded);
      img.addEventListener('error', checkAllLoaded); // Count errors as loaded to avoid infinite loading
    }
  });
}

function openViewer(startIndex) {
  const viewer = document.getElementById('fullscreenViewer');
  const container = document.getElementById('photoScrollContainer');
  
  // Reorder photos: selected photo first, then rest, then photos before selected
  const reorderedPhotos = [
    ...photos.slice(startIndex), // From selected photo to end
    ...photos.slice(0, startIndex) // From start to selected photo (these go to end)
  ];
  
  // Create photo items with reordered photos
  container.innerHTML = reorderedPhotos.map((photo, index) => `
    <div class="photo-item">
      <img src="./photo/${photo}" alt="Татуировка ${index + 1}" loading="lazy">
    </div>
  `).join('');
  
  // Always start from top - selected photo is now first!
  container.scrollTop = 0;
  
  // Show viewer with fade effect
  viewer.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Fade in viewer - no need for additional scrolling!
  requestAnimationFrame(() => {
    viewer.classList.add('active');
  });
}

function closeViewer() {
  const viewer = document.getElementById('fullscreenViewer');
  viewer.classList.remove('active');
  
  // Hide viewer after fade-out completes
  setTimeout(() => {
    viewer.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

// Close viewer on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeViewer();
  }
});

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio page loaded');
  loadPortfolioGrid();
});