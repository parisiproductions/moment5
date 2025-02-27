"use strict"
// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");
//eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
//Toggla fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");
    //hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);
    //koll om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}



//Knapp som lyssnar på klick och ändrar utseende

document.querySelector(".cool-button").addEventListener("click", function () {
    let button = this;
    
    // Lägg till klassen
    button.classList.add("clicked");

    // Ta bort klassen efter animationen är klar så att den kan köras igen
    setTimeout(() => {
        button.classList.remove("clicked");
    }, 3000); 
});
