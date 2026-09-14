// js/animations/snoopy.js
// ────────────────────────────────────────────
// Animaciones de Snoopy.
//
// Snoopy se trata como un ASSET VISUAL COMPLETO.
// No se animan partes individuales (brazo, piernas, cabeza).
// Se anima el contenedor entero para darle vida mediante:
//   - movimiento horizontal (translateX)
//   - movimiento vertical sutil (translateY)
//   - escala (scale)
//   - rotación sutil (rotate)
//   - opacidad (opacity)
//
// Esto funciona igual con el placeholder temporal o con
// la imagen definitiva de Snoopy — no hay que cambiar nada.
//
// 🎓 Conceptos de Anime.js que aprendemos aquí:
//    - translateX con valores string ('vw')  → movimiento responsive
//    - ease 'outQuad'                        → desaceleración natural
// ────────────────────────────────────────────

import { animate } from 'https://esm.sh/animejs';
import { els } from '../scene.js';

/**
 * Snoopy aparece y entra desde la izquierda.
 *
 * 🎓 translateX con unidades:
 *    Anime.js v4 acepta strings con unidades CSS.
 *    '-120vw' → empieza fuera de pantalla a la izquierda.
 *    '0vw'   → llega a su posición natural (definida por CSS).
 *    Esto hace la animación responsive automáticamente.
 *
 * 🎓 opacity con array [from, to]:
 *    [0, 1] indica: empieza en 0, termina en 1.
 */
export async function enterSnoopy() {
  await animate(els.snoopy, {
    opacity: [0, 1],
    translateX: ['-120vw', '0vw'],
    duration: 1800,
    ease: 'outQuad',
  });

  console.log('🐕 Snoopy ha entrado en la escena');
}

/**
 * Placeholder — Snoopy camina hacia la posición de entrega.
 *
 * 🎓 (futuro) Aquí aprenderemos:
 *    - translateX con valores calculados dinámicamente
 *    - translateY sutil para simular rebote al caminar
 *    - posiblemente createTimeline() para coordinar
 */
export async function walkSnoopy() {
  // TODO: implementar movimiento al centro
  console.log('🐕 walkSnoopy() — pendiente');
}

/**
 * Placeholder — Snoopy se detiene con un pequeño efecto.
 *
 * 🎓 (futuro) Aquí aprenderemos:
 *    - scale para un ligero "squash" al frenar
 *    - duration cortos para efectos rápidos
 */
export async function stopSnoopy() {
  // TODO: efecto de freno sutil
  console.log('🐕 stopSnoopy() — pendiente');
}

/**
 * Placeholder — Snoopy extiende/entrega la flor.
 *
 * 🎓 (futuro) Aquí aprenderemos:
 *    - rotate sutil para inclinar a Snoopy
 *    - coordinar con la aparición de la flor
 *    - posiblemente createTimeline()
 */
export async function giveFlower() {
  // TODO: inclinación + coordinación con la flor
  console.log('🌻 giveFlower() — pendiente');
}
