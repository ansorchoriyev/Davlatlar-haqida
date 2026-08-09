const gridContainer = document.getElementById('countriesGrid');
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const liveClock = document.getElementById('liveClock');
const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const favoritesFilterBtn = document.getElementById('favoritesFilterBtn');
const noFavoritesMsg = document.getElementById('noFavoritesMsg');

// Modallar
const countryModal = document.getElementById('countryModal');
const settingsModal = document.getElementById('settingsModal');
const settingsBtn = document.getElementById('settingsBtn');
const modalBody = document.getElementById('modalBody');

// Barcha Sozlama (Select) elementlari
const selects = {
    lang: document.getElementById('langSelect'),
    timezone: document.getElementById('timezoneSelect'),
    timeFormat: document.getElementById('timeFormatSelect'),
    sort: document.getElementById('sortSelect'),
    gridLayout: document.getElementById('gridLayoutSelect'),
    primaryColor: document.getElementById('primaryColorSelect'),
    fontFamily: document.getElementById('fontFamilySelect'),
    fontSize: document.getElementById('fontSizeSelect'),
    cardRadius: document.getElementById('cardRadiusSelect'),
    flagShape: document.getElementById('flagShapeSelect'),
    headerStyle: document.getElementById('headerStyleSelect'),
    animations: document.getElementById('animationsSelect')
};

