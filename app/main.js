const form = document.querySelector('#wellness-form');
const summaryText = document.querySelector('#summary-text');
const coachQuote = document.querySelector('#coach-quote');
const scoreNumber = document.querySelector('#score-number');
const scoreBar = document.querySelector('#score-bar');
const wellnessLevel = document.querySelector('#wellness-level');
const tipsGrid = document.querySelector('#tips-grid');

const STORAGE_KEY = 'nuralife.wellness-analysis.v2';

const getLevel = (score) => {
  if (score >= 80) return 'Alto';
  if (score >= 60) return 'Medio';
  return 'Base';
};

const composeSummary = ({ activity, sleep, nutrition, stress }) => {
  const strengths = [];
  const risks = [];

  if (activity >= 7) strengths.push('tu actividad física es sólida y consistente');
  else risks.push('te falta constancia de movimiento semanal');

  if (sleep >= 7) strengths.push('tu recuperación por sueño está bien encaminada');
  else risks.push('el descanso insuficiente está limitando tu recuperación');

  if (nutrition >= 7) strengths.push('la calidad de tu nutrición está aportando energía estable');
  else risks.push('tu nutrición necesita más densidad nutricional y menos ultraprocesado');

  if (stress <= 4) strengths.push('estás gestionando bien el estrés diario');
  else risks.push('el estrés elevado puede drenar energía y foco');

  return `Tu punto fuerte: ${strengths.join(', ')}. A vigilar: ${risks.join(', ')}.`;
};

const buildTips = ({ sleep, nutrition, stress, activity }) => {
  const tips = [];

  if (sleep < 7) {
    tips.push({ level: 'MEDIO', area: 'SALUD', title: 'Optimización del Sueño', body: 'Sube tu descanso en bloques de 20-30 min por semana hasta llegar a 7-8 horas.' });
  }

  if (nutrition < 7) {
    tips.push({ level: 'MEDIO', area: 'SALUD', title: 'Regla del 80/20 en Nutrición', body: 'Prioriza comidas completas con proteína, fibra y vegetales en el 80% de tus ingestas.' });
  }

  if (stress > 5) {
    tips.push({ level: 'FÁCIL', area: 'PRODUCTIVIDAD', title: 'Pausa de Descarga', body: 'Haz 5 minutos de respiración o caminata suave al cerrar bloques intensos de trabajo.' });
  }

  if (activity < 6) {
    tips.push({ level: 'FÁCIL', area: 'SALUD', title: 'Movimiento Diario Mínimo', body: 'Asegura 20 minutos de caminata o entrenamiento ligero para mantener inercia.' });
  }

  if (tips.length < 3) {
    tips.push({ level: 'FÁCIL', area: 'SALUD', title: 'Monitoreo de Recuperación', body: 'Registra energía y calidad de sueño durante 2 semanas para detectar patrones.' });
  }

  return tips.slice(0, 4);
};

const renderTips = (tips) => {
  tipsGrid.innerHTML = '';
  tips.forEach((tip) => {
    const node = document.createElement('article');
    node.className = 'tip-card';
    node.innerHTML = `
      <span class="badge">${tip.level}</span>
      <p class="eyebrow">${tip.area}</p>
      <h3>${tip.title}</h3>
      <p>${tip.body}</p>
    `;
    tipsGrid.appendChild(node);
  });
};

const renderResult = (payload) => {
  const score = Math.round(
    payload.activity * 3 +
      Math.min(payload.sleep, 8) * 5 +
      payload.nutrition * 3 +
      (10 - payload.stress) * 2
  );

  const normalizedScore = Math.max(0, Math.min(100, score));
  const level = getLevel(normalizedScore);

  summaryText.textContent = composeSummary(payload);
  coachQuote.textContent =
    normalizedScore >= 70
      ? '“Tienes una buena base: si mejoras descanso y nutrición de forma consistente, tu siguiente salto será notable.”'
      : '“Tu progreso depende de pequeños hábitos diarios. Prioriza sueño, comida real y control del estrés esta semana.”';

  scoreNumber.textContent = String(normalizedScore);
  scoreBar.style.width = `${normalizedScore}%`;
  wellnessLevel.textContent = level;

  renderTips(buildTips(payload));
};

const loadSaved = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const save = (payload) => localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    activity: Number(data.get('activity')),
    sleep: Number(data.get('sleep')),
    nutrition: Number(data.get('nutrition')),
    stress: Number(data.get('stress')),
    savedAt: new Date().toISOString()
  };
  save(payload);
  renderResult(payload);
});

const saved = loadSaved();
if (saved) {
  renderResult(saved);
} else {
  renderResult({ activity: 8, sleep: 6, nutrition: 5, stress: 6 });
}
