// =========================
// TYPING EFFECT
// =========================

const texts = [
    "Junior Software Engineer"
];

let count = 0;
let index = 0;

(function type(){

    const typingElement = document.querySelector(".typing");

    if(!typingElement) return;

    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);

    typingElement.textContent = letter;

    if(letter.length === currentText.length){
        count = (count + 1) % texts.length;
        index = 0;
        setTimeout(type, 1000);
    } else {
        setTimeout(type, 80);
    }

})();


// =========================
// NAVBAR ELEMENTS
// =========================

const navLinks = document.querySelectorAll(".nav-link");
const navPill = document.querySelector(".nav-pill");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");


// =========================
// ACTIVE LINK CONTROL
// =========================

function setActiveLink(link){

    navLinks.forEach(l=>{
        l.classList.remove("active");
    });

    link.classList.add("active");

    if(window.innerWidth > 768){
        movePill(link);
    }
}


// =========================
// MOVE SLIDING PILL (DESKTOP ONLY)
// =========================

function movePill(element){

    if(!element || !navPill || window.innerWidth <= 768) return;

    const rect = element.getBoundingClientRect();
    const parentRect = element.closest(".nav-links").getBoundingClientRect();

    navPill.style.width = rect.width + "px";
    navPill.style.left = (rect.left - parentRect.left) + "px";
}


// =========================
// MOBILE MENU TOGGLE
// =========================

if(hamburger){
    hamburger.addEventListener("click",()=>{
        navMenu.classList.toggle("active");
    });
}


// Close menu + activate link on click
navLinks.forEach(link=>{

    link.addEventListener("click", e=>{
        setActiveLink(link);

        if(window.innerWidth <= 768){
            navMenu.classList.remove("active");
        }
    });

});


// =========================
// SCROLL SPY NAVBAR
// =========================

let lastScroll = 0;

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section=>{
        const sectionTop = section.offsetTop - 160;

        if(window.scrollY >= sectionTop){
            currentSection = section.id;
        }
    });

    navLinks.forEach(link=>{

        if(link.getAttribute("href") === "#" + currentSection){
            setActiveLink(link);
        }

    });

    // Navbar hide on scroll down
    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll){
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;

});