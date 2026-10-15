
const GITHUB_USER = "YOUR-GITHUB-USERNAME";


const projects = [
    {
        title: "My First Website",
        description: "Simple personal homepage using HTML & CSS",
        tech: "HTML, CSS",
        role: "Solo Project",
        link: ""
    },
    {
        title: "Student Profile Card",
        description: "Profile page showing my info and skills",
        tech: "HTML, CSS, JS",
        role: "Solo Project",
        link: ""
    },
    {
        title: "Simple Calculator",
        description: "Basic calculator app using JavaScript",
        tech: "HTML, CSS, JavaScript",
        role: "Solo Project",
        link: ""
    }
];


function loadProjects() {
    const container = document.getElementById("project-list");
    container.innerHTML = "";
    
    projects.forEach(proj => {
        container.innerHTML += `
            <div class="project-card">
                <h4>${proj.title}</h4>
                <p>${proj.description}</p>
                <p><strong>Tech:</strong> ${proj.tech}</p>
                <p><em>My role: ${proj.role}</em></p>
            </div>
        `;
    });
}


async function loadRepos() {
    const container = document.getElementById("repo-list");
    try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=5`);
        if (!res.ok) throw new Error("Failed");
        const repos = await res.json();
        
        container.innerHTML = "";
        repos.forEach(repo => {
            container.innerHTML += `
                <div class="repo-item">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>Language: ${repo.language || "Not specified"}</p>
                </div>
            `;
        });
    } catch (err) {
        container.innerHTML = "<p>Could not load repositories right now.</p>";
    }
}


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        document.getElementById("formMsg").textContent = "❌ Please enter a valid email";
        document.getElementById("formMsg").style.color = "red";
        return;
    }
    
    document.getElementById("formMsg").textContent = `✅ Thank you, ${name}! Message sent!`;
    document.getElementById("formMsg").style.color = "green";
    this.reset();
});


window.onload = function() {
    loadProjects();
    loadRepos();
};
