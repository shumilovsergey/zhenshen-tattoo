// Selfcare page specific JavaScript
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../index.html';
  }
}

function contactMaster() {
  window.open('https://t.me/zhenshen14', '_blank');
}

// Initialize selfcare page
document.addEventListener('DOMContentLoaded', function() {
  console.log('Selfcare page loaded');
  
  // Add fade-in animation for timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});