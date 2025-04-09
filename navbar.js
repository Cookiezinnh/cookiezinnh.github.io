const nav = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) {
        nav.classList.add('navbar-scrolled')
    } else if (window.scrollY < 80) {
        nav.classList.remove('navbar-scrolled')
    }
});