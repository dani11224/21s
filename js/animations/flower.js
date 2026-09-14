// js/animations/flower.js
// ────────────────────────────────────────────
// Animaciones de la flor amarilla 3D.
//
// La flor es el diseño original 3D (DaniCodex style)
// con pétalos volumétricos en CSS 3D, centro texturizado,
// tallo que crece (0 -> 70vmin), hojas escalonadas
// y partículas luminosas flotantes.
// ────────────────────────────────────────────

import { animate } from 'https://esm.sh/animejs';
import { els } from '../scene.js';

/**
 * La flor brota y florece con su efecto 3D completo.
 *
 * Al clonar el template dentro de #flower-container,
 * todas las animaciones nativas de CSS (crecimiento del tallo,
 * salida de hojas, apertura de pétalos 3D y partículas de luz)
 * arrancan sincronizadas en este preciso instante.
 */
export async function showFlower() {
  const template = document.getElementById('flower-template');
  
  if (template && els.flower) {
    els.flower.innerHTML = '';
    const clone = template.content.cloneNode(true);
    els.flower.appendChild(clone);
    els.flower.style.opacity = '1';
  }

  // Efecto suave de entrada con Anime.js
  await animate(els.flower, {
    opacity: [0, 1],
    scale: [0.85, 1],
    duration: 600,
    ease: 'outQuad',
  });

  // Esperar a que el crecimiento y florecimiento terminen (~3.8s)
  await new Promise(resolve => setTimeout(resolve, 3800));

  console.log('🌻 Flor florecida con efecto 3D completo');
}

/**
 * Muestra el mensaje final tras florecer.
 * Usa Anime.js para una entrada elegante con translateY y opacity.
 */
export async function showMessage() {
  if (!els.message) return;

  await animate(els.message, {
    opacity: [0, 1],
    translateY: ['15px', '0px'],
    duration: 1500,
    ease: 'outQuad',
  });

  console.log('💌 Mensaje visible');
}
