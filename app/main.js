const form = document.querySelector('#checkin-form');
const summaryText = document.querySelector('#summary-text');
const STORAGE_KEY = 'nuralife.daily-checkin';

const renderSummary = (entry) => {
  if (!entry) {
    summaryText.textContent = 'Aún no guardas tu check-in de hoy.';
    return;
  }

  summaryText.textContent = `Energía ${entry.energy}/10 · Ánimo ${entry.mood}/10 · Sueño ${entry.sleep}h · Nota: ${entry.note || 'sin nota'}`;
};

const loadSavedEntry = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const payload = {
    energy: Number(data.get('energy')),
    mood: Number(data.get('mood')),
    sleep: Number(data.get('sleep')),
    note: String(data.get('note') || '').trim(),
    savedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  renderSummary(payload);
});

renderSummary(loadSavedEntry());
