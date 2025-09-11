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
  
  grid.innerHTML = photos.map((photo, index) => `
    <div class="portfolio-item" onclick="openViewer(${index})">
      <img src="./photo/${photo}" alt="Татуировка ${index + 1}" loading="lazy">
    </div>
  `).join('');
}

function openViewer(startIndex) {
  const viewer = document.getElementById('fullscreenViewer');
  const container = document.getElementById('photoContainer');
  
  // Create all photo slides
  container.innerHTML = photos.map((photo, index) => `
    <div class="photo-slide">
      <img src="./photo/${photo}" alt="Татуировка ${index + 1}" loading="lazy">
    </div>
  `).join('');
  
  // Show viewer
  viewer.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Scroll to the clicked photo
  const targetSlide = container.children[startIndex];
  if (targetSlide) {
    targetSlide.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeViewer() {
  const viewer = document.getElementById('fullscreenViewer');
  viewer.classList.remove('active');
  document.body.style.overflow = '';
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