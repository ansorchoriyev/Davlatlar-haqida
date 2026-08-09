const gridContainer = document.getElementById('countriesGrid');
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const modal = document.getElementById('countryModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('themeToggle');
const timezoneSelect = document.getElementById('timezoneSelect');
const liveClock = document.getElementById('liveClock');
const langSelect = document.getElementById('langSelect');

const translations = {
    uz: { title: "Jahon Davlatlari", search: "Davlat nomini qidiring...", capital: "Poytaxt", area: "Maydoni", languages: "Tillar", currency: "Valyuta", phone: "Telefon kodi", domain: "Domen (TLD)", loading: "Ma'lumotlar yuklanmoqda...", landmarks: "mashhur joylari" },
    en: { title: "World Countries", search: "Search for a country...", capital: "Capital", area: "Area", languages: "Languages", currency: "Currency", phone: "Phone Code", domain: "Domain (TLD)", loading: "Loading data...", landmarks: "popular landmarks" },
    ru: { title: "Мировые Страны", search: "Поиск страны...", capital: "Столица", area: "Площадь", languages: "Языки", currency: "Валюта", phone: "Код телефона", domain: "Домен (TLD)", loading: "Загрузка данных...", landmarks: "популярные места" },
    tr: { title: "Dünya Ülkeleri", search: "Ülke ara...", capital: "Başkent", area: "Yüzölçümü", languages: "Diller", currency: "Para Birimi", phone: "Telefon Kodu", domain: "Alan Adı (TLD)", loading: "Veriler yükleniyor...", landmarks: "popüler yerler" },
    ar: { title: "دول العالم", search: "ابحث عن دولة...", capital: "العاصمة", area: "المساحة", languages: "اللغات", currency: "عملة", phone: "رمز الهاتف", domain: "النطاق", loading: "جاري تحميل البيانات...", landmarks: "المعالم الشهيرة" },
    fr: { title: "Pays du Monde", search: "Rechercher un pays...", capital: "Capitale", area: "Superficie", languages: "Langues", currency: "Devise", phone: "Indicatif", domain: "Domaine", loading: "Chargement...", landmarks: "lieux populaires" },
    de: { title: "Weltländer", search: "Land suchen...", capital: "Hauptstadt", area: "Fläche", languages: "Sprachen", currency: "Währung", phone: "Vorwahl", domain: "Domain", loading: "Laden...", landmarks: "beliebte Sehenswürdigkeiten" },
    es: { title: "Países del Mundo", search: "Buscar país...", capital: "Capital", area: "Área", languages: "Idiomas", currency: "Moneda", phone: "Código", domain: "Dominio", loading: "Cargando...", landmarks: "lugares populares" },
    zh: { title: "世界国家", search: "搜索国家...", capital: "首都", area: "面积", languages: "语言", currency: "货币", phone: "电话代码", domain: "域名", loading: "加载中...", landmarks: "热门景点" },
    ko: { title: "세계 국가", search: "국가 검색...", capital: "수도", area: "면적", languages: "언어", currency: "통화", phone: "전화 코드", domain: "도메인", loading: "로딩 중...", landmarks: "인기 명소" }
};

let currentLang = 'uz';

langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateTexts();
    renderCountries(allCountries);
});

