const btnSwitch = document.querySelector ('#switchOscuroBtn');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    btnSwitch.classList.toggle('active');
});