// 30 ta davlat tilidagi tarjimalar bazasi
const translations = {
    uz: { title: "Jahon Davlatlari", search: "Qidiring...", capital: "Poytaxt", area: "Maydoni", population: "Aholisi", languages: "Tillar", currency: "Valyuta", phone: "Telefon", domain: "Domen", landmarks: "joylari" },
    en: { title: "World Countries", search: "Search...", capital: "Capital", area: "Area", population: "Population", languages: "Languages", currency: "Currency", phone: "Phone", domain: "Domain", landmarks: "landmarks" },
    ru: { title: "Мировые Страны", search: "Поиск...", capital: "Столица", area: "Площадь", population: "Население", languages: "Языки", currency: "Валюта", phone: "Телефон", domain: "Домен", landmarks: "места" },
    tr: { title: "Dünya Ülkeleri", search: "Ara...", capital: "Başkent", area: "Yüzölçümü", population: "Nüfus", languages: "Diller", currency: "Para Birimi", phone: "Telefon", domain: "Alan Adı", landmarks: "yerleri" },
    ar: { title: "دول العالم", search: "ابحث...", capital: "العاصمة", area: "المساحة", population: "السكان", languages: "اللغات", currency: "العملة", phone: "الهاتف", domain: "النطاق", landmarks: "المعالم" },
    fr: { title: "Pays du Monde", search: "Rechercher...", capital: "Capitale", area: "Superficie", population: "Population", languages: "Langues", currency: "Devise", phone: "Téléphone", domain: "Domaine", landmarks: "lieux" },
    de: { title: "Weltländer", search: "Suchen...", capital: "Hauptstadt", area: "Fläche", population: "Bevölkerung", languages: "Sprachen", currency: "Währung", phone: "Telefon", domain: "Domain", landmarks: "Sehenswürdigkeiten" },
    es: { title: "Países del Mundo", search: "Buscar...", capital: "Capital", area: "Área", population: "Población", languages: "Idiomas", currency: "Moneda", phone: "Teléfono", domain: "Dominio", landmarks: "lugares" },
    zh: { title: "世界国家", search: "搜索...", capital: "首都", area: "面积", population: "人口", languages: "语言", currency: "货币", phone: "电话", domain: "域名", landmarks: "景点" },
    ko: { title: "세계 국가", search: "검색...", capital: "수도", area: "면적", population: "인구", languages: "언어", currency: "통화", phone: "전화", domain: "도메인", landmarks: "명소" },
    ja: { title: "世界の国々", search: "検索...", capital: "首都", area: "面積", population: "人口", languages: "言語", currency: "通貨", phone: "電話", domain: "ドメイン", landmarks: "名所" },
    hi: { title: "विश्व के देश", search: "खोजें...", capital: "राजधानी", area: "क्षेत्रफल", population: "जनसंख्या", languages: "भाषाएँ", currency: "मुद्रा", phone: "फ़ोन", domain: "डोमेन", landmarks: "स्थान" },
    fa: { title: "کشورهای جهان", search: "جستجو...", capital: "پایتخت", area: "مساحت", population: "جمعیت", languages: "زبان‌ها", currency: "واحد پول", phone: "تلفن", domain: "دامنه", landmarks: "جاذبه‌ها" },
    kk: { title: "Әлем елдері", search: "Іздеу...", capital: "Астана", area: "Аумағы", population: "Халқы", languages: "Тілдер", currency: "Валюта", phone: "Телефон", domain: "Домен", landmarks: "орындары" },
    ky: { title: "Дүйнө өлкөлөрү", search: "Издөө...", capital: "Борбор", area: "Аянты", population: "Калкы", languages: "Тилдер", currency: "Валюта", phone: "Телефон", domain: "Домен", landmarks: "жерлери" },
    az: { title: "Dünya Ölkələri", search: "Axtar...", capital: "Paytaxt", area: "Ərazi", population: "Əhali", languages: "Dillər", currency: "Valyuta", phone: "Telefon", domain: "Domen", landmarks: "yerlər" },
    tk: { title: "Dünýä ýurtlary", search: "Gözleg...", capital: "Paýtagt", area: "Meýdany", population: "Ilaty", languages: "Diller", currency: "Pul birligi", phone: "Telefon", domain: " Domen", landmarks: "ýerler" },
    tg: { title: "Кишварҳои ҷаҳон", search: "Ҷустуҷӯ...", capital: "Пайтахт", area: "Масоҳат", population: "Аҳолӣ", languages: "Забонҳо", currency: "Асъор", phone: "Телефон", domain: "Домен", landmarks: "ҷойҳо" },
    uk: { title: "Світові країни", search: "Пошук...", capital: "Столиця", area: "Площа", population: "Населення", languages: "Мови", currency: "Валюта", phone: "Телефон", domain: "Домен", landmarks: "місця" },
    it: { title: "Paesi del Mondo", search: "Cerca...", capital: "Capitale", area: "Superficie", population: "Popolazione", languages: "Lingue", currency: "Valuta", phone: "Telefono", domain: "Dominio", landmarks: "luoghi" },
    pt: { title: "Países do Mundo", search: "Pesquisar...", capital: "Capital", area: "Área", population: "População", languages: "Idiomas", currency: "Moeda", phone: "Telefone", domain: "Dominío", landmarks: "lugares" },
    pl: { title: "Kraje Świata", search: "Szukaj...", capital: "Stolica", area: "Powierzchnia", population: "Populacja", languages: "Języki", currency: "Waluta", phone: "Telefon", domain: "Domena", landmarks: "miejsca" },
    nl: { title: "Wereldlanden", search: "Zoeken...", capital: "Hoofdstad", area: "Oppervlakte", population: "Bevolking", languages: "Talen", currency: "Valuta", phone: "Telefoon", domain: "Domein", landmarks: "plaatsen" },
    vi: { title: "Các quốc gia trên thế giới", search: "Tìm kiếm...", capital: "Thủ đô", area: "Diện tích", population: "Dân số", languages: "Ngôn ngữ", currency: "Tiền tệ", phone: "Điện thoại", domain: "Tên miền", landmarks: "địa điểm" },
    id: { title: "Negara di Dunia", search: "Cari...", capital: "Ibukota", area: "Wilayah", population: "Populasi", languages: "Bahasa", currency: "Mata Uang", phone: "Telepon", domain: "Domain", landmarks: "tempat" },
    ms: { title: "Negara Dunia", search: "Cari...", capital: "Ibu negara", area: "Kawasan", population: "Populasi", languages: "Bahasa", currency: "Mata Wang", phone: "Telefon", domain: "Domain", landmarks: "tempat" },
    th: { title: "ประเทศทั่วโลก", search: "ค้นหา...", capital: "เมืองหลวง", area: "พื้นที่", population: "ประชากร", languages: "ภาษา", currency: "สกุลเงิน", phone: "โทรศัพท์", domain: "โดเมน", landmarks: "สถานที่" },
    el: { title: "Χώρες του Κόσμου", search: "Αναζήτηση...", capital: "Πρωτεύουσα", area: "Περιοχή", population: "Πληθυσμός", languages: "Γλώσσες", currency: "Νόμισμα", phone: "Τηλέφωνο", domain: "Τομέας", landmarks: "μέρη" },
    sv: { title: "Världens Länder", search: "Sök...", capital: "Huvudstad", area: "Area", population: "Befolkning", languages: "Språk", currency: "Valuta", phone: "Telefon", domain: "Domän", landmarks: "platser" },
    fi: { title: "Maailman Maat", search: "Hae...", capital: "Pääkaupunki", area: "Pinta-ala", population: "Väestö", languages: "Kielet", currency: "Valuuta", phone: "Puhelin", domain: "Verkkotunnus", landmarks: "kohteet" }
};

