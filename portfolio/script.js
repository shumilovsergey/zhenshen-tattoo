// Portfolio page specific JavaScript
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
}

// Sample portfolio data (replace with real data)
const portfolioData = [
  // Add portfolio items here when ready
  // {
  //   id: 1,
  //   title: "Графическая татуировка",
  //   description: "Минималистичный дизайн с четкими линиями",
  //   image: "../assets/portfolio/1.jpg",
  //   category: "graphic"
  // }
];

function loadPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (portfolioData.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  grid.style.display = 'grid';
  emptyState.style.display = 'none';
  
  grid.innerHTML = portfolioData.map(item => `
    <div class="portfolio-item" onclick="openLightbox(${item.id})">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="portfolio-item-overlay">
        <h4 class="portfolio-item-title">${item.title}</h4>
        <p class="portfolio-item-description">${item.description}</p>
      </div>
    </div>
  `).join('');
}

function openLightbox(itemId) {
  const item = portfolioData.find(p => p.id === itemId);
  if (!item) return;
  
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const description = document.getElementById('lightboxDescription');
  
  image.src = item.image;
  title.textContent = item.title;
  description.textContent = item.description;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Close lightbox on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

// Initialize portfolio on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio page loaded');
  loadPortfolio();
});