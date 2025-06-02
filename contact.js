document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

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
    } catch (error) {
      showAlert('Er is een fout opgetreden bij het verzenden van het bericht.', 'error');
      console.error('Fetch error:', error);
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
