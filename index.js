document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link a');
    const nav = document.getElementsByTagName('nav')[0];
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (this.scrollY - 100 >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
           
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
            if (current === 'skill') {
                nav.classList.add('black');
            } else {
                nav.classList.remove('black');
            }
            
        });
    });
});