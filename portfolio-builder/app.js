// =============================================================================
// PORTFOLIO WEBSITE BUILDER - JAVASCRIPT
// =============================================================================

// Pre-loaded repositories data
const repositories = [
    {
        name: 'Loan Market Association',
        url: 'https://github.com/Mkhize975/loanmarketassociation',
        description: 'A full-stack application for managing loan market data and associations',
        languages: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
        languagePercents: [42.9, 39.3, 9.1, 8.7],
        stars: 0
    },
    {
        name: 'LinguaGlow',
        url: 'https://github.com/Mkhize975/LinguaGlow',
        description: 'Language learning platform with AI-powered features',
        languages: ['TypeScript', 'PLpgSQL', 'CSS'],
        languagePercents: [95.8, 1.8, 1.4],
        stars: 0
    },
    {
        name: 'Calculator App',
        url: 'https://github.com/Mkhize975/CalculatorApp',
        description: 'A functional calculator application built with Java',
        languages: ['Java'],
        languagePercents: [100],
        stars: 0
    },
    {
        name: 'Palindrome Checker',
        url: 'https://github.com/Mkhize975/Palindromecheckerpart2',
        description: 'JavaScript app that checks whether a given word or sentence is a palindrome',
        languages: ['JavaScript'],
        languagePercents: [100],
        stars: 0
    },
    {
        name: 'Portfolio Website',
        url: 'https://github.com/Mkhize975/Website',
        description: 'Personal portfolio website showcasing projects and skills',
        languages: ['CSS', 'HTML', 'JavaScript'],
        languagePercents: [46.4, 35.9, 17.7],
        stars: 0
    },
    {
        name: 'Banana Rotation',
        url: 'https://github.com/Mkhize975/Bananarotation',
        description: 'Fun Python project using Pygame displaying a rotating banana image',
        languages: ['Python'],
        languagePercents: [100],
        stars: 0
    },
    {
        name: 'Fastway Couriers',
        url: 'https://github.com/Mkhize975/Fastwaycouriers',
        description: 'Courier management system with tracking and logistics features',
        languages: ['HTML', 'CSS', 'JavaScript'],
        languagePercents: [56.3, 24.7, 19],
        stars: 0
    },
    {
        name: 'AlphaChat',
        url: 'https://github.com/Mkhize975/Alphachat',
        description: 'Java-based desktop chat application for user communication',
        languages: ['Java'],
        languagePercents: [100],
        stars: 0
    }
];

// Initial skills data
const initialSkills = {
    'Frontend': ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    'Backend': ['Java', 'Node.js', 'Python'],
    'Database': ['PostgreSQL', 'MongoDB'],
    'Tools': ['Git', 'GitHub', 'VS Code', 'Webpack', 'Docker'],
    'Other': ['Pygame']
};

// Portfolio data structure
let portfolioData = {
    hero: {
        name: 'Mkhize975',
        title: 'Full Stack Developer & Project Enthusiast',
        bio: 'Passionate developer creating innovative solutions with TypeScript, JavaScript, Java, and Python. Building projects that matter.',
        github: 'Mkhize975',
        bgColor: '#1a1a2e'
    },
    projects: repositories.map(r => ({...r, custom: false})),
    skills: JSON.parse(JSON.stringify(initialSkills))
};

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    renderProjects();
    renderSkills();
    updatePreview();
});

// =============================================================================
// NAVIGATION
// =============================================================================

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.editor-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            
            // Remove active class from all
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// =============================================================================
// HERO SECTION
// =============================================================================

function updateHero() {
    portfolioData.hero.name = document.getElementById('heroName').value || 'Your Name';
    portfolioData.hero.title = document.getElementById('heroTitle').value || 'Your Title';
    portfolioData.hero.bio = document.getElementById('heroBio').value || 'Your bio';
    portfolioData.hero.github = document.getElementById('githubUsername').value || 'username';
    portfolioData.hero.bgColor = document.getElementById('heroBgColor').value;
    
    updatePreview();
    showNotification('Hero section updated!', 'success');
}

// =============================================================================
// PROJECTS SECTION
// =============================================================================

