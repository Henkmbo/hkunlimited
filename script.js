document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu i');
    const menu = document.querySelector('.menu');
    const menuLogo = document.querySelector('.menu-logo');  
    const menuIcon = document.querySelector('.menu-small-icon');
  
    const checkScreenSize = () => {
        if (window.innerWidth >= 992) {
            menu.classList.remove('active');
            hamburger.classList.remove('fa-times');
            hamburger.classList.add('fa-bars');
            menuLogo.style.display = 'none';
            menuIcon.style.display = 'none';
        }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    hamburger.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            menu.classList.toggle('active'); 
            
            if (hamburger.classList.contains('fa-bars')) {
                hamburger.classList.remove('fa-bars');
                hamburger.classList.add('fa-times');
            } else {
                hamburger.classList.remove('fa-times');
                hamburger.classList.add('fa-bars');
            }

            if (menu.classList.contains('active')) {
                menuLogo.style.display = 'block'; 
                menuIcon.style.display = 'block';
            } else {
                menuLogo.style.display = 'none'; 
                menuIcon.style.display = 'none';
            }
        }
    });
});

