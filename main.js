let nav = document.querySelector('nav');
let line = document.createElement('div');
line.classList.add('line');

nav.appendChild(line);

let active = nav.querySelector('.active a');
let posActive = 0;
let widActive = 0;

if(active) {
  let activeRect = active.getBoundingClientRect();
  let navRect = nav.getBoundingClientRect();
  console.log(activeRect.left, navRect.left)
  posActive = activeRect.left - navRect.left;
  widActive = active.offsetWidth;
  line.style.left = posActive + 'px';
  line.style.width = widActive + 'px';
  line.style.transition = 'all 0.3s ease'; 
}

nav.querySelectorAll('nav ul li a').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();

    let aRect = a.getBoundingClientRect();
    let navRect = nav.getBoundingClientRect();
    let position = aRect.left - navRect.left;
    let width = a.offsetWidth;

    if(position >= posActive) {
      line.style.width = ((position - posActive) + width) + 'px';
      setTimeout(function() {
        line.style.width = width + 'px';
        line.style.left = position + 'px';
        setTimeout(function() {
          window.location.href = a.href;
        }, 200);
      }, 200);
    } else {
      line.style.left = position + 'px';
      line.style.width = ((posActive - position) + widActive) + 'px';
      setTimeout(function() {
        line.style.width = width + 'px';
        setTimeout(function() {
          window.location.href = a.href;
        }, 200);
      }, 200);
    }
  });
});

window.addEventListener('resize', function() {
  line.style.transition = 'none';
  if(active) {
    let activeRect = active.getBoundingClientRect();
    let navRect = nav.getBoundingClientRect();
    posActive = activeRect.left - navRect.left;
    widActive = active.offsetWidth;
    line.style.left = posActive + 'px';
    line.style.width = widActive + 'px';
  }
});
