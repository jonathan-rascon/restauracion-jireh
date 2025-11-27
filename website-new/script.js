// ===========================================
// Iglesia Restauración Jireh - Main Script
// ===========================================

// Page Navigation (for single-page app)
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        
        // Toggle backdrop
        if (backdrop) {
            backdrop.classList.toggle('active');
        }
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && menuBtn && !menuBtn.contains(event.target)) {
            toggleMobileMenu();
        }
    }
});

// Events Data
const eventsData = [
    {
        day: '15',
        month: 'Nov',
        title: 'Noche de Alabanza',
        time: '7:00 PM - 9:00 PM',
        description: 'Una noche especial de adoración y oración. Ven a experimentar la presencia de Dios con nosotros. Habrá música en vivo, testimonios y tiempo de oración.',
        category: 'especiales'
    },
    {
        day: '20',
        month: 'Nov',
        title: 'Picnic Familiar',
        time: '12:00 PM - 4:00 PM',
        description: 'Día de convivencia familiar al aire libre con juegos, comida y compañerismo. Trae tu familia para un día lleno de diversión y comunidad.',
        category: 'familias'
    },
    {
        day: '27',
        month: 'Nov',
        title: 'Conferencia de Jóvenes',
        time: '6:00 PM - 9:00 PM',
        description: 'Conferencia especial para jóvenes con invitado especial. Música, enseñanza poderosa y tiempo de comunidad. ¡No te lo pierdas!',
        category: 'jovenes'
    },
    {
        day: '01',
        month: 'Dic',
        title: 'Noche de Cosecha para Niños',
        time: '5:00 PM - 8:00 PM',
        description: 'Evento con juegos, dulces, inflables y diversión para toda la familia en un ambiente seguro y cristiano.',
        category: 'ninos'
    },
    {
        day: '08',
        month: 'Dic',
        title: 'Domingo de Bautismos',
        time: 'Durante todos los servicios',
        description: 'Celebración de bautismos. Si estás interesado en bautizarte, contáctanos para más información sobre las clases de preparación.',
        category: 'especiales'
    },
    {
        day: '15',
        month: 'Dic',
        title: 'Taller de Matrimonios',
        time: '9:00 AM - 1:00 PM',
        description: 'Taller intensivo para fortalecer tu matrimonio. Incluye desayuno, enseñanza y actividades en pareja. Registro requerido.',
        category: 'familias'
    },
    {
        day: '20',
        month: 'Dic',
        title: 'Viernes de Jóvenes',
        time: '7:30 PM - 9:30 PM',
        description: 'Reunión semanal de jóvenes con música, juegos, enseñanza bíblica y pizza. Un lugar donde los jóvenes pueden ser ellos mismos.',
        category: 'jovenes'
    },
    {
        day: '24',
        month: 'Dic',
        title: 'Servicio de Navidad',
        time: '6:00 PM',
        description: 'Servicio especial de Navidad. Únete a nosotros para celebrar el nacimiento de Jesús con música, adoración y reflexión.',
        category: 'especiales'
    }
];

// Load Events on Page Load
function loadEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    eventsData.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.dataset.category = event.category;
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-date">
                    <span class="day">${event.day}</span>
                    <span class="month">${event.month}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <div class="event-time">${event.time}</div>
                </div>
            </div>
            <div class="event-content">
                <p>${event.description}</p>
                <span class="event-category">${getCategoryLabel(event.category)}</span>
            </div>
        `;
        
        container.appendChild(eventCard);
    });
}

// Get Category Label
function getCategoryLabel(category) {
    const labels = {
        'especiales': 'Evento Especial',
        'familias': 'Familias',
        'jovenes': 'Jóvenes',
        'ninos': 'Niños'
    };
    return labels[category] || category;
}

// Filter Events - FIXED: properly pass event parameter
function filterEvents(category, e) {
    const events = document.querySelectorAll('.event-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Use the event target if provided, otherwise find the button
    if (e && e.target) {
        e.target.classList.add('active');
    } else {
        // Fallback: find button by category
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(category) || 
                (category === 'todos' && btn.textContent.toLowerCase().includes('todos'))) {
                btn.classList.add('active');
            }
        });
    }
    
    // Filter events with animation
    events.forEach(eventCard => {
        if (category === 'todos' || eventCard.dataset.category === category) {
            eventCard.style.display = 'block';
            eventCard.style.animation = 'fadeInUp 0.5s ease-out forwards';
        } else {
            eventCard.style.display = 'none';
        }
    });
}

// Contact Form Handling
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Reset form
        form.reset();
    });
}

// Navigation scroll effect
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, .ministry-card, .event-card, .info-card, .leader-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    handleContactForm();
    initNavScroll();
    initScrollAnimations();
    
    console.log('Iglesia Restauración Jireh - Website Loaded');
});

// Export functions for use in HTML
window.showPage = showPage;
window.filterEvents = filterEvents;
window.toggleMobileMenu = toggleMobileMenu;
window.smoothScrollTo = smoothScrollTo;
