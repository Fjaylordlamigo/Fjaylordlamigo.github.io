const GITHUB_USERNAME = "Fjaylordlamigo";

async function loadProjects() {
    const container = document.getElementById("projects-container");
    container.innerHTML = "<p>Loading projects...</p>";

    try {
        const response = await fetch("data/projects.json");
        if (!response.ok) throw new Error("Failed to load projects");
        
        const projects = await response.json();
        container.innerHTML = "";

        projects.forEach(project => {
            container.innerHTML += `
                <div class="project-card">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.technologies}</p>
                    <p><strong>My Role:</strong> ${project.role}</p>
                    ${project.githubLink ? 
                        `<a href="${project.githubLink}" target="_blank">View on GitHub →</a>` 
                        : '<p><em>GitHub link coming soon</em></p>'
                    }
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = `<p style="color: red;">❌ Oops! Could not load projects. Check the file path.</p>`;
        console.error("Error loading projects:", error);
    }
}

async function loadGitHubRepos() {
    const container = document.getElementById("repos-container");
    container.innerHTML = "<p>Loading repositories...</p>";

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`);
        if (!response.ok) throw new Error("GitHub API error");
        
        const repos = await response.json();
        container.innerHTML = "";

        repos.forEach(repo => {
            container.innerHTML += `
                <div class="repo-item">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>Main Language: ${repo.language || 'Not specified'}</p>
                </div>
            `;
        });
    } catch (error) {
        container.innerHTML = `<p style="color: red;">⚠️ Could not load GitHub repositories right now.</p>`;
        console.error("Error loading repos:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const formMsg = document.getElementById("form-message");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            formMsg.textContent = "❌ Please fill in all fields.";
            formMsg.style.color = "red";
            return;
        }

        if (!emailPattern.test(email)) {
            formMsg.textContent = "❌ Please enter a valid email address.";
            formMsg.style.color = "red";
            return;
        }

        formMsg.textContent = `✅ Thank you, ${name}! Your message has been sent!`;
        formMsg.style.color = "green";
        form.reset();
    });
});

window.addEventListener("load", function() {
    loadProjects();
    loadGitHubRepos();
});
