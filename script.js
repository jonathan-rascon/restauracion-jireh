// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Events Data
const eventsData = [
    {
        day: '15',
        month: 'Oct',
        title: 'Noche de Alabanza',
        time: '7:00 PM - 9:00 PM',
        description: 'Una noche especial de adoración y oración. Ven a experimentar la presencia de Dios con nosotros. Habrá música en vivo, testimonios y tiempo de oración.',
        category: 'especiales'
    },
    {
        day: '20',
        month: 'Oct',
        title: 'Picnic Familiar',
        time: '12:00 PM - 4:00 PM',
        description: 'Día de convivencia familiar al aire libre con juegos, comida y compañerismo. Trae tu familia para un día lleno de diversión y comunidad.',
        category: 'familias'
    },
    {
        day: '27',
        month: 'Oct',
        title: 'Conferencia de Jóvenes',
        time: '6:00 PM - 9:00 PM',
        description: 'Conferencia especial para jóvenes con invitado especial. Música, enseñanza poderosa y tiempo de comunidad. ¡No te lo pierdas!',
        category: 'jovenes'
    },
    {
        day: '31',
        month: 'Oct',
        title: 'Noche de Cosecha para Niños',
        time: '5:00 PM - 8:00 PM',
        description: 'Evento alternativo de Halloween con juegos, dulces, inflables y diversión para toda la familia en un ambiente seguro y cristiano.',
        category: 'ninos'
    },
    {
        day: '03',
        month: 'Nov',
        title: 'Domingo de Bautismos',
        time: 'Durante todos los servicios',
        description: 'Celebración de bautismos. Si estás interesado en bautizarte, contáctanos para más información sobre las clases de preparación.',
        category: 'especiales'
    },
    {
        day: '10',
        month: 'Nov',
        title: 'Taller de Matrimonios',
        time: '9:00 AM - 1:00 PM',
        description: 'Taller intensivo para fortalecer tu matrimonio. Incluye desayuno, enseñanza y actividades en pareja. Registro requerido.',
        category: 'familias'
    },
    {
        day: '17',
        month: 'Nov',
        title: 'Viernes de Jóvenes',
        time: '7:30 PM - 9:30 PM',
        description: 'Reunión semanal de jóvenes con música, juegos, enseñanza bíblica y pizza. Un lugar donde los jóvenes pueden ser ellos mismos.',
        category: 'jovenes'
    },
    {
        day: '24',
        month: 'Nov',
        title: 'Servicio de Acción de Gracias',
        time: '10:00 AM',
        description: 'Servicio especial de Acción de Gracias. Únete a nosotros para dar gracias a Dios por sus bendiciones. Solo un servicio este domingo.',
        category: 'especiales'
    }
];

// Load Events on Page Load
function loadEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.dataset.category = event.category;
        
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-date">
                    <span class="day">${event.day}</span>
                    <span class="month">${event.month}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <div class="event-time">⏰ ${event.time}</div>
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

// Filter Events
function filterEvents(category) {
    const events = document.querySelectorAll('.event-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter events
    events.forEach(eventCard => {
        if (category === 'todos') {
            eventCard.style.display = 'block';
        } else {
            if (eventCard.dataset.category === category) {
                eventCard.style.display = 'block';
            } else {
                eventCard.style.display = 'none';
            }
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
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        
        // Reset form
        form.reset();
    });
}

// Smooth Scroll to Section
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add Click Event to CTA Buttons
function initializeButtons() {
    // This function can be expanded to handle more interactive buttons
    console.log('Website initialized successfully');
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    handleContactForm();
    initializeButtons();
    
    console.log('Iglesia Ebenezer Honduras - Website Loaded');
});

// Optional: Add scroll animations
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Export functions for use in HTML
window.showPage = showPage;
window.filterEvents = filterEvents;
// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            toggleMobileMenu();
        }
    }
});