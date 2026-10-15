// Dark / Light Mode Toggle Feature
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '🌙 Theme';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️ Theme';
    }
});

// Load Projects from JSON API / File
document.addEventListener("DOMContentLoaded", () => {
    fetch('data/projects.json')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('project-container');
            data.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.technologies}</p>
                    <p><strong>Role:</strong> ${project.role}</p>
                    <a href="${project.link}" target="_blank" class="btn">View Project</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading projects:", error);
            document.getElementById('error-message').style.display = 'block';
        });

    // Contact Form Validation & Submission Handling
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        if (!email.includes('@') || !email.includes('.')) {
            feedback.style.color = '#f87171';
            feedback.textContent = 'Please enter a valid email address.';
            return;
        }

        feedback.style.color = '#4ade80';
        feedback.textContent = 'Thank you! Your message has been sent successfully.';
        form.reset();
    });
});