let allCountries = [];
let currentSearchTerm = "";
let currentRegion = "all";
let showOnlyFavorites = false;
let mapInstance = null;
let favoriteCountries = JSON.parse(localStorage.getItem('favoriteCountries')) || [];

// SOZLAMALARNI BOSHQARISH VA SAQLASH TIZIMI
const appSettings = {
    lang: 'uz', timezone: 'Asia/Tashkent', timeFormat: '24', sort: 'az',
    gridLayout: '300px', primaryColor: '#2563eb', fontFamily: "'Nunito', sans-serif",
    fontSize: '16px', cardRadius: '18px', flagShape: '8px', headerStyle: 'sticky',
    animations: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
};

Object.keys(appSettings).forEach(key => {
    const saved = localStorage.getItem(key);
    if(saved) appSettings[key] = saved;
    if(selects[key]) selects[key].value = appSettings[key];
});

function applySettingsUI() {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', appSettings.primaryColor);
    root.style.setProperty('--font-family', appSettings.fontFamily);
    root.style.fontSize = appSettings.fontSize;
    root.style.setProperty('--card-radius', appSettings.cardRadius);
    root.style.setProperty('--flag-radius', appSettings.flagShape);
    root.style.setProperty('--header-pos', appSettings.headerStyle);
    root.style.setProperty('--transition', appSettings.animations);
    root.style.setProperty('--grid-min', appSettings.gridLayout);
}

Object.keys(selects).forEach(key => {
    if (selects[key]) {
        selects[key].addEventListener('change', (e) => {
            appSettings[key] = e.target.value;
            localStorage.setItem(key, e.target.value);
            applySettingsUI();
            
            if (key === 'lang') updateTexts();
            if (key === 'sort' || key === 'lang') reRender();
            if (key === 'timeFormat' || key === 'timezone') updateClock();
        });
    }
});

applySettingsUI();

function updateTexts() {
    const t = translations[appSettings.lang] || translations['uz'];
    document.getElementById('siteTitle').innerHTML = `<i class="fas fa-globe-americas"></i> ${t.title}`;
    if(searchInput) searchInput.placeholder = t.search;
}
updateTexts();

function updateClock() {
    const tz = appSettings.timezone;
    const is12Hour = appSettings.timeFormat === '12';
    try {
        const now = new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour12: is12Hour });
        if(liveClock) liveClock.textContent = now;
    } catch(e) {
        if(liveClock) liveClock.textContent = new Date().toLocaleTimeString();
    }
}
setInterval(updateClock, 1000);

// Tungi rejim
function updateThemeUI(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.querySelector('i').className = 'fas fa-sun';
        if(themeText) themeText.textContent = 'Kunduzgi rejim';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if(themeToggle) themeToggle.querySelector('i').className = 'fas fa-moon';
        if(themeText) themeText.textContent = 'Tungi rejim';
    }
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'dark';
        updateThemeUI(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
if (localStorage.getItem('theme') === 'dark') updateThemeUI(true);

// Qit'alar bo'yicha filtr tugmalari
document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentRegion = e.target.dataset.region;
        reRender();
    });
});

// Navigatsiya menyusi
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        const targetSec = document.getElementById(btn.dataset.target);
        if(targetSec) {
            targetSec.classList.add('active');
            if (btn.dataset.target === 'worldClocksSection') {
                renderWorldClocks();
            }
        }
    });
});

// Dunyo vaqtlari (250 ta davlat)
let clockSearchTerm = "";
const timezonesMap = {
    "uz": "Asia/Tashkent", "us": "America/New_York", "ru": "Europe/Moscow",
    "gb": "Europe/London", "jp": "Asia/Tokyo", "fr": "Europe/Paris",
    "de": "Europe/Berlin", "cn": "Asia/Shanghai", "tr": "Europe/Istanbul",
    "kz": "Asia/Almaty", "kr": "Asia/Seoul", "in": "Asia/Kolkata",
    "br": "America/Sao_Paulo", "ca": "America/Toronto", "au": "Australia/Sydney",
    "ae": "Asia/Dubai", "sa": "Asia/Riyadh"
};

function getCountryTimezone(country) {
    if (timezonesMap[country.cca2]) return timezonesMap[country.cca2];
    if (country.region === "Europe") return "Europe/Berlin";
    if (country.region === "Asia") return "Asia/Tashkent";
    if (country.region === "Americas") return "America/New_York";
    if (country.region === "Africa") return "Africa/Cairo";
    if (country.region === "Oceania") return "Australia/Sydney";
    return "UTC";
}