function updateTexts() {
    const t = translations[currentLang];
    document.getElementById('siteTitle').innerHTML = `<i class="fas fa-globe-americas"></i> ${t.title}`;
    searchInput.placeholder = t.search;
    loading.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t.loading}`;
}

function updateClock() {
    const tz = timezoneSelect.value;
    const now = new Date().toLocaleTimeString('en-GB', { timeZone: tz });
    liveClock.textContent = now;
}
setInterval(updateClock, 1000);
timezoneSelect.addEventListener('change', updateClock);
updateClock();

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

let allCountries = [];

async function loadCountries() {
    try {
        const response = await fetch('countries.json');
        if (!response.ok) throw new Error('Faylni o\'qishda xatolik');
        const data = await response.json();
        
        allCountries = data.map(c => {
            const commonName = c.name && c.name.common ? c.name.common : 'Noma\'lum';
            const officialName = c.name && c.name.official ? c.name.official : commonName;
            const capital = c.capital ? (Array.isArray(c.capital) ? c.capital.join(', ') : c.capital) : 'Noma\'lum';
            const region = c.region || 'Noma\'lum';
            const subregion = c.subregion || '';
            const area = c.area ? c.area.toLocaleString() + ' km²' : 'Noma\'lum';

            let languages = c.languages ? (Array.isArray(c.languages) ? c.languages.join(', ') : Object.values(c.languages).join(', ')) : 'Noma\'lum';
            let currencies = c.currencies ? (Array.isArray(c.currencies) ? c.currencies.join(', ') : Object.values(c.currencies).map(cur => typeof cur === 'object' ? (cur.name || '') : cur).filter(Boolean).join(', ')) : 'Noma\'lum';
            
            let phoneCode = c.callingCodes && c.callingCodes.length > 0 ? '+' + c.callingCodes[0] : (c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || '') : 'N/A');
            let tld = c.topLevelDomain?.[0] || c.tld?.[0] || 'N/A';
            let flagUrl = c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : (c.flags?.svg || c.flags?.png || '');

            return {
                name: { common: commonName, official: officialName },
                capital, region, subregion, area, languages, currencies, idd: phoneCode, tld,
                flags: { svg: flagUrl },
                cca2: c.cca2 ? c.cca2.toLowerCase() : 'us'
            };
        });

        allCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        loading.style.display = 'none';
        gridContainer.classList.remove('hidden');
        renderCountries(allCountries);
    } catch (error) {
        console.error("Xatolik:", error);
        loading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Live Server ("Go Live") orqali ochganingizga ishonch hosil qiling!';
    }
}

function renderCountries(countries) {
    gridContainer.innerHTML = '';
    const t = translations[currentLang];
    
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="card-header">
                <img src="${country.flags.svg}" alt="${country.name.common}" loading="lazy">
                <div class="card-title-group">
                    <h2>${country.name.common}</h2>
                    <span class="official-name">Official: ${country.name.official}</span>
                </div>
            </div>
            
            <div class="tags">
                <span class="tag">${country.region}</span>
                ${country.subregion ? `<span class="tag tag-sub">${country.subregion}</span>` : ''}
            </div>

            <div class="info-rows">
                <div class="info-row"><span class="label">${t.capital}:</span><span class="value">${country.capital}</span></div>
                <div class="info-row"><span class="label">${t.area}:</span><span class="value">${country.area}</span></div>
                <div class="info-row"><span class="label">${t.languages}:</span><span class="value">${country.languages}</span></div>
                <div class="info-row"><span class="label">${t.currency}:</span><span class="value">${country.currencies}</span></div>
                <div class="info-row"><span class="label">${t.phone}:</span><span class="value">${country.idd}</span></div>
                <div class="info-row"><span class="label">${t.domain}:</span><span class="value">${country.tld}</span></div>
            </div>
        `;

        card.addEventListener('click', () => openModal(country));
        gridContainer.appendChild(card);
    });
}

function openModal(country) {
    const name = country.name.common;
    const capital = country.capital;
    const t = translations[currentLang];
    const code = country.cca2;
    
    // Har bir davlat uchun unikal va o'ziga xos rasmlar bazasi (Country code orqali ajratiladi)
    const img1 = `https://picsum.photos/seed/${code}1/600/400`;
    const img2 = `https://picsum.photos/seed/${code}2/600/400`;
    const img3 = `https://picsum.photos/seed/${code}3/600/400`;

    modalBody.innerHTML = `
        <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 15px;">
            <img src="${country.flags.svg}" alt="" style="width: 80px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color);">
            <div>
                <h2 style="font-size: 1.8rem; margin: 0;">${name}</h2>
                <span style="color: var(--text-muted); font-size: 0.9rem;">${country.name.official}</span>
            </div>
        </div>
        
        <p style="line-height: 1.6; margin-bottom: 20px; font-size: 1rem;">
            <b>${name}</b> — ${country.region} mintaqasida joylashgan bo'lib, uning poytaxti <b>${capital}</b> hisoblanadi. Rasmiy tillari: <b>${country.languages}</b>.
        </p>

        <h3 style="font-size: 1.2rem; margin-bottom: 15px; border-left: 4px solid var(--primary-color); padding-left: 10px;">${name} (${t.landmarks})</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
            <div style="background: var(--row-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);">
                <img src="${img1}" alt="${name}" style="width: 100%; height: 140px; object-fit: cover;">
                <p style="padding: 10px; font-size: 0.82rem; font-weight: 600; text-align: center; margin: 0;">Tarixiy obida</p>
            </div>
            <div style="background: var(--row-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);">
                <img src="${img2}" alt="${capital}" style="width: 100%; height: 140px; object-fit: cover;">
                <p style="padding: 10px; font-size: 0.82rem; font-weight: 600; text-align: center; margin: 0;">Poytaxt (${capital})</p>
            </div>
            <div style="background: var(--row-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);">
                <img src="${img3}" alt="${name}" style="width: 100%; height: 140px; object-fit: cover;">
                <p style="padding: 10px; font-size: 0.82rem; font-weight: 600; text-align: center; margin: 0;">Tabiiy manzara</p>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = allCountries.filter(c => 
        c.name.common.toLowerCase().includes(term) || 
        c.name.official.toLowerCase().includes(term)
    );
    renderCountries(filtered);
});

loadCountries();