function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';

    portfolioData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-info" style="flex: 1;">
                <h3>${project.name}</h3>
                <p>${project.description || 'No description'}</p>
                <div>
                    ${project.languages.map((lang, i) => `
                        <span class="project-language">${lang} <small>(${project.languagePercents[i]}%)</small></span>
                    `).join('')}
                </div>
            </div>
            <div class="project-actions">
                <a href="${project.url}" target="_blank" class="btn btn-secondary" style="font-size: 0.8em; padding: 6px 12px;">View</a>
                ${project.custom ? `<button class="btn btn-danger" onclick="removeProject(${index})">Remove</button>` : ''}
            </div>
        `;
        projectsList.appendChild(projectCard);
    });
}

function addCustomProject() {
    const name = prompt('Project Name:');
    if (!name) return;
    
    const url = prompt('Project URL:');
    if (!url) return;
    
    const description = prompt('Project Description:');
    
    const newProject = {
        name,
        url,
        description,
        languages: ['Custom'],
        languagePercents: [100],
        custom: true
    };
    
    portfolioData.projects.push(newProject);
    renderProjects();
    updatePreview();
    showNotification('Project added!', 'success');
}

function removeProject(index) {
    if (confirm('Remove this project?')) {
        portfolioData.projects.splice(index, 1);
        renderProjects();
        updatePreview();
        showNotification('Project removed!', 'success');
    }
}

// =============================================================================
// SKILLS SECTION
// =============================================================================

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';

    Object.entries(portfolioData.skills).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        let skillsHTML = '<div class="skill-tags">';
        skills.forEach(skill => {
            skillsHTML += `
                <div class="skill-tag">
                    ${skill}
                    <button onclick="removeSkill('${category}', '${skill}')">×</button>
                </div>
            `;
        });
        skillsHTML += '</div>';
        
        categoryDiv.innerHTML = `
            <h4>${category}</h4>
            ${skillsHTML}
        `;
        
        skillsList.appendChild(categoryDiv);
    });
}

function addSkill() {
    const skillName = document.getElementById('newSkillName').value;
    const category = document.getElementById('newSkillCategory').value;
    
    if (!skillName.trim()) {
        showNotification('Please enter a skill name', 'error');
        return;
    }
    
    if (!portfolioData.skills[category]) {
        portfolioData.skills[category] = [];
    }
    
    if (!portfolioData.skills[category].includes(skillName)) {
        portfolioData.skills[category].push(skillName);
        document.getElementById('newSkillName').value = '';
        renderSkills();
        updatePreview();
        showNotification('Skill added!', 'success');
    } else {
        showNotification('Skill already exists!', 'error');
    }
}

function removeSkill(category, skill) {
    const index = portfolioData.skills[category].indexOf(skill);
    if (index > -1) {
        portfolioData.skills[category].splice(index, 1);
        renderSkills();
        updatePreview();
    }
}

// =============================================================================
// PREVIEW GENERATION
// =============================================================================

function generatePortfolioHTML() {
    const { hero, projects, skills } = portfolioData;
    
    const projectsHTML = projects.map(project => `
        <div class="portfolio-project-card">
            <div class="project-header">
                <h3>${project.name}</h3>
                <div class="project-meta">
                    <span>${project.languages.join(', ')}</span>
                    <a href="${project.url}" target="_blank" style="color: #667eea;">View →</a>
                </div>
            </div>
            <div class="project-content">
                <p>${project.description}</p>
                <div class="project-languages">
                    ${project.languages.map((lang, i) => `
                        <span class="language-badge">${lang} ${project.languagePercents[i]}%</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    const skillsHTML = Object.entries(skills).map(([category, skillList]) => `
        <div class="skill-category-card">
            <h3>${category}</h3>
            <div class="skill-list">
                ${skillList.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${hero.name} - Portfolio</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; }
                a { text-decoration: none; color: inherit; }
                
                .portfolio-hero {
                    background: linear-gradient(135deg, ${hero.bgColor} 0%, #764ba2 100%);
                    color: white;
                    padding: 80px 40px;
                    text-align: center;
                    min-height: 400px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                
                .portfolio-hero h1 { font-size: 3em; margin-bottom: 10px; font-weight: 700; }
                .portfolio-hero .title { font-size: 1.5em; opacity: 0.95; margin-bottom: 30px; }
                .portfolio-hero p { font-size: 1.05em; opacity: 0.9; max-width: 600px; line-height: 1.6; margin-bottom: 30px; }
                
                .portfolio-section { padding: 60px 40px; max-width: 1200px; margin: 0 auto; }
                .portfolio-section h2 { font-size: 2.2em; color: #1a1a2e; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 3px solid #667eea; }
                
                .portfolio-projects { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }
                
                .portfolio-project-card {
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    border-top: 4px solid #667eea;
                    transition: all 0.3s ease;
                }
                
                .portfolio-project-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2); }
                
                .project-header { padding: 20px; background: #f9fafb; }
                .project-header h3 { color: #1a1a2e; margin-bottom: 8px; }
                .project-meta { display: flex; justify-content: space-between; font-size: 0.85em; color: #666; }
                
                .project-content { padding: 20px; }
                .project-content p { color: #555; margin-bottom: 15px; }
                
                .project-languages { display: flex; flex-wrap: wrap; gap: 8px; }
                .language-badge { background: #e8f0fe; color: #667eea; padding: 4px 12px; border-radius: 20px; font-size: 0.75em; font-weight: 600; }
                
                .portfolio-skills { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; }
                
                .skill-category-card h3 { color: #667eea; margin-bottom: 15px; font-size: 1.2em; text-transform: uppercase; letter-spacing: 0.5px; }
                
                .skill-list { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill-item { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 0.9em; font-weight: 500; }
                
                .portfolio-footer { background: #1a1a2e; color: white; padding: 40px; text-align: center; }
                .portfolio-footer p { margin-bottom: 10px; }
                
                .social-links { display: flex; gap: 15px; justify-content: center; margin-top: 20px; }
                .social-links a { color: white; font-size: 1.3em; transition: all 0.3s ease; }
                .social-links a:hover { transform: translateY(-3px); }
                
                @media (max-width: 768px) {
                    .portfolio-hero { padding: 40px 20px; }
                    .portfolio-hero h1 { font-size: 2em; }
                    .portfolio-section { padding: 40px 20px; }
                    .portfolio-projects { grid-template-columns: 1fr; }
                    .portfolio-skills { grid-template-columns: 1fr; }
                }
            </style>
        </head>
        <body>
            <section class="portfolio-hero">
                <h1>${hero.name}</h1>
                <div class="title">${hero.title}</div>
                <p>${hero.bio}</p>
                <div class="social-links">
                    <a href="https://github.com/${hero.github}" target="_blank">GitHub</a>
                    <a href="https://github.com/${hero.github}?tab=repositories" target="_blank">Projects</a>
                </div>
            </section>

            <section class="portfolio-section">
                <h2>Featured Projects</h2>
                <div class="portfolio-projects">
                    ${projectsHTML}
                </div>
            </section>

            <section class="portfolio-section">
                <h2>Skills & Technologies</h2>
                <div class="portfolio-skills">
                    ${skillsHTML}
                </div>
            </section>

            <footer class="portfolio-footer">
                <p>&copy; 2024 ${hero.name} - Portfolio created with Portfolio Builder</p>
                <p>All projects available on <a href="https://github.com/${hero.github}" target="_blank">GitHub</a></p>
            </footer>
        </body>
        </html>
    `;
}

// =============================================================================
// PREVIEW MANAGEMENT
// =============================================================================

function updatePreview() {
    const portfolioHTML = generatePortfolioHTML();
    
    // Update main preview iframe
    const previewFrame = document.getElementById('previewFrame');
    previewFrame.srcdoc = portfolioHTML;
    
    // Update mobile preview
    const mobilePreview = document.getElementById('mobilePreview');
    const mobileFrame = document.createElement('iframe');
    mobileFrame.srcdoc = portfolioHTML;
    mobileFrame.style.width = '100%';
    mobileFrame.style.height = '100%';
    mobileFrame.style.border = 'none';
    mobilePreview.innerHTML = '';
    mobilePreview.appendChild(mobileFrame);
}

// =============================================================================
// EXPORT FUNCTIONS
// =============================================================================

function downloadPortfolio() {
    const portfolioHTML = generatePortfolioHTML();
    const cssContent = getCSSContent();
    
    // Create a blob with the HTML
    const htmlBlob = new Blob([portfolioHTML], { type: 'text/html' });
    const htmlUrl = URL.createObjectURL(htmlBlob);
    
    // Download HTML file
    const link = document.createElement('a');
    link.href = htmlUrl;
    link.download = 'portfolio.html';
    link.click();
    
    showNotification('Portfolio downloaded!', 'success');
}

function copyHtmlCode() {
    const portfolioHTML = generatePortfolioHTML();
    navigator.clipboard.writeText(portfolioHTML).then(() => {
        showNotification('HTML code copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy code', 'error');
    });
}

function sharePreview() {
    const portfolioHTML = generatePortfolioHTML();
    const encodedHTML = encodeURIComponent(portfolioHTML);
    
    // Create a data URL
    const dataUrl = `data:text/html;charset=utf-8,${encodedHTML}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(dataUrl).then(() => {
        showNotification('Preview link copied to clipboard! Paste it in your browser address bar.', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

function getCSSContent() {
    // Simplified CSS - in production you'd fetch from the actual stylesheet
    return `/* Portfolio Styles */`;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `${type}-message`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export portfolio data for external use
function getPortfolioJSON() {
    return JSON.stringify(portfolioData, null, 2);
}

function importPortfolioJSON(jsonString) {
    try {
        portfolioData = JSON.parse(jsonString);
        renderProjects();
        renderSkills();
        updatePreview();
        showNotification('Portfolio imported successfully!', 'success');
    } catch (e) {
        showNotification('Invalid JSON format', 'error');
    }
}
