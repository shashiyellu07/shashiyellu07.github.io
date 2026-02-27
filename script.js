// =========================
// TYPING EFFECT
// =========================

const texts = [
    "Junior Software Engineer",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type(){
    if(count === texts.length){
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    const typingElement = document.querySelector(".typing");
    if(typingElement){
        typingElement.textContent = letter;
    }

    if(letter.length === currentText.length){
        count++;
        index = 0;
        setTimeout(type,1000);
    } else {
        setTimeout(type,80);
    }
})();


// =========================
// NAVBAR FUNCTIONALITY
// =========================

const navLinks = document.querySelectorAll(".nav-link");
const navPill = document.querySelector(".nav-pill");
const sections = document.querySelectorAll("section");
const navbar = document.querySelector(".navbar");

// Move sliding pill
function movePill(element){
    if(!element || !navPill) return;

    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.parentElement.getBoundingClientRect();

    navPill.style.width = rect.width + "px";
    navPill.style.left = (rect.left - parentRect.left) + "px";
}

// Initial pill position
window.addEventListener("load", () => {
    const activeLink = document.querySelector(".nav-link.active");
    if(activeLink){
        movePill(activeLink);
    }
});


// =========================
// SCROLL DETECTION + NAVBAR CONTROL
// =========================

let lastScroll = 0;

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section=>{
        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){
            currentSection = section.getAttribute("id");
        }
    });

    // Active link highlight
    navLinks.forEach(link=>{
        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + currentSection){
            link.classList.add("active");
            movePill(link);
        }
    });

    // Hide navbar on scroll down
    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll){
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;

});


// Click navigation highlight
navLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        navLinks.forEach(l=>l.classList.remove("active"));

        link.classList.add("active");
        movePill(link);
    });
});
