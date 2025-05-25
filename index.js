document.addEventListener('DOMContentLoaded', function() {
    navControl();
    getSkills();
    getProjects();
});

function navControl() {
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
}

function getSkills(){
    fetch('./json/skills.json')
        .then(response => response.json())
        .then(skills => {
            const skillList = document.querySelector('.skill-list');
            
            skills.forEach(skill => {
                const card = document.createElement('div');
                card.classList.add('card-skill');
        
                const h2 = document.createElement('h2');
                h2.textContent = skill.title;
                card.appendChild(h2);
        
                const ul = document.createElement('ul');
                skill.items.forEach(item => {
                    const li = document.createElement('li');
        
                    const img = document.createElement('img');
                    img.src = item.img;
                    img.alt = item.text;
                    li.appendChild(img);
        
                    const span = document.createElement('span');
                    span.textContent = item.text;
                    li.appendChild(span);
        
                    ul.appendChild(li);
                });
                card.appendChild(ul);
        
                if (skill.subsections) {
                    skill.subsections.forEach(subsection => {
                        const h3 = document.createElement('h3');
                        h3.textContent = subsection.title;
                        card.appendChild(h3);
        
                        const subUl = document.createElement('ul');
                        subsection.items.forEach(subItem => {
                            const subLi = document.createElement('li');
        
                            const subImg = document.createElement('img');
                            subImg.src = subItem.img;
                            subImg.alt = subItem.text;
                            subLi.appendChild(subImg);
        
                            const subSpan = document.createElement('span');
                            subSpan.textContent = subItem.text;
                            subLi.appendChild(subSpan);
        
                            subUl.appendChild(subLi);
                        });
                        card.appendChild(subUl);
                    });
                }
        
                skillList.appendChild(card);
            });
        });
   
}


function getProjects() {
    fetch('./json/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectList = document.querySelector('.project-list');

            projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.onclick = () => {
                    window.dialog.showModal();
                }
                const projectImage = document.createElement('div');
                projectImage.classList.add('project-image');

                const img = document.createElement('img');
                img.src = project.img;
                img.alt = project.title;
                projectImage.appendChild(img);

                const wave = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 
                wave.classList.add('wave');
                wave.setAttribute('viewBox', '0 0 500 150');
                wave.setAttribute('preserveAspectRatio', 'none');

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', 'M0,100 C150,200 350,0 500,100 L500,150 L0,150 Z');
                wave.appendChild(path);

                projectImage.appendChild(wave);

                projectImage.appendChild(wave);
                card.appendChild(projectImage);

                const projectContent = document.createElement('div');
                projectContent.classList.add('project-content');

                const title = document.createElement('h1');
                title.classList.add('title');
                title.textContent = project.title;
                projectContent.appendChild(title);
                
                const tags = document.createElement('div');
                tags.classList.add('tags');
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.classList.add('tag');
                    tagElement.textContent = tag;
                    tags.appendChild(tagElement);
                });
                projectContent.appendChild(tags);    
            
                const description = document.createElement('p');
                description.textContent = project.description;
                projectContent.appendChild(description);

                card.appendChild(projectContent);

                projectList.appendChild(card);
            });
        });
}