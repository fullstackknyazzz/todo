const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

themeSwitcher.addEventListener('change', () => {
    body.classList.toggle('dark', themeSwitcher.checked);
    body.classList.toggle('light', !themeSwitcher.checked);
});