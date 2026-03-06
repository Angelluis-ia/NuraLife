const form = document.querySelector('#wellness-form');
const summaryText = document.querySelector('#summary-text');
const coachQuote = document.querySelector('#coach-quote');
const scoreNumber = document.querySelector('#score-number');
const scoreBar = document.querySelector('#score-bar');
const wellnessLevel = document.querySelector('#wellness-level');
const tipsGrid = document.querySelector('#tips-grid');

const STORAGE_KEY = 'nuralife.wellness-analysis.v4';

const hasAny = (text, words) => words.some((word) => text.includes(word));

const getLevel = (score) => {
  if (score >= 80) return 'Equilibrado';
  if (score >= 60) return 'En progreso';
  return 'Por construir';
};

const evaluateRoutine = ({ routineText, routinePeriod }) => {
  const text = routineText.toLowerCase();
  let score = 70;
  const strengths = [];
  const alerts = [];

  if (hasAny(text, ['caminar', 'entreno', 'gym', 'movilidad', 'deporte'])) {
    strengths.push('incluyes movimiento en tu rutina');
    score += 8;
  }

  if (hasAny(text, ['verdura', 'fruta', 'cocino', 'proteína', 'hidrato'])) {
    strengths.push('hay señales de alimentación más consciente');
    score += 6;
  }

  if (hasAny(text, ['duermo', 'descanso', 'desconexión', 'meditación'])) {
    strengths.push('estás cuidando momentos de recuperación');
    score += 6;
  }

  if (hasAny(text, ['ceno tarde', 'poco sueño', 'estrés', 'delivery', 'sentado', 'pantalla'])) {
    alerts.push('hay hábitos que pueden drenar tu energía a medio plazo');
    score -= 12;
  }

  if (!routineText.trim()) {
    alerts.push('faltan detalles de rutina para afinar recomendaciones');
    score -= 15;
  }

  if (routinePeriod === 'semanal') {
    strengths.push('tu visión semanal permite planificar mejor');
    score += 4;
  }

  const normalized = Math.max(0, Math.min(100, score));

  const summary = `De tu rutina ${routinePeriod}, destaca que ${strengths.join(', ') || 'tienes margen claro para construir hábitos base'}. También ${alerts.join(', ') || 'mantienes una base estable y sostenible'}.`;

  const tips = [
    {
      level: 'FÁCIL',
      area: 'BIENESTAR',
      title: 'Ancla un hábito mínimo diario',
      body: 'Elige una acción de 10 minutos (caminar, respiración o estiramientos) y repítela a la misma hora.'
    },
    {
      level: 'MEDIO',
      area: 'PLANIFICACIÓN',
      title: 'Diseña tu semana en bloques',
      body: 'Reserva en calendario momentos para comida, descanso y movimiento. Lo que se agenda, se cumple mejor.'
    }
  ];

  if (hasAny(text, ['sentado', 'oficina', 'pantalla'])) {
    tips.push({
      level: 'FÁCIL',
      area: 'ENERGÍA',
      title: 'Micropausas de 3 minutos',
      body: 'Cada 60-90 minutos, levántate y mueve cuello/cadera para reducir fatiga física y mental.'
    });
  }

  if (hasAny(text, ['ceno tarde', 'delivery', 'ultraprocesado'])) {
    tips.push({
      level: 'MEDIO',
      area: 'NUTRICIÓN',
      title: 'Cena simple y predecible',
      body: 'Prepara 2-3 cenas base por semana para evitar decisiones impulsivas al final del día.'
    });
  }

  if (hasAny(text, ['estrés', 'ansiedad', 'saturado'])) {
    tips.push({
      level: 'FÁCIL',
      area: 'CALMA',
      title: 'Cierre del día en 5 minutos',
      body: 'Antes de dormir, haz respiración lenta + lista corta de pendientes para liberar carga mental.'
    });
  }

  return { score: normalized, level: getLevel(normalized), summary, tips: tips.slice(0, 6) };
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
  const result = evaluateRoutine(payload);
  summaryText.textContent = result.summary;
  coachQuote.textContent =
    result.score >= 70
      ? '“Vas por buen camino. No busques perfección: busca constancia amable con tu ritmo real.”'
      : '“Empieza pequeño y estable. Tu bienestar mejora más por repetición que por intensidad.”';

  scoreNumber.textContent = String(result.score);
  scoreBar.style.width = `${result.score}%`;
  wellnessLevel.textContent = result.level;

  renderTips(result.tips);
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
    routinePeriod: String(data.get('routinePeriod') || 'diaria'),
    routineText: String(data.get('routineText') || '').trim(),
    savedAt: new Date().toISOString()
  };
  save(payload);
  renderResult(payload);
});

const saved = loadSaved();
if (saved) {
  renderResult(saved);
} else {
  renderResult({
    routinePeriod: 'diaria',
    routineText: 'Trabajo en oficina y paso bastante tiempo sentado; quiero mejorar descanso y energía.'
  });
}
