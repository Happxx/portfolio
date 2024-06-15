fetch('../projects.json')
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const projectCard = `
            <div class="card project">
                <div class="card-header flex flex-col gap-2">
                    <div>
                        <h2>${project.title}</h2>
                        <p class="font-semibold">${project.date}</p>	
                    </div>
                    <ul class="flex gap-3">
                        ${project.tags.map(tags => `<li class="tag">${tags}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-body pb-3">
                    <pclass="pb-3>${project.description}</p>
                    <ul class="projet-list text-sm px-3">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <hr class="solid">
                <div class="card-footer pt-4">
                <button class="bg-white hover:bg-gray-100 openPopup text-gray-800 py-2 px-3 border border-gray-400 rounded-full shadow flex gap-1 items-center">
                Voir le projet
                <span class="material-symbols-outlined pt-1">
                    arrow_forward
                </span>
            </button>

        </div>
            </div>

            `;
            document.body.innerHTML += projectCard;
        });
        
    })
    .catch(error => console.error(error));