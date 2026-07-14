const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

async function loadWeather() {
  const tempEl = document.getElementById('forecastTemp');
  const statusEl = document.getElementById('forecastStatus');
  const noteEl = document.getElementById('forecastNote');
  const iconEl = document.getElementById('weatherIcon');
  const activities = document.getElementById('activityList');

  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=30.3322&longitude=-81.6557&current=temperature_2m,weather_code,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather request failed');
    const data = await response.json();
    const current = data.current;

    const temperature = Math.round(current.temperature_2m);
    const code = current.weather_code;
    const rain = current.precipitation;
    const wind = Math.round(current.wind_speed_10m);

    let icon = '☀';
    let status = 'A beautiful day for outdoor play.';
    let activityText = ['Fetch', 'Nature time', 'Shade breaks', 'Fresh water'];

    if ([1, 2, 3].includes(code)) {
      icon = '⛅';
      status = 'Comfortable conditions for play and exploring.';
    }
    if ([45, 48].includes(code)) {
      icon = '🌫';
      status = 'A calm morning with supervised outdoor time.';
    }
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code) || rain > 0) {
      icon = '🌦';
      status = 'Mixed weather—playtime adjusted as needed.';
      activityText = ['Covered breaks', 'Indoor comfort', 'Fresh water', 'Flexible play'];
    }
    if ([95, 96, 99].includes(code)) {
      icon = '⛈';
      status = 'Stormy conditions—safety-first indoor care.';
      activityText = ['Indoor play', 'Calm rest', 'Fresh water', 'Weather monitoring'];
    }
    if (temperature >= 90) {
      status = 'Warm weather with extra water and shade breaks.';
      activityText = ['Morning play', 'Shade breaks', 'Fresh water', 'Cool-down time'];
    }

    tempEl.textContent = `${temperature}°`;
    iconEl.textContent = icon;
    statusEl.textContent = status;
    noteEl.textContent = `Jacksonville · Wind ${wind} mph`;
    activities.innerHTML = activityText.map((item) => `<span>${item}</span>`).join('');
  } catch (error) {
    tempEl.textContent = '—';
    iconEl.textContent = '🌿';
    statusEl.textContent = 'A good day for thoughtful, supervised play.';
    noteEl.textContent = 'Jacksonville, Florida';
  }
}

loadWeather();
