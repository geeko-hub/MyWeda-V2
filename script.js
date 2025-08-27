// ===================================================
// script.js - MyWeda Niger (Version optimisée)
// ===================================================

// Clé API WeatherAPI (NE PAS exposer en public en production)
const apiKey = "9d10caf92cee4bac8dd102629252508";

// --- Liste complète des communes du Niger ---
const nigerCommunes = [
    // Villes principales avec coordonnées
    { nom: "Niamey", region: "Niamey", lat: 13.5128, lon: 2.1128 },
    { nom: "Maradi", region: "Maradi", lat: 13.5, lon: 7.1 },
    { nom: "Zinder", region: "Zinder", lat: 13.779, lon: 8.9881 },
    { nom: "Tahoua", region: "Tahoua", lat: 14.89, lon: 5.26 },
    { nom: "Agadez", region: "Agadez", lat: 16.9736, lon: 7.9911 },
    { nom: "Dosso", region: "Dosso", lat: 13.05, lon: 3.19 },
    { nom: "Tillabéri", region: "Tillabéri", lat: 14.21, lon: 1.45 },
    { nom: "Diffa", region: "Diffa", lat: 13.3167, lon: 12.6167 },

    // Région d'Agadez
    { nom: "Arlit", region: "Agadez", lat: 18.7369, lon: 7.3853 },
    { nom: "Bilma", region: "Agadez", lat: 18.6853, lon: 12.9164 },
    { nom: "Tchirozérine", region: "Agadez", lat: 17.261, lon: 7.76 },
    { nom: "Aderbissinat", region: "Agadez", lat: null, lon: null },
    { nom: "Afassas", region: "Agadez", lat: null, lon: null },
    { nom: "Aouderas", region: "Agadez", lat: null, lon: null },
    { nom: "Dannet", region: "Agadez", lat: null, lon: null },
    { nom: "Dabaga", region: "Agadez", lat: null, lon: null },
    { nom: "Dirkou", region: "Agadez", lat: null, lon: null },
    { nom: "Fachi", region: "Agadez", lat: null, lon: null },
    { nom: "Gougaram", region: "Agadez", lat: null, lon: null },
    { nom: "Iferouane", region: "Agadez", lat: null, lon: null },
    { nom: "Ingall", region: "Agadez", lat: null, lon: null },
    { nom: "Tabelot", region: "Agadez", lat: null, lon: null },
    { nom: "Timia", region: "Agadez", lat: null, lon: null },

    // Région de Diffa
    { nom: "Maïné-Soroa", region: "Diffa", lat: 13.211, lon: 12.024 },
    { nom: "N'Guigmi", region: "Diffa", lat: 14.252, lon: 13.11 },
    { nom: "Bosso", region: "Diffa", lat: null, lon: null },
    { nom: "Chétimari", region: "Diffa", lat: null, lon: null },
    { nom: "Goudoumaria", region: "Diffa", lat: null, lon: null },
    { nom: "Gueskérou", region: "Diffa", lat: null, lon: null },
    { nom: "Kabléwa", region: "Diffa", lat: null, lon: null },
    { nom: "N'Gourti", region: "Diffa", lat: null, lon: null },
    { nom: "Toumour", region: "Diffa", lat: null, lon: null },

    // Région de Dosso
    { nom: "Birni N'Gaouré", region: "Dosso", lat: 13.08, lon: 2.91 },
    { nom: "Dioundiou", region: "Dosso", lat: null, lon: null },
    { nom: "Dogondoutchi", region: "Dosso", lat: 13.64, lon: 4.03 },
    { nom: "Gaya", region: "Dosso", lat: 11.88, lon: 3.45 },
    { nom: "Loga", region: "Dosso", lat: 13.61, lon: 3.24 },
    { nom: "Tibiri", region: "Dosso", lat: 13.56, lon: 4.0 },
    { nom: "Bana", region: "Dosso", lat: null, lon: null },
    { nom: "Bengou", region: "Dosso", lat: null, lon: null },
    { nom: "Dankassari", region: "Dosso", lat: null, lon: null },
    { nom: "Dogonkiria", region: "Dosso", lat: null, lon: null },
    { nom: "Falmey", region: "Dosso", lat: null, lon: null },
    { nom: "Farey", region: "Dosso", lat: null, lon: null },
    { nom: "Gollé", region: "Dosso", lat: null, lon: null },
    { nom: "Guéchémé", region: "Dosso", lat: null, lon: null },
    { nom: "Guilladjé", region: "Dosso", lat: null, lon: null },
    { nom: "Karguibangou", region: "Dosso", lat: null, lon: null },
    { nom: "Kiéché", region: "Dosso", lat: null, lon: null },
    { nom: "Koré Maïroua", region: "Dosso", lat: null, lon: null },
    { nom: "Kiota", region: "Dosso", lat: null, lon: null },
    { nom: "Matankari", region: "Dosso", lat: null, lon: null },
    { nom: "Mokko", region: "Dosso", lat: null, lon: null },
    { nom: "Sokorbé", region: "Dosso", lat: null, lon: null },
    { nom: "Soucoucoutane", region: "Dosso", lat: null, lon: null },
    { nom: "Tanda", region: "Dosso", lat: null, lon: null },
    { nom: "Téssa", region: "Dosso", lat: null, lon: null },
    { nom: "Tounouga", region: "Dosso", lat: null, lon: null },
    { nom: "Yélou", region: "Dosso", lat: null, lon: null },

    // Région de Maradi
    { nom: "Aguié", region: "Maradi", lat: 13.7, lon: 7.78 },
    { nom: "Dakoro", region: "Maradi", lat: 14.51, lon: 6.77 },
    { nom: "Guidan-Roumdji", region: "Maradi", lat: 13.85, lon: 6.7 },
    { nom: "Madarounfa", region: "Maradi", lat: 13.31, lon: 7.16 },
    { nom: "Mayahi", region: "Maradi", lat: 13.95, lon: 7.67 },
    { nom: "Tessaoua", region: "Maradi", lat: 13.76, lon: 7.99 },
    { nom: "Adjékoria", region: "Maradi", lat: null, lon: null },
    { nom: "Attantane", region: "Maradi", lat: null, lon: null },
    { nom: "Azagor", region: "Maradi", lat: null, lon: null },
    { nom: "Bader Goula", region: "Maradi", lat: null, lon: null },
    { nom: "Chadakori", region: "Maradi", lat: null, lon: null },
    { nom: "Dan-Goulbi", region: "Maradi", lat: null, lon: null },
    { nom: "Dan-Issa", region: "Maradi", lat: null, lon: null },
    { nom: "Djiratawa", region: "Maradi", lat: null, lon: null },
    { nom: "El Allassane Maïreyrey", region: "Maradi", lat: null, lon: null },
    { nom: "Gabi", region: "Maradi", lat: null, lon: null },
    { nom: "Gangara", region: "Maradi", lat: null, lon: null },
    { nom: "Guidan Amoumoune", region: "Maradi", lat: null, lon: null },
    { nom: "Guidan Sori", region: "Maradi", lat: null, lon: null },
    { nom: "Issaouane", region: "Maradi", lat: null, lon: null },
    { nom: "Koona", region: "Maradi", lat: null, lon: null },
    { nom: "Kornaka", region: "Maradi", lat: null, lon: null },
    { nom: "Maïjirgui", region: "Maradi", lat: null, lon: null },
    { nom: "Ourno", region: "Maradi", lat: null, lon: null },
    { nom: "Sabon-Machi", region: "Maradi", lat: null, lon: null },
    { nom: "Safo", region: "Maradi", lat: null, lon: null },
    { nom: "Sarkin Haoussa", region: "Maradi", lat: null, lon: null },
    { nom: "Sarkin Yamma", region: "Maradi", lat: null, lon: null },
    { nom: "Tchadoua", region: "Maradi", lat: null, lon: null },

    // Région de Tahoua
    { nom: "Abalak", region: "Tahoua", lat: 15.45, lon: 6.28 },
    { nom: "Konni", region: "Tahoua", lat: 13.79, lon: 5.25 },
    { nom: "Bouza", region: "Tahoua", lat: 14.42, lon: 6.04 },
    { nom: "Illéla", region: "Tahoua", lat: 14.46, lon: 5.24 },
    { nom: "Keita", region: "Tahoua", lat: 14.75, lon: 5.77 },
    { nom: "Madaoua", region: "Tahoua", lat: 14.07, lon: 5.96 },
    { nom: "Tchintabaraden", region: "Tahoua", lat: 15.9, lon: 5.79 },
    { nom: "Tillia", region: "Tahoua", lat: 16.1, lon: 4.8 },
    { nom: "Affala", region: "Tahoua", lat: null, lon: null },
    { nom: "Akokan", region: "Tahoua", lat: null, lon: null },
    { nom: "Allakaye", region: "Tahoua", lat: null, lon: null },
    { nom: "Azèye", region: "Tahoua", lat: null, lon: null },
    { nom: "Badaguichiri", region: "Tahoua", lat: null, lon: null },
    { nom: "Bagaroua", region: "Tahoua", lat: null, lon: null },
    { nom: "Bambeye", region: "Tahoua", lat: null, lon: null },
    { nom: "Bangui", region: "Tahoua", lat: null, lon: null },
    { nom: "Bermo", region: "Tahoua", lat: null, lon: null },
    { nom: "Doguéraoua", region: "Tahoua", lat: null, lon: null },
    { nom: "Galma Koudawatché", region: "Tahoua", lat: null, lon: null },
    { nom: "Garhanga", region: "Tahoua", lat: null, lon: null },
    { nom: "Ibohamane", region: "Tahoua", lat: null, lon: null },
    { nom: "Kao", region: "Tahoua", lat: null, lon: null },
    { nom: "Kalfou", region: "Tahoua", lat: null, lon: null },
    { nom: "Karofane", region: "Tahoua", lat: null, lon: null },
    { nom: "Malbaza", region: "Tahoua", lat: null, lon: null },
    { nom: "Sabon Guida", region: "Tahoua", lat: null, lon: null },
    { nom: "Tabalak", region: "Tahoua", lat: null, lon: null },
    { nom: "Takanamat", region: "Tahoua", lat: null, lon: null },
    { nom: "Tamaské", region: "Tahoua", lat: null, lon: null },
    { nom: "Tassara", region: "Tahoua", lat: null, lon: null },
    { nom: "Tébaram", region: "Tahoua", lat: null, lon: null },
    { nom: "Tsernaoua", region: "Tahoua", lat: null, lon: null },

    // Région de Tillabéri
    { nom: "Abala", region: "Tillabéri", lat: null, lon: null },
    { nom: "Ayorou", region: "Tillabéri", lat: 14.73, lon: 0.92 },
    { nom: "Balleyara", region: "Tillabéri", lat: 13.73, lon: 2.9 },
    { nom: "Banibangou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Filingué", region: "Tillabéri", lat: 14.35, lon: 3.32 },
    { nom: "Kollo", region: "Tillabéri", lat: 13.3, lon: 2.33 },
    { nom: "Ouallam", region: "Tillabéri", lat: 14.32, lon: 2.09 },
    { nom: "Say", region: "Tillabéri", lat: 13.1, lon: 2.36 },
    { nom: "Téra", region: "Tillabéri", lat: 14.01, lon: 0.75 },
    { nom: "Anzourou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Bankilaré", region: "Tillabéri", lat: null, lon: null },
    { nom: "Bibiyergou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Bitinkodji", region: "Tillabéri", lat: null, lon: null },
    { nom: "Dargol", region: "Tillabéri", lat: null, lon: null },
    { nom: "Dessa", region: "Tillabéri", lat: null, lon: null },
    { nom: "Diagorou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Diamou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Diantchandou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Dingazi", region: "Tillabéri", lat: null, lon: null },
    { nom: "Gothèye", region: "Tillabéri", lat: null, lon: null },
    { nom: "Gorouol", region: "Tillabéri", lat: null, lon: null },
    { nom: "Hamdallaye", region: "Tillabéri", lat: null, lon: null },
    { nom: "Imanan", region: "Tillabéri", lat: null, lon: null },
    { nom: "Karma", region: "Tillabéri", lat: null, lon: null },
    { nom: "Kirtachi", region: "Tillabéri", lat: null, lon: null },
    { nom: "Kourteye", region: "Tillabéri", lat: null, lon: null },
    { nom: "Kokorou", region: "Tillabéri", lat: null, lon: null },
    { nom: "Méhana", region: "Tillabéri", lat: null, lon: null },
    { nom: "N'Dounga", region: "Tillabéri", lat: null, lon: null },
    { nom: "Sanam", region: "Tillabéri", lat: null, lon: null },
    { nom: "Sakoira", region: "Tillabéri", lat: null, lon: null },
    { nom: "Simiri", region: "Tillabéri", lat: null, lon: null },
    { nom: "Tagazar", region: "Tillabéri", lat: null, lon: null },
    { nom: "Tallé", region: "Tillabéri", lat: null, lon: null },
    { nom: "Tondikandia", region: "Tillabéri", lat: null, lon: null },
    { nom: "Tondi Kiwindi", region: "Tillabéri", lat: null, lon: null },
    { nom: "Torodi", region: "Tillabéri", lat: null, lon: null },

    // Région de Zinder
    { nom: "Gouré", region: "Zinder", lat: 13.98, lon: 10.27 },
    { nom: "Magaria", region: "Zinder", lat: 12.99, lon: 8.91 },
    { nom: "Matamèye", region: "Zinder", lat: 13.42, lon: 8.47 },
    { nom: "Mirriah", region: "Zinder", lat: 13.71, lon: 9.15 },
    { nom: "Tanout", region: "Zinder", lat: 14.97, lon: 8.88 },
    { nom: "Alakoss", region: "Zinder", lat: null, lon: null },
    { nom: "Bakin Birji", region: "Zinder", lat: null, lon: null },
    { nom: "Bandé", region: "Zinder", lat: null, lon: null },
    { nom: "Bouné", region: "Zinder", lat: null, lon: null },
    { nom: "Dabara", region: "Zinder", lat: null, lon: null },
    { nom: "Damagaram Takaya", region: "Zinder", lat: null, lon: null },
    { nom: "Dantchiao", region: "Zinder", lat: null, lon: null },
    { nom: "Daouché", region: "Zinder", lat: null, lon: null },
    { nom: "Dogo-Dogo", region: "Zinder", lat: null, lon: null },
    { nom: "Doungou", region: "Zinder", lat: null, lon: null },
    { nom: "Falanko", region: "Zinder", lat: null, lon: null },
    { nom: "Gamou", region: "Zinder", lat: null, lon: null },
    { nom: "Gaffati", region: "Zinder", lat: null, lon: null },
    { nom: "Garin Gona", region: "Zinder", lat: null, lon: null },
    { nom: "Gouchi", region: "Zinder", lat: null, lon: null },
    { nom: "Guidimouni", region: "Zinder", lat: null, lon: null },
    { nom: "Hamdara", region: "Zinder", lat: null, lon: null },
    { nom: "Hawandawaki", region: "Zinder", lat: null, lon: null },
    { nom: "Ichirnawa", region: "Zinder", lat: null, lon: null },
    { nom: "Kantché", region: "Zinder", lat: null, lon: null },
    { nom: "Kelle", region: "Zinder", lat: null, lon: null },
    { nom: "Kourni", region: "Zinder", lat: null, lon: null },
    { nom: "Mazamni", region: "Zinder", lat: null, lon: null },
    { nom: "Moa", region: "Zinder", lat: null, lon: null },
    { nom: "Olléléwa", region: "Zinder", lat: null, lon: null },
    { nom: "Tarka", region: "Zinder", lat: null, lon: null },
    { nom: "Tesker", region: "Zinder", lat: null, lon: null },
    { nom: "Wacha", region: "Zinder", lat: null, lon: null },
    { nom: "Yaouri", region: "Zinder", lat: null, lon: null },
    { nom: "Zermou", region: "Zinder", lat: null, lon: null }
];


