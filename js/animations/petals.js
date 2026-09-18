// js/animations/petals.js
// ────────────────────────────────────────────
// Sistema de lluvia de pétalos amarillos flotantes.
//
// Crea una brisa constante de pétalos dorados en diferentes planos,
// con oscilación de viento y rotación orgánica 3D.
// Se intensifica festivamente al florecer la flor.
// ────────────────────────────────────────────

import { els } from '../scene.js';

let isRaining = false;
let petalInterval = null;

/**
 * Crea un pétalo con propiedades aleatorias y lo anima al caer.
 */
function createPetal(isBurst = false) {
  if (!els.petals) return;

  const petal = document.createElement('div');
  petal.className = 'falling-petal';

  // Dimensiones variadas para sensación de profundidad
  const size = isBurst ? 12 + Math.random() * 14 : 10 + Math.random() * 12;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;

  // Posición horizontal inicial
  const startX = Math.random() * 100; // en vw
  petal.style.left = `${startX}vw`;

  // Plano de profundidad aleatorio (algunos por delante, otros por detrás)
  petal.style.zIndex = Math.random() > 0.4 ? '8' : '14';

  // Opacidad sutil
  petal.style.opacity = `${0.65 + Math.random() * 0.35}`;

  els.petals.appendChild(petal);

  // Animación nativa fluida con Web Animations API
  const duration = isBurst
    ? 4500 + Math.random() * 3500
    : 6000 + Math.random() * 5000;

  const swayDistance = 40 + Math.random() * 60; // Desplazamiento lateral de brisa
  const initialRotate = Math.random() * 360;
  const finalRotate = initialRotate + (Math.random() > 0.5 ? 360 : -360);

  const animation = petal.animate(
    [
      {
        transform: `translate3d(0, -30px, 0) rotate(${initialRotate}deg) rotateY(0deg)`,
        opacity: 0,
      },
      {
        opacity: 0.9,
        offset: 0.1,
      },
      {
        transform: `translate3d(${swayDistance * 0.8}px, 35vh, 0) rotate(${initialRotate + 120}deg) rotateY(180deg)`,
        offset: 0.4,
      },
      {
        transform: `translate3d(-${swayDistance * 0.4}px, 70vh, 0) rotate(${initialRotate + 240}deg) rotateY(360deg)`,
        offset: 0.75,
      },
      {
        transform: `translate3d(${swayDistance}px, 108vh, 0) rotate(${finalRotate}deg) rotateY(540deg)`,
        opacity: 0.2,
      },
    ],
    {
      duration: duration,
      easing: 'ease-in-out',
      fill: 'forwards',
    }
  );

  animation.onfinish = () => {
    petal.remove();
  };
}

/**
 * Inicia la brisa suave continua de pétalos amarillos.
 */
export function startPetalsRain() {
  if (isRaining || !els.petals) return;
  isRaining = true;

  // Creamos unos primeros pétalos de inmediato
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      createPetal(false);
    }, i * 350);
  }

  // Bucle continuo a ritmo suave
  petalInterval = setInterval(() => {
    if (document.hidden) return;
    createPetal(false);
  }, 450);
}

/**
 * Lanza una oleada mágica de pétalos cuando la flor brota.
 */
export function burstPetals() {
  if (!els.petals) return;

  const burstCount = 18;
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => {
      createPetal(true);
    }, i * 120);
  }
}

/**
 * Detiene la lluvia de pétalos si se requiere.
 */
export function stopPetalsRain() {
  isRaining = false;
  if (petalInterval) {
    clearInterval(petalInterval);
    petalInterval = null;
  }
}
