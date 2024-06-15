document.addEventListener('DOMContentLoaded', function() {
    fetch('../projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.createElement('div');
            container.classList.add('projects-container');

            projects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('card', 'project');

                projectCard.innerHTML = `
                    <div class="card-header flex flex-col gap-2">
                        <div>
                            <h2>${project.title}</h2>
                            <p class="font-semibold">${project.date}</p>    
                        </div>
                        <ul class="flex gap-3">
                            ${project.tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="card-body pb-3">
                        <p class="pb-3">${project.description}</p>
                        <ul class="project-list text-sm px-3">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <hr class="solid">
                    <div class="card-footer pt-4">
                        <button class="bg-white hover:bg-gray-100 openPopup text-gray-800 py-2 px-3 border border-gray-400 rounded-full shadow flex gap-1 items-center" data-index="${project.id}">
                            Voir le projet
                            <span class="material-symbols-outlined pt-1">
                                arrow_forward
                            </span>
                        </button>
                    </div>
                `;
                container.appendChild(projectCard);
            });

            document.body.appendChild(container);

            // Add event listeners after projects are appended to the DOM
            const closePopup = document.querySelector('.closePopup');
            const openPopupButtons = document.querySelectorAll('.openPopup');
            const popup = document.querySelector('.popup');
            const overlay = document.getElementById('overlay');
            const popupContent = document.querySelector('.popup-content');

            closePopup.addEventListener('click', function() {
                popup.classList.add('hide');
                overlay.style.display = 'none'; // Hide the overlay

                // Remove the 'hide' class after the animation completes
                setTimeout(function() {
                    popup.classList.remove('show');
                    popup.classList.remove('hide');
                    popupContent.innerHTML = ''; // Clear the popup content
                }, 500); // Match this with the duration of your 'slideUp' animation
            });

            openPopupButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const index = this.getAttribute('data-index');
                    const project = projects[index];
                    popupContent.innerHTML = `<p>${project.detailDescription}</p>`;
                    popup.classList.add('show');
                    popup.classList.remove('hide');
                    overlay.style.display = 'block'; // Show the overlay
                });
            });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            document.body.innerHTML = '<p>Sorry, there was an error loading the projects. Please try again later.</p>';
        });
});
