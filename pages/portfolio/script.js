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

  // Create placeholder grid items first - show instantly
  grid.innerHTML = photos.map((photo, index) => `
    <div class="portfolio-item" data-index="${index}">
      <div class="thumbnail-placeholder" data-photo="${photo}">
        <div class="loading-shimmer"></div>
      </div>
    </div>
  `).join('');

  // Hide loading immediately and show grid
  loadingContainer.style.display = 'none';
  grid.style.display = 'grid';

  // Load thumbnails progressively using Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const placeholder = entry.target;
        const photo = placeholder.dataset.photo;
        const index = placeholder.parentElement.dataset.index;

        // Create optimized thumbnail
        const img = new Image();
        img.onload = () => {
          placeholder.innerHTML = `<img src="./photo/${photo}" alt="Татуировка ${parseInt(index) + 1}">`;
          placeholder.classList.add('loaded');
          // Add click handler after image loads
          placeholder.parentElement.onclick = () => openViewer(parseInt(index));
        };
        img.onerror = () => {
          placeholder.innerHTML = '<div class="error-placeholder">❌</div>';
          placeholder.classList.add('loaded');
        };

        // Start loading the thumbnail
        img.src = `./photo/${photo}`;

        // Stop observing this element
        observer.unobserve(placeholder);
      }
    });
  }, {
    rootMargin: '50px' // Start loading 50px before image comes into view
  });

  // Observe all placeholders
  document.querySelectorAll('.thumbnail-placeholder').forEach(placeholder => {
    observer.observe(placeholder);
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

  // Create photo items with optimized loading
  container.innerHTML = reorderedPhotos.map((photo, index) => `
    <div class="photo-item" data-photo="${photo}">
      <div class="fullsize-placeholder">
        <div class="loading-shimmer"></div>
      </div>
    </div>
  `).join('');

  // Load first image immediately (the selected one)
  const firstItem = container.querySelector('.photo-item');
  loadFullsizeImage(firstItem);

  // Always start from top - selected photo is now first!
  container.scrollTop = 0;

  // Show viewer with fade effect
  viewer.style.display = 'block';
  document.body.style.overflow = 'hidden';

  // Fade in viewer
  requestAnimationFrame(() => {
    viewer.classList.add('active');

    // Set up lazy loading for fullscreen images
    setTimeout(setupFullscreenLazyLoading, 100);
  });
}

function loadFullsizeImage(photoItem) {
  const photo = photoItem.dataset.photo;
  const placeholder = photoItem.querySelector('.fullsize-placeholder');

  if (placeholder.classList.contains('loaded')) return;

  const img = new Image();
  img.onload = () => {
    placeholder.innerHTML = `<img src="./photo/${photo}" alt="Татуировка">`;
    placeholder.classList.add('loaded');
  };
  img.onerror = () => {
    placeholder.innerHTML = '<div class="error-placeholder">Ошибка загрузки</div>';
    placeholder.classList.add('loaded');
  };

  img.src = `./photo/${photo}`;
}

function setupFullscreenLazyLoading() {
  const container = document.getElementById('photoScrollContainer');
  const photoItems = container.querySelectorAll('.photo-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadFullsizeImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: container,
    rootMargin: '100px' // Load images 100px before they come into view
  });

  // Observe all photo items except the first one (already loading)
  photoItems.forEach((item, index) => {
    if (index > 0) { // Skip first item as it's already loading
      observer.observe(item);
    }
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