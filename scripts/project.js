fetch('../projects.json')
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const projectCard = `
            <div class="card project">
                <div class="card-header flex flex-col gap-2">
                    <div>
                        <h2>${project.name}</h2>
                        <p class="font-semibold">${project.year}</p>	
                    </div>
                    <ul class="flex gap-3">
                        ${project.tags.map(tag => `<li class="tag">${tag}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-body">
                    <p>${project.description}</p>
                </div>
            </div>
            `;
            document.body.innerHTML += projectCard;
        });
    })
    .catch(error => console.error(error));