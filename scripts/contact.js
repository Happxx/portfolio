// Conctact form
// Sélection des éléments du formulaire
const form = document.getElementById('contact_form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation du formulaire lors de la soumission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  // Validation des champs
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue == '') {
    displayErrorMessage('name_validation', 'Merci de renseigner un nom');
    return;
  }else{
    removeErrorMessage('name_validation')
  }

  if (emailValue =='') {
    displayErrorMessage('email_validation', 'Merci de renseigner un email');
    return;
  } else if (!isValidEmail(emailValue)) {
    displayErrorMessage('email_validation', 'Merci de renseigner un email valide');
    return;
  }else{
    removeErrorMessage('email_validation')

  }


  if (messageValue == '') {
    displayErrorMessage('message_validation', 'Merci de rentrer un message');
    return;
  }
    else{
        removeErrorMessage('message_validation')

    }
    const payload = {
        content: `**Nouveau message du portfolio**\n**Nom:** ${nameValue}\n**Email:** ${emailValue}\n**Message:** ${messageValue}`
    };

  function hideSuccessMsg(){
    successMessage.style.display = 'none';
  }   

    const successMessage = document.getElementById('after_submit');
    const webhookUrl = 'https://discord.com/api/webhooks/1251889528550068285/B3MdUyOCqn_N3xbzu_0Eu4IgIltAeMGKiVF4UDl9JcEhymhdDMX9srZ0mpXnXAfEYzg0';

   fetch(webhookUrl, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(payload)
   })
   .then(response => {
       if (response.ok) {
            successMessage.textContent = 'Message envoyé avec succès !';
            form.reset();
        } else {
           alert('Erreur lors de l\'envoi du message.');
       }
   })
   .catch(error => {
       alert('Erreur lors de l\'envoi du message.');
       console.error('Erreur:', error);
   });
  setTimeout( hideSuccessMsg,5000);



});

    

// Fonction pour afficher un message d'erreur sous un champ spécifié
function displayErrorMessage(fieldId, errorMessage) {
  const errorElement = document.getElementById(fieldId);
  errorElement.textContent = errorMessage;
}
function removeErrorMessage(fieldId) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = "";
  }
// Fonction pour valider l'e-mail
function isValidEmail(email) {
  // Utilisez une expression régulière pour valider le format de l'e-mail
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}