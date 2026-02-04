document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const signupForm = document.getElementById('signupForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const companyNameInput = document.getElementById('companyName');
  const companySizeSelect = document.getElementById('companySize');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const successModal = document.getElementById('successModal');
  const goToDashboardBtn = document.getElementById('goToDashboard');
  
  // Password strength elements
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const passwordRequirements = {
    length: document.getElementById('reqLength'),
    uppercase: document.getElementById('reqUppercase'),
    number: document.getElementById('reqNumber'),
    special: document.getElementById('reqSpecial')
  };
  
  // Form validation functions
  function validateName(name) {
    return name.trim().length >= 2;
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validateCompanyName(name) {
    return name.trim().length >= 2;
  }
  
  // Password validation
  function checkPasswordStrength(password) {
    let strength = 0;
    const requirements = {
      hasLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    // Update requirement indicators
    Object.keys(requirements).forEach((key, index) => {
      const element = Object.values(passwordRequirements)[index];
      if (requirements[key]) {
        element.classList.add('valid');
        strength++;
      } else {
        element.classList.remove('valid');
      }
    });
    
    // Update strength bar and text
    const percentage = (strength / 4) * 100;
    strengthBar.style.width = `${percentage}%`;
    
    if (strength === 0) {
      strengthBar.style.background = 'var(--error)';
      strengthText.textContent = 'Very Weak';
      strengthText.style.color = 'var(--error)';
    } else if (strength === 1) {
      strengthBar.style.background = 'var(--error)';
      strengthText.textContent = 'Weak';
      strengthText.style.color = 'var(--error)';
    } else if (strength === 2) {
      strengthBar.style.background = 'var(--warning)';
      strengthText.textContent = 'Fair';
      strengthText.style.color = 'var(--warning)';
    } else if (strength === 3) {
      strengthBar.style.background = 'var(--info)';
      strengthText.textContent = 'Good';
      strengthText.style.color = 'var(--info)';
    } else {
      strengthBar.style.background = 'var(--success)';
      strengthText.textContent = 'Strong';
      strengthText.style.color = 'var(--success)';
    }
    
    return strength;
  }
  
  function validatePassword(password) {
    return checkPasswordStrength(password) >= 3; // At least "Good" strength
  }
  
  function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
  
  // Show error message
  function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
      
      const input = document.getElementById(inputId);
      if (input) {
        input.parentElement.style.borderColor = 'var(--error)';
      }
    }
  }
  
  // Clear error message
  function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
      
      const input = document.getElementById(inputId);
      if (input) {
        input.parentElement.style.borderColor = 'var(--input-border)';
      }
    }
  }
  
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
  
  // Real-time password strength check
  passwordInput.addEventListener('input', function() {
    checkPasswordStrength(this.value);
  });
  
  // Real-time form validation
  firstNameInput.addEventListener('blur', function() {
    if (!validateName(this.value)) {
      showError('firstName', 'First name must be at least 2 characters');
    } else {
      clearError('firstName');
    }
  });
  
  lastNameInput.addEventListener('blur', function() {
    if (!validateName(this.value)) {
      showError('lastName', 'Last name must be at least 2 characters');
    } else {
      clearError('lastName');
    }
  });
  
  emailInput.addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
      showError('email', 'Please enter a valid work email address');
    } else {
      clearError('email');
    }
  });
  
  companyNameInput.addEventListener('blur', function() {
    if (!validateCompanyName(this.value)) {
      showError('companyName', 'Company name must be at least 2 characters');
    } else {
      clearError('companyName');
    }
  });
  
  confirmPasswordInput.addEventListener('input', function() {
    if (!validatePasswordMatch(passwordInput.value, this.value)) {
      showError('confirmPassword', 'Passwords do not match');
    } else {
      clearError('confirmPassword');
    }
  });
  
  // Form submission
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
      companyName: companyNameInput.value.trim(),
      companySize: companySizeSelect.value,
      industry: document.getElementById('industry').value,
      updates: document.getElementById('updates').checked,
      terms: document.getElementById('terms').checked
    };
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(formData.firstName)) {
      showError('firstName', 'First name must be at least 2 characters');
      isValid = false;
    }
    
    if (!validateName(formData.lastName)) {
      showError('lastName', 'Last name must be at least 2 characters');
      isValid = false;
    }
    
    if (!validateEmail(formData.email)) {
      showError('email', 'Please enter a valid work email address');
      isValid = false;
    }
    
    if (!validatePassword(formData.password)) {
      showError('password', 'Password must be at least "Good" strength');
      isValid = false;
    }
    
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      showError('confirmPassword', 'Passwords do not match');
      isValid = false;
    }
    
    if (!validateCompanyName(formData.companyName)) {
      showError('companyName', 'Company name must be at least 2 characters');
      isValid = false;
    }
    
    if (!formData.companySize) {
      const companySizeGroup = companySizeSelect.parentElement;
      companySizeGroup.style.borderColor = 'var(--error)';
      isValid = false;
    } else {
      companySizeSelect.parentElement.style.borderColor = 'var(--input-border)';
    }
    
    if (!formData.terms) {
      alert('You must agree to the Terms of Service and Privacy Policy');
      isValid = false;
    }
    
    if (!isValid) {
      // Add shake animation to form
      signupForm.classList.add('shake');
      setTimeout(() => {
        signupForm.classList.remove('shake');
      }, 500);
      return;
    }
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Hide loading overlay
      loadingOverlay.classList.remove('active');
      
      // Show success modal
      successModal.classList.add('active');
      
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
    }, 2000);
  });
  
  // Social signup buttons
  document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('google-btn') ? 'Google' : 
                      this.classList.contains('microsoft-btn') ? 'Microsoft' : 'GitHub';
      
      // Show loading overlay
      loadingOverlay.classList.add('active');
      
      // Simulate social signup process
      setTimeout(() => {
        loadingOverlay.classList.remove('active');
        
        // Show success modal for demo
        successModal.classList.add('active');
      }, 1500);
    });
  });
  
  // Go to dashboard button
  goToDashboardBtn.addEventListener('click', function() {
    // In a real app, you would redirect to the dashboard
    alert('Redirecting to dashboard...');
    // window.location.href = 'dashboard.html';
  });
  
  // Close modal when clicking outside
  successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
      successModal.classList.remove('active');
    }
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
    
    /* Progress step animation */
    .step.active .step-number {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(58, 12, 163, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(58, 12, 163, 0); }
      100% { box-shadow: 0 0 0 0 rgba(58, 12, 163, 0); }
    }
  `;
  document.head.appendChild(style);
});