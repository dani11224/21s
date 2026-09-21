// js/animations/woodstock.js
// ────────────────────────────────────────────
// Animaciones de Woodstock (Emilio).
//
// 1. Aparece descansando sobre el tejado de la casita roja.
// 2. Al salir Snoopy, Woodstock despierta con un saltito alegre,
//    enciende su aleteo y vuela con su característico recorrido
//    ondulante estilo cómic hacia el centro de la escena.
// 3. Cuando la flor florece, revolotea alegremente sobre ella.
// ────────────────────────────────────────────

import { animate } from 'https://esm.sh/animejs';
import { els } from '../scene.js';

let hoverLoop = null;

/**
 * Posiciona a Woodstock exactamente sobre la cumbrera del techo
 * de la casita de manera reactiva a cualquier resolución.
 */
export function alignWoodstockToRoof() {
  if (!els.doghouse || !els.woodstock) return;

  const dh = els.doghouse.getBoundingClientRect();
  if (dh.width === 0) return;

  // La cumbrera del tejado se ubica en ~62% del ancho y ~8% de la altura
  const ridgeX = dh.left + dh.width * 0.60;
  const ridgeY = dh.top + dh.height * 0.08;

  els.woodstock.style.position = 'fixed';
  els.woodstock.style.left = `${ridgeX}px`;
  els.woodstock.style.top = `${ridgeY}px`;
  els.woodstock.style.bottom = 'auto';
}

/**
 * Revela a Woodstock en el tejado durante la intro.
 */
export async function revealWoodstock() {
  alignWoodstockToRoof();

  if (!els.woodstock) return;

  await animate(els.woodstock, {
    opacity: [0, 1],
    scale: [0.6, 1],
    duration: 800,
    delay: 450,
    ease: 'outBack',
  });
}

/**
 * Woodstock despierta, bate sus alas y vuela hacia el centro
 * acompañando la caminata de Snoopy.
 */
export async function flyWoodstock() {
  if (!els.woodstock) return;

  // 1. Saltito de alerta en el tejado
  await animate(els.woodstock, {
    translateY: [0, -16, 0],
    rotate: [0, 8, -5, 0],
    duration: 400,
    ease: 'outQuad',
  });

  // 2. Activar animación de aleteo continuo
  els.woodstock.classList.add('woodstock--flapping', 'woodstock--flying');

  // Calculamos la distancia hasta colocarse justo arriba de donde brotará la flor
  const wsRect = els.woodstock.getBoundingClientRect();
  let targetX = window.innerWidth * 0.5 + 45;
  if (els.flower) {
    const fRect = els.flower.getBoundingClientRect();
    if (fRect.left > 0) {
      targetX = fRect.left + 20;
    }
  }
  const flowerTargetX = targetX - wsRect.left;
  const flowerTargetY = -40; // Se eleva en el aire sobre la flor

  // 3. Vuelo ondulante y juguetón (típico de Woodstock)
  await animate(els.woodstock, {
    translateX: [0, flowerTargetX * 0.4, flowerTargetX * 0.75, flowerTargetX],
    translateY: [0, -55, -25, flowerTargetY],
    rotate: [0, 15, -8, 5],
    duration: 2600,
    ease: 'inOutSine',
  });

  // 4. Se mantiene revoloteando suavemente en su lugar
  hoverWoodstock();

  console.log('🐥 Woodstock ha llegado volando junto a la flor');
}

/**
 * Revoloteo suave continuo en el aire sobre la flor.
 */
function hoverWoodstock() {
  if (!els.woodstock) return;

  hoverLoop = animate(els.woodstock, {
    translateY: '-=10',
    rotate: [-4, 4],
    duration: 650,
    loop: true,
    alternate: true,
    ease: 'inOutSine',
  });
}

/* ═══════════════════════════════════════════════════════
   INTERACCIÓN TÁCTIL: WOODSTOCK
   Al tocar o hacer clic sobre Woodstock, realiza un giro de 360°
   en el aire con trayectoria en forma de globo (loop-the-loop estilo cómic):
   sube acelerando hacia la derecha, hace la curva superior invertido,
   y baja planeando hacia la izquierda para regresar a su lugar.
   ═══════════════════════════════════════════════════════ */
let isSpinning = false;
let lastWoodstockTap = 0;

/**
 * Woodstock reacciona con un giro 360° en forma de globo aerodinámico.
 */
export function reactWoodstock() {
  if (!els.woodstock) return;

  const acrobatics = els.woodstock.querySelector('#woodstock-acrobatics') || els.woodstock;

  // 1. Desprender nota musical dorada al iniciar el ascenso
  createFloatingNote();

  // 2. Pirueta acrobática en forma de globo
  if (isSpinning) return;
  isSpinning = true;

  // Pausar el revoloteo suave durante el looping
  if (hoverLoop && typeof hoverLoop.pause === 'function') {
    hoverLoop.pause();
  }

  // Segunda nota musical en el punto más alto del bucle
  setTimeout(() => {
    if (isSpinning) createFloatingNote();
  }, 440);

  // Trayectoria orgánica de globo (Peanuts loop-the-loop):
  // 1. Sube volando hacia la derecha (X: 0 → +32, Y: 0 → -58, Rot: 0 → -85°)
  // 2. Cúspide del globo invertido en el aire (X: +10, Y: -98, Rot: -180°)
  // 3. Desciende en curva por la izquierda (X: -30, Y: -45, Rot: -290°)
  // 4. Se nivela suavemente de regreso en su posición (X: 0, Y: 0, Rot: -360°)
  const spinAnim = animate(acrobatics, {
    translateX: [0, 18, 32, 28, 10, -18, -30, -18, 0],
    translateY: [0, -26, -58, -88, -98, -80, -45, -14, 0],
    rotate: [0, -30, -85, -140, -180, -235, -290, -335, -360],
    duration: 960,
    ease: 'inOutSine',
  });

  spinAnim.then(() => {
    isSpinning = false;
    acrobatics.style.transform = '';
    // Reanudar el aleteo suave
    if (hoverLoop && typeof hoverLoop.play === 'function') {
      hoverLoop.play();
    }
  });
}

function createFloatingNote() {
  if (!els.woodstock) return;
  const note = document.createElement('div');
  note.className = 'floating-note';
  const notes = ['♪', '♫', '♬', '🎶', '✨'];
  note.textContent = notes[Math.floor(Math.random() * notes.length)];

  const rect = els.woodstock.getBoundingClientRect();
  const startX = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 20;
  const startY = rect.top;

  note.style.left = `${startX}px`;
  note.style.top = `${startY}px`;
  document.body.appendChild(note);

  const driftX = (Math.random() - 0.5) * 40;
  const rot = (Math.random() - 0.5) * 30;

  animate(note, {
    translateY: [0, -75 - Math.random() * 30],
    translateX: [0, driftX],
    rotate: [0, rot],
    scale: [0.6, 1.25, 0.9],
    opacity: [1, 1, 0],
    duration: 1300,
    ease: 'outQuad',
  }).then(() => {
    note.remove();
  });
}

/**
 * Inicializa los listeners táctiles y de clic para Woodstock.
 */
export function setupWoodstockInteraction() {
  if (!els.woodstock) return;

  const trigger = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastWoodstockTap < 160) return; // Evitar doble disparo touch+click
    lastWoodstockTap = now;
    reactWoodstock();
  };

  els.woodstock.addEventListener('click', trigger);
  els.woodstock.addEventListener('touchstart', trigger, { passive: true });
}
