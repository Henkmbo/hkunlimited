document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu i');
    const menu = document.querySelector('.menu');
    const menuLogo = document.querySelector('.menu-logo'); // Selecteer het bestaande logo

    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active'); 
        
        if (hamburger.classList.contains('fa-bars')) {
            hamburger.classList.remove('fa-bars');
            hamburger.classList.add('fa-times');
        } else {
            hamburger.classList.remove('fa-times');
            hamburger.classList.add('fa-bars');
        }

        // Toon of verberg het logo
        if (menu.classList.contains('active')) {
            menuLogo.style.display = 'block'; // Maak het logo zichtbaar
        } else {
            menuLogo.style.display = 'none'; // Verberg het logo
        }
    });
});