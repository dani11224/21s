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
   en el aire con batido de alas y emite notas musicales doradas.
   ═══════════════════════════════════════════════════════ */
let isSpinning = false;
let lastWoodstockTap = 0;

/**
 * Woodstock reacciona con una pirueta acrobática y notas musicales.
 */
export function reactWoodstock() {
  if (!els.woodstock) return;

  // 1. Desprender nota musical dorada
  createFloatingNote();

  // 2. Pirueta acrobática 360° si no está girando
  if (isSpinning) return;
  isSpinning = true;

  // Si el revoloteo suave está activo lo pausamos durante la pirueta
  if (hoverLoop && typeof hoverLoop.pause === 'function') {
    hoverLoop.pause();
  }

  // Pequeño impulso hacia arriba con giro completo de 360 grados
  const spinAnim = animate(els.woodstock, {
    rotate: [0, 360],
    translateY: ['-=22', 0],
    duration: 650,
    ease: 'inOutBack',
  });

  spinAnim.then(() => {
    isSpinning = false;
    // Reanudar el suave aleteo en el aire
    hoverWoodstock();
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
