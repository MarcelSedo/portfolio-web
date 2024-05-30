//////////////// SIDEBAR ///////////////////////
const navMenu = document.getElementById("sidebarId");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close"); 

if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-sidebar")
    })
}

if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-sidebar")
    })
}

//////////////////mix it up filter///////////////////

var mixerPortfolio = mixitup(".work-container", {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});

const linkWork = document.querySelectorAll(".work-item")

function activeWork() {
    linkWork.forEach(l=> l.classList.remove("active-work"))
    this.classList.add("active-work")
}

linkWork.forEach(l=> l.addEventListener("click", activeWork))

//////////// POPUP /////////////////////
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("work-button")){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
}

document.querySelector(".portfolio-popup-close").addEventListener("click", togglePortfolioPopup)

function portfolioItemDetails(portfolioItem) {
document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".work-img").src;
document.querySelector(".portfolio-popup-subtitle span").innerHTML = portfolioItem.querySelector(".work-title").innerHTML;
document.querySelector(".portfolio-popup-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

//////////////////////Kontaktný formulár///////////////////
const contactForm = document.getElementById("contact-form"),
contactName = document.getElementById("contact-name"),
contactEmail = document.getElementById("contact-email"),
contactSubject = document.getElementById("contact-subject"),
contactMessage = document.getElementById("contact-message"),
errorMessage = document.getElementById("error-message");

const sendEmail = (e) => {
    e.preventDefault();    
    //kontrola, či má pole hodnotu
    if(
        contactName.value === "" || 
        contactEmail.value === "" || 
        contactSubject.value === "" || 
        contactMessage.value === ""
    ) {
        // vyvolá hlásenie o chybe
        errorMessage.textContent = "Vyplňte prosím všetky kolonky";
    } else {
        //template-emailjs - form -publickey
        emailjs.sendForm("service_yhpr4xa", "template_gumx8cq", "#contact-form", "eC1rfN869kzzo8Tyx").then(() => {
            //ukáž správu a pridaj farbu, okno a emoji
            errorMessage.classList.add("color-first");
            errorMessage.textContent = "Message sent ✔️";
            //odstrániť po 5 sekundách
            setTimeout(() => {
                errorMessage.textContent = "";
            }, 5000);
        }, 
        (error) => {
            alert("DO KELU! NIEČO SA POKAZILO...", error);
        }
    );

    //vyčistiť inputy
    contactName.value = "";
    contactEmail.value = "";
    contactSubject.value = "";
    contactMessage.value = "";
    }
};

contactForm.addEventListener("submit", sendEmail);

///////////////////scroll///////////////////////////

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter(){
    //súčasná scroll pozícia
    let scrollY = window.pageYOffset;
    //cez sekcie nastavujeme výšku top a IDhodnotu pre všetky prvky
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        //keď súčasná pozícia vstúpi do medzery medzi sekciami, pridá sa .activelink - korešponujúcu s navigáciou, inak ju odstráni
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                document.querySelector(".nav-menu a[href*='" + sectionId + "']").classList.add("active-link")
            }
            else {
                document.querySelector(".nav-menu a[href*='" + sectionId + "']").classList.remove("active-link");
            }
    }) 
}