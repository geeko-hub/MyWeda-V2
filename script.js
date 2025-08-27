// ======================
// CONFIG
// ======================
const API_KEY = "9d10caf92cee4bac8dd102629252508"; // Ta clé WeatherAPI
const DEFAULT_CITY = "Niamey";
const MAX_HOURLY = 5; // prochaines heures

// ======================
// LISTE DES VILLES DU NIGER
// ======================
const CITY_LIST = [
    "Niamey","Maradi","Zinder","Agadez","Tahoua","Dosso","Diffa","Tillabéri","Gaya",
    "Arlit","Bilma","Tchirozérine","Aderbissinat","Afassas","Aouderas","Dannet","Dabaga","Dirkou",
    "Fachi","Gougaram","Iferouane","Ingall","Tabelot","Timia","Maïné-Soroa","N'Guigmi","Bosso",
    // ... ta liste complète ...
];

// ======================
// ELEMENTS DOM
// ======================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const cityListEl = document.getElementById('cityList');
const placeHint = document.getElementById('placeHint');
const currentTempEl = document.getElementById('currentTemp');
const currentConditionEl = document.getElementById('currentCondition');
const adviceBox = document.getElementById('adviceBox');
const hourlyForecastEl = document.getElementById('hourlyForecast');
const darkModeToggle = document.getElementById('darkModeToggle');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('errorMessage');

// ======================
// UTILS
// ======================
function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function setAdvice(condition) {
    let text = '';
    let cls = '';
    const c = condition.toLowerCase();
    if(c.includes('rain')) { text='Prévoyez un parapluie 🌧️'; cls='rain'; }
    else if(c.includes('sun') || c.includes('clear')) { text='Chaleur prévue, restez hydraté ☀️'; cls='heat'; }
    else if(c.includes('cloud') || c.includes('overcast')) { text='Temps nuageux, agréable ☁️'; cls='cloud'; }
    else { text='Vérifiez les conditions locales 🌡️'; cls=''; }
    adviceBox.textContent = text;
    adviceBox.className = 'advice reveal ' + cls;
}

// ======================
// DARK MODE
// ======================
darkModeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
});

// ======================
// CITY AUTOCOMPLETE
// ======================
searchInput.addEventListener('input', ()=>{
    const val = searchInput.value.trim();
    if(!val){ cityListEl.style.display='none'; return; }
    const filtered = CITY_LIST.filter(c=>c.toLowerCase().includes(val.toLowerCase()));
    cityListEl.innerHTML = filtered.map(c=>`<li>${c}</li>`).join('');
    cityListEl.style.display = filtered.length ? 'block' : 'none';
});

cityListEl.addEventListener('click', (e)=>{
    if(e.target.tagName==='LI'){
        searchInput.value = e.target.textContent;
        cityListEl.style.display='none';
        fetchWeather(searchInput.value);
    }
});

// ======================
// FETCH WEATHER
// ======================
async function fetchWeather(city=DEFAULT_CITY){
    loadingEl.style.display='block';
    errorEl.style.display='none';
    try{
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);
        if(!res.ok) throw new Error('Ville non trouvée');
        const data = await res.json();

        // Météo actuelle
        currentTempEl.textContent = Math.round(data.current.temp_c)+'°C';
        currentConditionEl.textContent = data.current.condition.text;
        placeHint.textContent = `${data.location.name}, ${data.location.region || ''}`;

        // Conseils rapides
        setAdvice(data.current.condition.text);

        // Prévisions horaires
        hourlyForecastEl.innerHTML = '';
        const nowHour = new Date(data.location.localtime).getHours();
        const hours = data.forecast.forecastday[0].hour;
        for(let i=0;i<MAX_HOURLY;i++){
            const hourData = hours[nowHour+i];
            if(!hourData) break;
            const time = hourData.time.split(' ')[1].slice(0,5);
            let icon='☁️';
            const txt = hourData.condition.text.toLowerCase();
            if(txt.includes('rain')) icon='🌧️';
            else if(txt.includes('sun') || txt.includes('clear')) icon='☀️';
            else if(txt.includes('cloud')) icon='⛅';
            hourlyForecastEl.innerHTML += `<div class="hour-item"><span>${time}</span><span>${icon} ${Math.round(hourData.temp_c)}°C</span></div>`;
        }

        playBeep();
    }catch(err){
        console.error(err);
        errorEl.textContent = err.message;
        errorEl.style.display='block';
    }finally{
        loadingEl.style.display='none';
    }
}

// ======================
// SEARCH BUTTON & ENTER
// ======================
searchBtn.addEventListener('click', ()=> fetchWeather(searchInput.value.trim()));
searchInput.addEventListener('keypress',(e)=>{ if(e.key==='Enter') fetchWeather(searchInput.value.trim()); });

// ======================
// INIT
// ======================
window.addEventListener('load', ()=> fetchWeather());
