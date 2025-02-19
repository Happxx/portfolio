document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link a');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (this.scrollY >= (sectionTop+200) - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
           
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
            if (current === 'skill') {
                link.classList.add('black');
            } else {
                link.classList.remove('black');
            }
            
        });
    });
});