function renderWorldClocks() {
    const grid = document.getElementById('worldClocksGrid');
    if (!grid) return;

    let filtered = allCountries.filter(c => {
        let name = c.name.common.toLowerCase();
        let capital = c.capital.toLowerCase();
        return name.includes(clockSearchTerm) || capital.includes(clockSearchTerm);
    });

    grid.innerHTML = '';
    
    filtered.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.style.cssText = "background:var(--card-bg); padding:18px; border-radius:16px; border:1px solid var(--border-color); text-align:center; box-shadow: var(--shadow);";
        
        card.innerHTML = `
            <img src="${c.flags.svg}" style="width: 45px; height: 30px; object-fit: cover; border-radius: 4px; margin-bottom: 8px; border: 1px solid var(--border-color);">
            <h3 style="font-size: 1rem; margin-bottom: 4px; color: var(--text-color);">${c.name.common}</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">Poytaxt: ${c.capital}</p>
            <p id="realClock_${index}" style="font-size: 1.2rem; font-weight: bold; font-family: monospace; color: var(--primary-color);">00:00:00</p>
        `;
        grid.appendChild(card);
    });
}

function updateAllClocks() {
    allCountries.forEach((c, index) => {
        const clockEl = document.getElementById(`realClock_${index}`);
        if (clockEl) {
            try {
                let tz = getCountryTimezone(c);
                let timeStr = new Date().toLocaleTimeString('en-GB', { timeZone: tz });
                clockEl.textContent = timeStr;
            } catch (e) {
                clockEl.textContent = new Date().toLocaleTimeString();
            }
        }
    });
}
setInterval(updateAllClocks, 1000);

const clockSearchInput = document.getElementById('clockSearchInput');
if (clockSearchInput) {
    clockSearchInput.addEventListener('input', (e) => {
        clockSearchTerm = e.target.value.toLowerCase().trim();
        renderWorldClocks();
    });
}

// Davlatlarni yuklash
async function loadCountries() {
    try {
        const response = await fetch('countries.json');
        const data = await response.json();
        
        allCountries = data.map(c => ({
            name: { common: c.name?.common || 'N/A', official: c.name?.official || 'N/A' },
            capital: c.capital ? (Array.isArray(c.capital) ? c.capital[0] : c.capital) : 'N/A',
            region: c.region || 'N/A',
            area: c.area || 0,
            areaStr: c.area ? c.area.toLocaleString() + ' km²' : 'N/A',
            population: c.population || 0,
            popRaw: c.population || 0,
            popStr: c.population ? c.population.toLocaleString() : 'N/A',
            languages: c.languages ? Object.values(c.languages).join(', ') : 'N/A',
            currencies: c.currencies ? Object.values(c.currencies) : [],
            flags: { svg: c.cca2 ? `https://flagcdn.com/${c.cca2.toLowerCase()}.svg` : '' },
            cca2: c.cca2 ? c.cca2.toLowerCase() : 'us',
            latlng: c.latlng || [0, 0]
        }));

        loading.style.display = 'none';
        gridContainer.classList.remove('hidden');
        reRender();
        initCompareSelects();
    } catch (error) {
        loading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Xatolik yuz berdi! Live Server orqali oching.';
    }
}

function reRender() {
    let filtered = allCountries.filter(c => {
        let matchesSearch = c.name.common.toLowerCase().includes(currentSearchTerm) || c.name.official.toLowerCase().includes(currentSearchTerm);
        let matchesRegion = (currentRegion === 'all' || c.region === currentRegion);
        return matchesSearch && matchesRegion;
    });

    if (showOnlyFavorites) filtered = filtered.filter(c => favoriteCountries.includes(c.cca2));

    if (appSettings.sort === 'az') filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    if (appSettings.sort === 'za') filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
    if (appSettings.sort === 'areaDesc') filtered.sort((a, b) => b.area - a.area);
    if (appSettings.sort === 'areaAsc') filtered.sort((a, b) => a.area - b.area);
    if (appSettings.sort === 'popDesc') filtered.sort((a, b) => b.popRaw - a.popRaw);
    if (appSettings.sort === 'popAsc') filtered.sort((a, b) => a.popRaw - b.popRaw);

    if (filtered.length === 0 && showOnlyFavorites) {
        gridContainer.classList.add('hidden');
        if (noFavoritesMsg) noFavoritesMsg.classList.remove('hidden');
    } else {
        gridContainer.classList.remove('hidden');
        if (noFavoritesMsg) noFavoritesMsg.classList.add('hidden');
        renderCountries(filtered);
    }
}

