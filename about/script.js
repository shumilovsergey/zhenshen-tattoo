// About page specific JavaScript
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
}

function goToWebsite(event) {
  event.preventDefault();
  // Navigate to main page since this IS the website
  window.location.href = '../index.html';
}

// Add any about page specific functionality here
document.addEventListener('DOMContentLoaded', function() {
  console.log('About page loaded');
  
  // Add fade-in animation for content sections
  const sections = document.querySelectorAll('.about-content > div');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});