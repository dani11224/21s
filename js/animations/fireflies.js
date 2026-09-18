// js/animations/fireflies.js
// ────────────────────────────────────────────
// Sistema de luciérnagas y chispas doradas flotantes.
//
// Genera partículas luminosas cálidas que flotan orgánicamente
// por la escena crepuscular con trayectorias curvas y parpadeo suave,
// aportando tridimensionalidad y volumen atmosférico vivo.
// ────────────────────────────────────────────

import { els } from '../scene.js';

let activeFireflies = [];

/**
 * Crea una luciérnaga individual con propiedades aleatorias y la anima.
 */
function createFirefly(container, index, total) {
  const el = document.createElement('div');
  el.className = 'firefly';

  // Dimensiones variables para profundidad de campo
  const size = 5 + Math.random() * 3.8; // 5px a 8.8px
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;

  // Distribución en la zona atmosférica media y baja
  const startX = 3 + Math.random() * 94; // 3% a 97% de la anchura
  const startY = 25 + Math.random() * 62; // 25% a 87% de la altura
  el.style.left = `${startX}%`;
  el.style.top = `${startY}%`;
  el.style.opacity = '0.75';

  container.appendChild(el);

  // Parámetros de vuelo y deriva
  const duration = 7500 + Math.random() * 6500; // 7.5s a 14s por ciclo
  const delay = Math.random() * 1500;
  const driftX1 = (Math.random() - 0.5) * 75;
  const driftY1 = -18 - Math.random() * 35;
  const driftX2 = driftX1 + (Math.random() - 0.5) * 80;
  const driftY2 = driftY1 + (Math.random() - 0.5) * 45;
  const driftX3 = (Math.random() - 0.5) * 50;
  const driftY3 = -8 - Math.random() * 25;

  // Animación continua de flotación y balanceo
  const flyAnimation = el.animate(
    [
      { transform: 'translate3d(0, 0, 0) scale(0.85)' },
      { transform: `translate3d(${driftX1}px, ${driftY1}px, 0) scale(1.2)`, offset: 0.35 },
      { transform: `translate3d(${driftX2}px, ${driftY2}px, 0) scale(0.95)`, offset: 0.7 },
      { transform: `translate3d(${driftX3}px, ${driftY3}px, 0) scale(1.1)`, offset: 0.9 },
      { transform: 'translate3d(0, 0, 0) scale(0.85)' },
    ],
    {
      duration,
      delay,
      iterations: Infinity,
      easing: 'ease-in-out',
    }
  );

  // Animación de pulso luminoso orgánico (titileo cálido constante)
  const glowDuration = 1800 + Math.random() * 2200; // 1.8s a 4s
  const maxGlow = 0.9 + Math.random() * 0.1;
  const minGlow = 0.38 + Math.random() * 0.2;

  const glowAnimation = el.animate(
    [
      { opacity: minGlow },
      { opacity: maxGlow, offset: 0.45 },
      { opacity: maxGlow * 0.8, offset: 0.65 },
      { opacity: minGlow },
    ],
    {
      duration: glowDuration,
      delay: delay * 0.4,
      iterations: Infinity,
      easing: 'ease-in-out',
    }
  );

  return { el, flyAnimation, glowAnimation };
}

/**
 * Inicia el enjambre de luciérnagas doradas.
 */
export function startFireflies(count = 28) {
  const container = els.fireflies || document.getElementById('fireflies-container');
  if (!container) return;

  stopFireflies();

  for (let i = 0; i < count; i++) {
    const firefly = createFirefly(container, i, count);
    activeFireflies.push(firefly);
  }

  console.log(`✨ ${count} luciérnagas doradas iluminando el atardecer.`);
}

/**
 * Detiene y limpia las luciérnagas.
 */
export function stopFireflies() {
  activeFireflies.forEach(({ el, flyAnimation, glowAnimation }) => {
    try {
      flyAnimation.cancel();
      glowAnimation.cancel();
      el.remove();
    } catch (e) {
      // Ignorar si ya fue removido
    }
  });
  activeFireflies = [];
}