function renderCountries(countries) {
    gridContainer.innerHTML = '';
    const t = translations[appSettings.lang] || translations['uz'];
    
    countries.forEach(country => {
        const isFav = favoriteCountries.includes(country.cca2);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${country.cca2}', event)" title="Sevimlilarga qo'shish">
                <i class="far fa-heart"></i>
            </div>
            <div class="card-header">
                <img src="${country.flags.svg}" alt="${country.name.common}" loading="lazy">
                <div class="card-title-group">
                    <h2>${country.name.common}</h2>
                    <span class="official-name">${country.name.official}</span>
                </div>
            </div>
            <div class="tags">
                <span class="tag">${country.region}</span>
            </div>
            <div class="info-rows">
                <div class="info-row"><span class="label">${t.capital}:</span><span class="value">${country.capital}</span></div>
                <div class="info-row"><span class="label">${t.population}:</span><span class="value">${country.popStr}</span></div>
                <div class="info-row"><span class="label">${t.area}:</span><span class="value">${country.areaStr}</span></div>
            </div>
        `;
        card.addEventListener('click', () => openModal(country));
        gridContainer.appendChild(card);
    });
}

// Modal, Xarita va Konvertor
function openModal(country) {
    let currencyName = country.currencies.length > 0 ? country.currencies[0].name : "Noma'lum";
    let currencySymbol = country.currencies.length > 0 ? (country.currencies[0].symbol || '') : '';

    modalBody.innerHTML = `
        <div class="modal-tabs">
            <button class="modal-tab-btn active" onclick="switchModalTab(event, 'tabInfo')">Ma'lumot</button>
            <button class="modal-tab-btn" onclick="switchModalTab(event, 'tabMap'); initMap(${country.latlng[0]}, ${country.latlng[1]});">Xarita</button>
            <button class="modal-tab-btn" onclick="switchModalTab(event, 'tabTools')">Konvertor & PDF</button>
        </div>
        
        <div id="tabInfo" class="modal-tab-content active">
            <h2>${country.name.common}</h2>
            <p style="margin: 10px 0;">Poytaxt: <b>${country.capital}</b> | Aholi: <b>${country.popStr}</b></p>
            <p>Valyuta: <b>${currencyName} (${currencySymbol})</b> | Maydon: <b>${country.areaStr}</b></p>
        </div>

        <div id="tabMap" class="modal-tab-content">
            <div id="mapContainer" style="height: 350px; width: 100%; border-radius: 12px;"></div>
        </div>

        <div id="tabTools" class="modal-tab-content" style="text-align: center;">
            <div class="currency-converter">
                <h4>Valyuta Kalkulyatori</h4>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 5px;">1 USD ≈ 12,800 So'm</p>
                <input type="number" id="usdInput" placeholder="USD miqdori" class="setting-select" style="margin-top: 10px;">
                <p id="convertedResult" style="margin-top: 10px; font-weight: bold;"></p>
            </div>
            <button class="primary-btn" style="margin-top: 20px;" onclick="downloadData('${country.name.common}', '${country.capital}', '${country.popStr}')">
                <i class="fas fa-download"></i> Ma'lumotni TXT ga yuklab olish
            </button>
        </div>
    `;
    countryModal.classList.remove('hidden');

    setTimeout(() => {
        const usdInput = document.getElementById('usdInput');
        if(usdInput) {
            usdInput.addEventListener('input', (e) => {
                let val = e.target.value;
                document.getElementById('convertedResult').textContent = val ? `${(val * 12800).toLocaleString()} O'zbek so'mi` : '';
            });
        }
    }, 200);
}

window.downloadData = function(name, capital, pop) {
    let text = `Davlat: ${name}\nPoytaxt: ${capital}\nAholi: ${pop}\nManba: Jahon Davlatlari Pro`;
    let blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}_malumot.txt`;
    link.click();
};

window.switchModalTab = function(event, tabId) {
    document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
};

window.initMap = function(lat, lng) {
    if (mapInstance) mapInstance.remove();
    setTimeout(() => {
        mapInstance = L.map('mapContainer').setView([lat, lng], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
        L.marker([lat, lng]).addTo(mapInstance);
    }, 100);
};

// Taqqoslash
function initCompareSelects() {
    const s1 = document.getElementById('compSelect1');
    const s2 = document.getElementById('compSelect2');
    if(!s1) return;
    let opts = '<option value="">Davlat tanlang...</option>';
    allCountries.forEach(c => opts += `<option value="${c.cca2}">${c.name.common}</option>`);
    s1.innerHTML = opts; s2.innerHTML = opts;
    s1.addEventListener('change', () => renderCompare(s1.value, 'compResult1'));
    s2.addEventListener('change', () => renderCompare(s2.value, 'compResult2'));
}

function renderCompare(code, divId) {
    let div = document.getElementById(divId);
    if(!code) return;
    let c = allCountries.find(x => x.cca2 === code);
    div.innerHTML = `<img src="${c.flags.svg}" style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:10px;"><h4 style="font-size:1.2rem;">${c.name.common}</h4><p>Poytaxt: ${c.capital}</p><p>Aholi: ${c.popStr}</p><p>Maydon: ${c.areaStr}</p>`;
}

// Viktorina
let score = 0;
if(document.getElementById('startQuizBtn')) {
    document.getElementById('startQuizBtn').addEventListener('click', () => {
        document.getElementById('startQuizBtn').classList.add('hidden');
        document.getElementById('quizGame').classList.remove('hidden');
        score = 0; nextQuiz();
    });
}

function nextQuiz() {
    let choices = [...allCountries].sort(() => 0.5 - Math.random()).slice(0, 4);
    let ans = choices[Math.floor(Math.random() * 4)];
    document.getElementById('quizImage').src = ans.flags.svg;
    document.getElementById('quizImage').style.display = 'inline-block';
    let opts = document.getElementById('quizOptions');
    opts.innerHTML = '';
    choices.forEach(c => {
        let btn = document.createElement('button');
        btn.className = 'quiz-opt-btn'; btn.textContent = c.name.common;
        btn.onclick = () => {
            if(c.cca2 === ans.cca2) { 
                score += 10; 
                document.getElementById('quizScore').textContent = `Hisob: ${score}`;
                nextQuiz(); 
            } else { 
                alert(`Xato! O'yin tugadi. Yig'gan balingiz: ${score}`); 
                document.getElementById('quizGame').classList.add('hidden'); 
                document.getElementById('startQuizBtn').classList.remove('hidden'); 
            }
        };
        opts.appendChild(btn);
    });
}

// Hodisalar va tugmalar
if(searchInput) {
    searchInput.addEventListener('input', (e) => { 
        currentSearchTerm = e.target.value.toLowerCase().trim(); 
        reRender(); 
    });
}

if(favoritesFilterBtn) {
    favoritesFilterBtn.addEventListener('click', (e) => { 
        showOnlyFavorites = !showOnlyFavorites; 
        e.currentTarget.classList.toggle('active'); 
        reRender(); 
    });
}

window.toggleFavorite = function(code, e) {
    e.stopPropagation();
    if(favoriteCountries.includes(code)) favoriteCountries = favoriteCountries.filter(c => c !== code);
    else favoriteCountries.push(code);
    localStorage.setItem('favoriteCountries', JSON.stringify(favoriteCountries));
    reRender();
};

if(settingsBtn) settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
if(closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));

const closeCountryBtn = document.getElementById('closeCountryBtn');
if(closeCountryBtn) {
    closeCountryBtn.addEventListener('click', () => {
        countryModal.classList.add('hidden');
        if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    });
}

window.addEventListener('click', (e) => {
    if (e.target === countryModal) {
        countryModal.classList.add('hidden');
        if (mapInstance) { mapInstance.remove(); mapInstance = null; }
    }
    if (e.target === settingsModal) settingsModal.classList.add('hidden');
    // Asosiy 4 ta shahar vaqtini real rejimda ko'rsatish
function updateStaticWorldClocks() {
    try {
        if(document.getElementById('utcTashkent')) {
            document.getElementById('utcTashkent').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tashkent' });
        }
        if(document.getElementById('utcLondon')) {
            document.getElementById('utcLondon').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London' });
        }
        if(document.getElementById('utcNewYork')) {
            document.getElementById('utcNewYork').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/New_York' });
        }
        if(document.getElementById('utcTokyo')) {
            document.getElementById('utcTokyo').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo' });
        }
    } catch (e) {
        console.log("Vaqtni yangilashda xatolik");
    }
}
setInterval(updateStaticWorldClocks, 1000);
updateStaticWorldClocks(); // Dastlabki ishga tushirish
});

loadCountries();