// --- Sélection des éléments du DOM ---
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
const cityList = document.getElementById('cityList');
const searchBtn = document.getElementById('searchBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const weatherSection = document.getElementById('weatherSection');
const forecastSection = document.getElementById('forecastSection');
const chartSection = document.getElementById('chartSection');
const chartControls = document.getElementById('chartControls');
const tempChartBtn = document.getElementById('tempChartBtn');
const precipChartBtn = document.getElementById('precipChartBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
let chartInstance = null;
let latestData = null;

// --- Gestion du mode sombre ---
function setDarkMode(on) {
    const isDark = document.body.classList.contains('dark-mode');
    if (on && !isDark) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '🌙';
    } else if (!on && isDark) {
        document.body.classList.remove('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    localStorage.setItem('myweda_dark', on ? '1' : '0');
}

// Initialisation du mode sombre au chargement de la page
window.onload = () => {
    const userPref = localStorage.getItem('myweda_dark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPref ? userPref === '1' : prefersDark);
    
    // Animer les éléments qui sont déjà dans le DOM
    document.querySelectorAll('.weather-card, .forecast-card').forEach(el => {
        el.style.animation = 'fadeIn 0.8s forwards';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
};

darkModeToggle.onclick = () => setDarkMode(!document.body.classList.contains('dark-mode'));

// --- Gestion de la recherche et des suggestions ---
function showDropdown(matches) {
    cityList.innerHTML = '';
    if (matches.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    matches.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city.nom;
        const region = document.createElement('span');
        region.className = 'city-region';
        region.textContent = city.region;
        li.appendChild(region);
        li.onclick = () => {
            searchInput.value = city.nom;
            dropdown.style.display = 'none';
            fetchWeather(city.nom);
        };
        cityList.appendChild(li);
    });
    dropdown.style.display = 'block';
}

searchInput.addEventListener('input', () => {
    const val = searchInput.value.trim().toLowerCase();
    if (val.length === 0) {
        dropdown.style.display = 'none';
        return;
    }
    const matches = nigerCommunes.filter(c => c.nom.toLowerCase().includes(val));
    showDropdown(matches.slice(0, 8)); // Limite à 8 suggestions
});

searchInput.addEventListener('focus', () => {
    // Si la recherche est vide, on n'affiche rien. Sinon, on refait le filtrage.
    if (searchInput.value.trim().length > 0) {
        searchInput.dispatchEvent(new Event('input'));
    }
});
searchInput.addEventListener('blur', () => {
    setTimeout(() => dropdown.style.display = 'none', 150);
});

searchBtn.addEventListener('click', () => {
    const val = searchInput.value.trim();
    if (val.length === 0) return;
    fetchWeather(val);
});

// Permettre la recherche en appuyant sur 'Entrée'
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const val = searchInput.value.trim();
        if (val.length > 0) {
            fetchWeather(val);
        }
    }
});


// --- Fonctions d'affichage et d'état ---
function showLoading(show) { loading.style.display = show ? 'flex' : 'none'; }
function showError(msg) { errorMessage.textContent = msg; errorMessage.style.display = 'block'; }
function hideError() { errorMessage.style.display = 'none'; }
function hideAllSections() {
    weatherSection.innerHTML = '';
    forecastSection.innerHTML = '';
    chartSection.style.display = 'none';
    chartControls.style.display = 'none';
}

// --- Fonctions pour les messages intelligents ---
function getWeatherMessage(data) {
    const temp = data.current.temp_c;
    const precip = data.forecast.forecastday[0].day.totalprecip_mm;
    const wind = data.current.wind_kph;
    let message = '';
    let messageClass = '';

    if (precip > 0.5) {
        message = "Attention, de la pluie est prévue. Pensez à votre parapluie !";
        messageClass = "message-rain";
    } else if (temp > 35) {
        message = "Chaleur extrême ! N'oubliez pas de boire beaucoup d'eau.";
        messageClass = "message-hot";
    } else if (temp < 10) {
        message = "Il fait froid, habillez-vous chaudement !";
        messageClass = "message-cold";
    } else if (wind > 30) {
        message = "Vent fort ! Soyez prudent.";
        messageClass = "message-wind";
    }

    if (message) {
        return `<div class="weather-message ${messageClass}">${message}</div>`;
    }
    return '';
}

// --- Appel de l'API météo ---
async function fetchWeather(cityName) {
    hideAllSections();
    showLoading(true);
    hideError();

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityName + ', Niger')}&days=5&aqi=no&alerts=no&lang=fr&hour=12`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Ville non trouvée ou problème de connexion.");
        }
        const data = await res.json();
        latestData = data;
        renderWeather(data);
        renderHourlyForecast(data);
        renderChart(data, 'temp');
    } catch (e) {
        showError(e.message || "Erreur lors de la récupération des données.");
    } finally {
        showLoading(false);
    }
}

// --- Affichage des données météo ---
function renderWeather(data) {
    const c = data.current;
    const l = data.location;
    const d = data.forecast.forecastday[0].day;
    const w = data.forecast.forecastday[0];

    const messageHtml = getWeatherMessage(data);

    weatherSection.innerHTML = `
        <div class="weather-card animate__animated animate__fadeInUp" style="animation-delay:0.1s;">
            <div class="weather-header">
                <h2>${l.name}, ${l.region || 'Niger'}</h2>
                <div class="text-sm text-gray-500">${l.localtime.split(' ')[0]}</div>
            </div>
            <div class="current-weather">
                <img class="w-24 h-24" src="${c.condition.icon}" alt="Icone météo">
                <div class="temperature-info">
                    <div class="temperature">${c.temp_c}°C</div>
                    <div
