let currentLang = 'en';

function setLanguage(lang) {
  fetch('lang.json')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[lang][key]) {
          el.textContent = data[lang][key];
        }
      });
      currentLang = lang;
      document.getElementById('lang-toggle').textContent = data[lang]['langButton'];
      document.getElementById('lang-toggle-mobile').textContent = data[lang]['langButton'];
    });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ko' : 'en');
});

document.getElementById('lang-toggle-mobile').addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ko' : 'en');
});

// Initialize
setLanguage('en');
