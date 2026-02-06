document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const billingToggle = document.getElementById('billingToggle');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const yearlyPrices = document.querySelectorAll('.yearly-price');
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Billing Toggle Functionality
  billingToggle.addEventListener('change', function() {
    const isYearly = this.checked;
    
    // Update toggle labels
    const toggleLabels = document.querySelectorAll('.toggle-label');
    toggleLabels.forEach(label => label.classList.remove('active'));
    
    if (isYearly) {
      toggleLabels[1].classList.add('active');
      // Show yearly prices
      monthlyPrices.forEach(price => price.classList.add('hidden'));
      yearlyPrices.forEach(price => price.classList.remove('hidden'));
      
      // Update comparison table prices
      updateComparisonTablePrices(true);
    } else {
      toggleLabels[0].classList.add('active');
      // Show monthly prices
      monthlyPrices.forEach(price => price.classList.remove('hidden'));
      yearlyPrices.forEach(price => price.classList.add('hidden'));
      
      // Update comparison table prices
      updateComparisonTablePrices(false);
    }
  });
  
  // Update comparison table prices
  function updateComparisonTablePrices(isYearly) {
    const starterPrice = document.querySelectorAll('.price-tag')[0];
    const proPrice = document.querySelectorAll('.price-tag')[1];
    
    if (isYearly) {
      starterPrice.innerHTML = '$23<span style="font-size: 0.9rem; opacity: 0.8;">/month</span>';
      proPrice.innerHTML = '$63<span style="font-size: 0.9rem; opacity: 0.8;">/month</span>';
    } else {
      starterPrice.innerHTML = '$29<span style="font-size: 0.9rem; opacity: 0.8;">/month</span>';
      proPrice.innerHTML = '$79<span style="font-size: 0.9rem; opacity: 0.8;">/month</span>';
    }
  }
  
  // FAQ Accordion Functionality
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Plan selection for signup links
  document.querySelectorAll('.plan-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.href.includes('signup.html')) {
        e.preventDefault();
        const plan = this.getAttribute('href').split('=')[1] || 'starter';
        
        // Store selected plan in localStorage
        localStorage.setItem('selectedPlan', plan);
        
        // Redirect to signup page
        window.location.href = 'signup.html';
      }
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 5px 25px rgba(58, 12, 163, 0.12)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 5px 20px rgba(58, 12, 163, 0.08)';
    }
  });
  
  // Add animation to pricing cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe pricing cards
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
  });
});