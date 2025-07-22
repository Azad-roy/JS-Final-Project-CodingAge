        document.addEventListener('DOMContentLoaded', function () {
            loadIdeas();
            attachEventListeners();
        });

        document.getElementById('ideaForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const idea = {
                title: document.getElementById('ideaTitle').value,
                category: document.getElementById('ideaCategory').value,
                description: document.getElementById('ideaDescription').value,
                date: new Date().toISOString()
            };

            let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
            ideas.unshift(idea);
            localStorage.setItem('ideas', JSON.stringify(ideas));

            displayIdea(idea);

            this.reset();
        });

        function displayIdea(idea) {
            const ideasContainer = document.getElementById('ideasContainer');
            const ideaItem = document.createElement('div');
            ideaItem.className = 'idea-item';
            ideaItem.innerHTML = `
                <h3 class="idea-title">${idea.title}</h3>
                <p class="idea-desc">${idea.description}</p>
                <div class="idea-meta">
                    <span class="idea-category">${idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}</span>
                    <span class="idea-date">Added: ${new Date(idea.date).toLocaleDateString()}</span>
                </div>
                <div class="idea-actions">
                    <button class="action-btn edit">Edit</button>
                    <button class="action-btn delete">Delete</button>
                    <button class="action-btn share">Share</button>
                </div>
            `;

            ideasContainer.prepend(ideaItem);
            attachEventListeners();
        }

        function loadIdeas() {
            const savedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
            savedIdeas.forEach(idea => displayIdea(idea));
        }

        function attachEventListeners() {
            document.querySelectorAll('.edit').forEach(btn => {
                btn.addEventListener('click', function () {
                    const ideaItem = this.closest('.idea-item');
                    const title = ideaItem.querySelector('.idea-title').textContent;
                    const description = ideaItem.querySelector('.idea-desc').textContent;
                    const category = ideaItem.querySelector('.idea-category').textContent.toLowerCase();

                    document.getElementById('ideaTitle').value = title;
                    document.getElementById('ideaDescription').value = description;
                    document.getElementById('ideaCategory').value = category;

                    let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
                    ideas = ideas.filter(idea => idea.title !== title);
                    localStorage.setItem('ideas', JSON.stringify(ideas));
                    ideaItem.remove();
                });
            });

            document.querySelectorAll('.delete').forEach(btn => {
                btn.addEventListener('click', function () {
                    if (confirm('Are you sure you want to delete this idea?')) {
                        const ideaItem = this.closest('.idea-item');
                        const title = ideaItem.querySelector('.idea-title').textContent;

                        let ideas = JSON.parse(localStorage.getItem('ideas')) || [];
                        ideas = ideas.filter(idea => idea.title !== title);
                        localStorage.setItem('ideas', JSON.stringify(ideas));

                        ideaItem.remove();
                    }
                });
            });
        }