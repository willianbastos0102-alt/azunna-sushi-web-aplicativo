// --- Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
  const header = document.getElementById('navbar').parentElement;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Mobile Navigation Toggle ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars-staggered';
    }
  });

  // Close nav menu on clicking any link
  const items = navLinks.querySelectorAll('a');
  items.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('open');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

  // Close nav menu on clicking outside
  document.addEventListener('click', function(event) {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove('open');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    }
  });
}

// --- Menu Tab Switcher ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active state from all buttons
    tabButtons.forEach(b => b.classList.remove('active'));
    // Add active state to clicked button
    this.classList.add('active');

    const targetTab = this.getAttribute('data-tab');

    // Fade out active content, then switch and fade in
    tabContents.forEach(content => {
      if (content.classList.contains('active')) {
        content.classList.remove('active');
      }
    });

    // Timeout to match animation or keep smooth transition
    setTimeout(() => {
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    }, 50);
  });
});

// --- Reservation Logic ---
function handleReservation(event) {
  event.preventDefault();

  const nameInput = document.getElementById('clientName');
  const daySelect = document.getElementById('reservationDay');
  const timeSelect = document.getElementById('reservationTime');
  const guestsSelect = document.getElementById('reservationGuests');

  if (!nameInput.value || !daySelect.value || !timeSelect.value || !guestsSelect.value) {
    alert("Por favor, preencha todos os campos da reserva.");
    return;
  }

  // Create customized success message
  const name = nameInput.value;
  const day = daySelect.value;
  const time = timeSelect.value;
  const guests = guestsSelect.value;

  const successMessage = `Olá, <strong>${name}</strong>! Sua pré-reserva para <strong>${guests}</strong> na <strong>${day} às ${time}</strong> foi registrada com sucesso.<br><br>Um e-mail de confirmação foi enviado. Esperamos você no Azunna Sushi!`;

  // Display Success Modal
  const msgEl = document.getElementById('successMessage');
  const modal = document.getElementById('successModal');
  
  if (msgEl && modal) {
    msgEl.innerHTML = successMessage;
    modal.classList.add('open');
  }

  // Reset form
  document.getElementById('bookingForm').reset();
}

function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

// --- Intersection Observer for Scroll Fade-in ---
document.addEventListener("DOMContentLoaded", function() {
  const fadeElements = document.querySelectorAll('.menu-card-group, .feature-item, .about-text-content, .about-visual, .reservation-box');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    // Initial states for animation
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
