document.addEventListener('DOMContentLoaded', function() {
  // Add scroll effect to navbar
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 5px 25px rgba(58, 12, 163, 0.12)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.85)';
      navbar.style.boxShadow = '0 5px 20px rgba(58, 12, 163, 0.08)';
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add hover effect to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Button click handlers
 /* document.querySelectorAll('.primary-btn, .get-started-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', function() {
      // In a real implementation, this would trigger a signup modal
      alert('Welcome to NexusFlow! You would now be redirected to our signup page.');
    });
  });
*/
  // Logo strip hover effect
  const logoItems = document.querySelectorAll('.logo-item');
  logoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Secondary button handler
  document.querySelector('.secondary-btn').addEventListener('click', function() {
    alert('Opening demo video in a modal or new window.');
  });

  // Feature links handler
  document.querySelectorAll('.feature-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const featureTitle = this.parentElement.querySelector('.feature-title').textContent;
      alert(`More information about ${featureTitle} would be displayed here.`);
    });
  });
});