document.addEventListener('DOMContentLoaded', function() {
    navControl();
    getSkills();
    getProjects();
    handleDialog();
   
});

function navControl() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link a');
    const nav = document.getElementsByTagName('nav')[0];
    navLinks[0].classList.add('active');
    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (this.scrollY >= sectionTop - 60 ) {
                current = section.getAttribute('id');
            }
           
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
            if (current === 'skill' || current === 'contact') {
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

function populateDialog(project){
    const dialog = document.getElementById('dialog-content');
    dialog.innerHTML = ''; // Clear previous content
    const h1 = document.createElement('h1');
    h1.textContent = project.title;
    dialog.appendChild(h1);


    const container = document.createElement('div');
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags';
    project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });
    container.appendChild(tagsContainer);

    const date = document.createElement('span');
    date.classList.add('date');
    date.textContent = project.date;
    container.appendChild(date);

    dialog.appendChild(container);

    const description = document.createElement('div');
    description.className = 'detailDescription';
    project.detailDescription.forEach(txt => {
        const div = document.createElement('div')
        div.innerHTML = txt
        description.appendChild(div)
    })
    dialog.appendChild(description);

    const featuresList = document.createElement('ul');
    featuresList.className = 'features';
    const featuresTitle = document.createElement('h2');
    featuresTitle.textContent = 'Missions';
    dialog.appendChild(featuresTitle);
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    dialog.appendChild(featuresList);
}

function handleDialog(){
    document.querySelector('#dialog .x').addEventListener('click', () => {
        window.dialog.close();       
        document.body.classList.remove('modal-open');
    });
    const dialog = document.getElementById('dialog');
    dialog.addEventListener('click', function(event) {
        const rect = dialog.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        // Si le clic est en dehors du rectangle du contenu
        if (
            x < rect.left ||
            x > rect.right ||
            y < rect.top ||
            y > rect.bottom
        ) {
            dialog.close();
            document.body.classList.remove('modal-open');
        }
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
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    populateDialog(project);
                    window.dialog.showModal();
                    document.body.classList.add('modal-open');
                });


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
                
                const container = document.createElement('div');

                const tags = document.createElement('div');
                tags.classList.add('tags');
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.classList.add('tag');
                    tagElement.textContent = tag;
                    tags.appendChild(tagElement);
                });
                container.appendChild(tags);  
            
                
                const date = document.createElement('span');
                date.classList.add('date');
                date.textContent = project.date;
                container.appendChild(date);

                projectContent.appendChild(container);

                const description = document.createElement('p');
                description.textContent = project.description;
                projectContent.appendChild(description);

                card.appendChild(projectContent);

                projectList.appendChild(card);
            });
        });
}


// Conctact form
const form = document.getElementById('contact_form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
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

    

function displayErrorMessage(fieldId, errorMessage) {
  const errorElement = document.getElementById(fieldId);
  errorElement.textContent = errorMessage;
}
function removeErrorMessage(fieldId) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = "";
  }
function isValidEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}