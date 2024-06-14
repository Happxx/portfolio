

let closePopup = document.querySelector('.closePopup');
let openPopup = document.querySelector('.openPopup');
var popup = document.querySelector('.popup');

closePopup.addEventListener('click', function() {
  popup.classList.add('hide');
  overlay.style.display = 'none'; // Hide the overlay

  // Remove the 'hide' class after the animation completes
  setTimeout(function() {
    popup.classList.remove('show');
  }, 500); // Match this with the duration of your 'slideUp' animation
});

openPopup.addEventListener('click', function() {
  popup.classList.add('show');
  popup.classList.remove('hide');
  overlay.style.display = 'block'; // Show the overlay


});


