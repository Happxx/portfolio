import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js";

const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar'})


const firstScrollSpyEl = document.querySelector('[data-bs-spy="scroll"]')
    firstScrollSpyEl.addEventListener('activate.bs.scrollspy', a => {
      document.querySelector("header ul li a.actif").classList.remove("actif");
      a.relatedTarget.classList.add("actif")


  })    


  let n = 1;
  document.querySelectorAll(".dot").forEach(element => {
      let hasClass = element.classList.contains("fill");
      if (hasClass) {
          element.classList.add("l" + n);
      }else if(!hasClass && element.classList.contains("dot")){
          element.classList.add("l" + n + "-not-fill");
      }
      n = n < 5 ? n + 1 : 1;

  });
  
  let test = document.querySelector(".container")
  test.addEventListener("mouseenter", function( event ) {
      document.querySelector('.glide-in-image-2').classList.add('active');
      document.querySelector('.glide-in-image').classList.add('active');

  });
  test.addEventListener("mouseleave", function( event ) {
      document.querySelector('.glide-in-image-2').classList.remove('active');
      document.querySelector('.glide-in-image').classList.remove('active');

  });




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
  

  // Si tous les champs sont valides, vous pouvez effectuer l'envoi du formulaire ici
  // Vous pouvez utiliser AJAX pour envoyer les données à votre backend

  function hideSuccessMsg(){
    successMessage.style.display = 'none';
  }   

  // Exemple d'affichage du message de réussite après l'envoi
  const successMessage = document.getElementById('after_submit');
  successMessage.textContent = 'Message envoyé avec succès !';
  // Réinitialisation du formulaire
  form.reset();
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



