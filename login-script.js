document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const successModal = document.getElementById('successModal');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  
  // Demo credentials for testing
  const demoCredentials = {
    email: 'demo@nexusflow.com',
    password: 'demo123'
  };
  
  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle eye icon
    const icon = this.querySelector('i');
    if (type === 'text') {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
  
  // Form validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  // Show error message
  function showError(element, message) {
    element.textContent = message;
    element.style.opacity = '1';
  }
  
  // Clear error message
  function clearError(element) {
    element.textContent = '';
    element.style.opacity = '0';
  }
  
  // Input validation on blur
  emailInput.addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
      showError(emailError, 'Please enter a valid email address');
      this.parentElement.querySelector('input').style.borderColor = 'var(--error)';
    } else {
      clearError(emailError);
      this.parentElement.querySelector('input').style.borderColor = 'var(--input-border)';
    }
  });
  
  passwordInput.addEventListener('blur', function() {
    if (!validatePassword(this.value)) {
      showError(passwordError, 'Password must be at least 6 characters');
      this.parentElement.querySelector('input').style.borderColor = 'var(--error)';
    } else {
      clearError(passwordError);
      this.parentElement.querySelector('input').style.borderColor = 'var(--input-border)';
    }
  });
  
  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Reset errors
    clearError(emailError);
    clearError(passwordError);
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail(email)) {
      showError(emailError, 'Please enter a valid email address');
      emailInput.parentElement.querySelector('input').style.borderColor = 'var(--error)';
      isValid = false;
    }
    
    if (!validatePassword(password)) {
      showError(passwordError, 'Password must be at least 6 characters');
      passwordInput.parentElement.querySelector('input').style.borderColor = 'var(--error)';
      isValid = false;
    }
    
    if (!isValid) {
      // Add shake animation to form
      loginForm.classList.add('shake');
      setTimeout(() => {
        loginForm.classList.remove('shake');
      }, 500);
      return;
    }
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Hide loading overlay
      loadingOverlay.classList.remove('active');
      
      // Check credentials (demo validation)
      if (email === demoCredentials.email && password === demoCredentials.password) {
        // Show success modal
        successModal.classList.add('active');
        
        // Redirect after 3 seconds (simulated)
        setTimeout(() => {
          // In a real app, you would redirect to the dashboard
          alert('Login successful! Redirecting to dashboard...');
          // window.location.href = 'dashboard.html';
        }, 3000);
      } else {
        // Show error message
        showError(passwordError, 'Invalid email or password');
        passwordInput.parentElement.querySelector('input').style.borderColor = 'var(--error)';
        
        // Add shake animation to form
        loginForm.classList.add('shake');
        setTimeout(() => {
          loginForm.classList.remove('shake');
        }, 500);
      }
    }, 1500);
  });
  
  // Social login buttons
  document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
      
      // Show loading overlay
      loadingOverlay.classList.add('active');
      
      // Simulate social login process
      setTimeout(() => {
        loadingOverlay.classList.remove('active');
        
        // Show success modal for demo
        successModal.classList.add('active');
        
        // Redirect after 3 seconds (simulated)
        //setTimeout(() => {
         // alert(`${provider} login successful! Redirecting to dashboard...`);
          // window.location.href = 'dashboard.html';
        }, 3000);
      }, 1500);
    });
  });
  
  // Forgot password link
  document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = prompt('Please enter your email address to reset your password:');
    if (email && validateEmail(email)) {
      alert(`Password reset link has been sent to ${email}. Please check your inbox.`);
    } else if (email) {
      alert('Please enter a valid email address.');
    }
  });
  
  // Sign up link
  document.querySelector('.signup-link a').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecting to sign up page...');
    // In a real app: window.location.href = 'signup.html';
  });
  
  // Add CSS for shake animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);
});