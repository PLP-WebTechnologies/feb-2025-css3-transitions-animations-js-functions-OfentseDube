// Theme management
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.textContent = 'Toggle Dark Mode';
document.body.appendChild(themeToggle);

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Loading animation
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
    loading.style.display = 'block';
    return loading;
}

function hideLoading(loading) {
    loading.style.display = 'none';
    loading.remove();
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        const loading = showLoading();
        
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            hideLoading(loading);
        }, 500);
    });
});

// Image lazy loading with animation
const images = document.querySelectorAll('.location-image');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

images.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    imageObserver.observe(img);
});

// Save user's last visited section
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.news-section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });
    
    localStorage.setItem('lastVisitedSection', currentSection);
});

// Restore last visited section on page load
window.addEventListener('load', () => {
    const lastSection = localStorage.getItem('lastVisitedSection');
    if (lastSection) {
        const targetSection = document.getElementById(lastSection);
        if (targetSection) {
            targetSection.scrollIntoView();
        }
    }
});

// Organization card click tracking
const organizationCards = document.querySelectorAll('.organization-card');
organizationCards.forEach(card => {
    card.addEventListener('click', () => {
        const orgName = card.querySelector('h3').textContent;
        const clickCount = localStorage.getItem(`clicks_${orgName}`) || 0;
        localStorage.setItem(`clicks_${orgName}`, parseInt(clickCount) + 1);
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    });
}); 