const GITHUB_USERNAME = "Fjaylordlamigo";

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Load Projects
async function loadProjects() {
    const container = document.getElementById("projects-container");
    container.innerHTML = "<p class='loading-text'>▶ Loading data...</p>";

    try {
        const res = await fetch("data/projects.json");
        if (!res.ok) throw new Error("Error");
        const projects = await res.json();
        
        container.innerHTML = "";
        projects.forEach(p => {
            container.innerHTML += `
                <div class="project-card">
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                    <p><strong>Tech:</strong> ${p.technologies}</p>
                    <p><strong>Role:</strong> ${p.role}</p>
                    ${p.githubLink ? `<a href="${p.githubLink}" target="_blank">→ View on GitHub</a>` : `<p style="color:var(--gray); font-size:0.85rem;">Status: Private</p>`}
                </div>
            `;
        });
    } catch (err) {
        container.innerHTML = `<p style="color:#FF6B35;">⚠ Data file not found. Check path: data/projects.json</p>`;
    }
}

// Load GitHub Repos
async function loadGitHubRepos() {
    const container = document.getElementById("repos-container");
    container.innerHTML = "<p class='loading-text'>▶ Loading data...</p>";

    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error("Error");
        const repos = await res.json();
        
        container.innerHTML = "";
        if (repos.length === 0) {
            container.innerHTML = `<p class="loading-text">No repositories yet. Create one on GitHub!</p>`;
            return;
        }
        
        repos.forEach(r => {
            container.innerHTML += `
                <div class="repo-item">
                    <a href="${r.html_url}" target="_blank">${r.name}</a>
                    <p>${r.description || 'No description available'}</p>
                    <p style="font-size:0.8rem; color:var(--gray);">★ ${r.stargazers_count} • ◈ ${r.forks_count}</p>
                </div>
            `;
        });
    } catch (err) {
        container.innerHTML = `<p style="color:#FF6B35;">⚠ Cannot load GitHub data.</p>`;
    }
}

// Contact Form
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = this[0].value.trim();
    const email = this[1].value.trim();
    const message = this[2].value.trim();
    const msgBox = document.getElementById("form-message");
    
    if (!name || !email || !message) {
        msgBox.textContent = "⚠ Please fill in all fields.";
        msgBox.style.color = "#FF6B35";
        return;
    }
    
    msgBox.textContent = "✓ Message sent successfully!";
    msgBox.style.color = "#00D9FF";
    this.reset();
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    loadGitHubRepos();
});
