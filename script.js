// --- MENU E HEADER ---
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- ANIMAÇÃO DE SCROLL (OBSERVER) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateOnScroll = document.querySelectorAll('.product-card');
animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// --- BOTÕES DE COMPRA (WHATSAPP) ---
const productButtons = document.querySelectorAll('.btn-product');
productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Mensagem dinâmica pegando o nome e valor
        const whatsappMessage = `Olá, gostaria de comprar o ${productPrice}, qual valor?`;
        const whatsappUrl = `https://wa.me/5511983816705?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
    });
});

const headerButton = document.querySelector('.header .btn-primary');
if (headerButton) {
    headerButton.addEventListener('click', () => {
        const productsSection = document.getElementById('produtos');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// --- CARROSSEL DE PRODUTOS (PAGINAÇÃO) ---
const track = document.querySelector(".carousel-track");
const pages = document.querySelectorAll(".page");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;

// Cria as bolinhas do carrossel automaticamente
pages.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
    
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

next.onclick = () => {
    index++;
    if (index >= pages.length) {
        index = 0; 
    }
    updateCarousel();
};

prev.onclick = () => {
    index--;
    if (index < 0) {
        index = pages.length - 1; 
    }
    updateCarousel();
};