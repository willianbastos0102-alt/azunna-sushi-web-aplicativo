// === Firebase SDK (importado via CDN) ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// === Inicialização do Firebase ===
// Lê as configs do arquivo firebase-config.js
const app = initializeApp(window.FIREBASE_CONFIG);
const db = getFirestore(app);

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

  const items = navLinks.querySelectorAll('a');
  items.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('open');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
    });
  });

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
    tabButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const targetTab = this.getAttribute('data-tab');
    tabContents.forEach(content => {
      if (content.classList.contains('active')) {
        content.classList.remove('active');
      }
    });

    setTimeout(() => {
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    }, 50);
  });
});

// --- Reservation Logic with Firestore ---
async function handleReservation(event) {
  event.preventDefault();

  const nameInput = document.getElementById('clientName');
  const daySelect = document.getElementById('reservationDay');
  const timeSelect = document.getElementById('reservationTime');
  const guestsSelect = document.getElementById('reservationGuests');
  const submitBtn = event.target.querySelector('button[type="submit"]');

  if (!nameInput.value || !daySelect.value || !timeSelect.value || !guestsSelect.value) {
    alert("Por favor, preencha todos os campos da reserva.");
    return;
  }

  const name = nameInput.value;
  const day = daySelect.value;
  const time = timeSelect.value;
  const guests = guestsSelect.value;

  // Loading state
  submitBtn.textContent = '⏳ Salvando reserva...';
  submitBtn.disabled = true;

  try {
    // Salva no Firestore
    await addDoc(collection(db, "reservas"), {
      nome: name,
      dia: day,
      horario: time,
      pessoas: guests,
      criadoEm: serverTimestamp()
    });

    // Exibe modal de sucesso
    const successMessage = `Olá, <strong>${name}</strong>! Sua pré-reserva para <strong>${guests}</strong> na <strong>${day} às ${time}</strong> foi registrada com sucesso.<br><br>Um e-mail de confirmação foi enviado. Esperamos você no Azunna Sushi!`;
    const msgEl = document.getElementById('successMessage');
    const modal = document.getElementById('successModal');

    if (msgEl && modal) {
      msgEl.innerHTML = successMessage;
      modal.classList.add('open');
    }

    // Reset form
    document.getElementById('bookingForm').reset();

  } catch (error) {
    console.error("Erro ao salvar reserva:", error);
    alert("Ocorreu um erro ao registrar sua reserva. Por favor, tente novamente.");
  } finally {
    submitBtn.textContent = 'Confirmar Pré-Reserva';
    submitBtn.disabled = false;
  }
}

// Expõe a função para o HTML
window.handleReservation = handleReservation;

function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

window.closeModal = closeModal;

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
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
