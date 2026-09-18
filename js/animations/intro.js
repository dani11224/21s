// js/animations/intro.js
// ────────────────────────────────────────────
// Animaciones de introducción de la escena.
//
// 🎓 Conceptos de Anime.js que aprendemos aquí:
//    - animate(target, props)  → función principal
//    - opacity                 → aparecer/desaparecer
//    - duration                → duración en milisegundos
//    - ease                    → curva de aceleración
//    - delay                   → retrasar el inicio
//    - await animate()         → encadenar secuencialmente
//                                (v4 devuelve un thenable directo)
// ────────────────────────────────────────────

import { animate } from 'https://esm.sh/animejs';
import { els } from '../scene.js';
import { revealWoodstock } from './woodstock.js';

/**
 * Fase 1 — Aparece el fondo (cielo degradado).
 *
 * 🎓 animate() básico:
 *    Recibe un target (elemento DOM o selector CSS) y un objeto
 *    con las propiedades a animar. `opacity` pasa de 0 → 1.
 *    `ease: 'outQuad'` empieza rápido y frena suavemente.
 */
export async function fadeInBackground() {
  await animate(els.bg, {
    opacity: [0, 1],
    duration: 1200,
    ease: 'outQuad',
  });
}

/**
 * Fase 2 — Aparece el suelo y la casita con Woodstock posado en el tejado.
 */
export async function fadeInGround() {
  const promises = [
    animate(els.ground, {
      opacity: [0, 1],
      duration: 800,
      delay: 200,
      ease: 'outQuad',
    })
  ];

  if (els.doghouse) {
    promises.push(
      animate(els.doghouse, {
        opacity: [0, 1],
        scale: [0.92, 1],
        duration: 900,
        delay: 350,
        ease: 'outQuad',
      })
    );
  }

  if (els.woodstock) {
    promises.push(revealWoodstock());
  }

  await Promise.all(promises);
}

/**
 * Ejecuta toda la secuencia de intro.
 *
 * 🎓 Encadenamiento con await:
 *    En Anime.js v4, animate() devuelve un thenable.
 *    Usamos async/await para ejecutar animaciones en orden.
 */
export async function playIntro() {
  await fadeInBackground();
  await fadeInGround();
  console.log('✅ Intro completada');
}
