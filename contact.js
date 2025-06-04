document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  
  // Save form position for scrolling back after submission
  const saveFormPosition = () => {
    // Store the contact form's position in session storage
    const formRect = form.getBoundingClientRect();
    const absoluteFormTop = window.pageYOffset + formRect.top;
    sessionStorage.setItem('formPosition', absoluteFormTop);
    return absoluteFormTop;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Save the form's position before making any changes
    const formPosition = saveFormPosition();

    // Verwijder oude meldingen als die er zijn
    const oldAlert = document.querySelector('.hk-alert');
    if (oldAlert) oldAlert.remove();

    // Verzamel form data
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        showAlert('Je bericht is succesvol verzonden!', 'success');
        form.reset();
      } else {
        showAlert('Er is iets misgegaan: ' + (result.message || 'Probeer het later opnieuw.'), 'error');
      }
      
      // Scroll back to form position to prevent jumping
      setTimeout(() => {
        window.scrollTo({
          top: formPosition - 100, // Adjust to show the alert message
          behavior: 'smooth'
        });
      }, 100);
      
    } catch (error) {
      showAlert('Er is een fout opgetreden bij het verzenden van het bericht.', 'error');
      console.error('Fetch error:', error);
      
      // Even on error, scroll back to form
      window.scrollTo({
        top: formPosition - 100,
        behavior: 'smooth'
      });
    }
  });

  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `hk-alert hk-alert-${type}`;
    alertDiv.textContent = message;

    form.parentNode.insertBefore(alertDiv, form);

    // Optioneel: alert na 5 seconden automatisch verwijderen
    setTimeout(() => alertDiv.remove(), 5000);
  }
});
