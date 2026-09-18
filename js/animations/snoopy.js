// js/animations/snoopy.js
// ────────────────────────────────────────────
// Animaciones de Snoopy.
//
// Snoopy se anima mediante una técnica de dos capas:
//   1. Capa externa (#snoopy-container):
//      Maneja la posición y desplazamiento general por la escena (translateX).
//   2. Capa interna (#snoopy-img):
//      Maneja la expresión física del personaje:
//      - Rebote rítmico de pasitos (translateY)
//      - Bamboleo tierno al caminar (rotate)
//      - Frenado con compresión elástica (squash & stretch con scaleX / scaleY)
//      - Gesto de entrega e inclinación al florecer la flor
//
// 🎓 Conceptos de Anime.js que aprendemos aquí:
//    - Animaciones paralelas sincronizadas (Promise.all)
//    - loop y alternate para ciclos continuos (pasitos)
//    - Keyframes en array para efectos elásticos (squash & stretch)
//    - Curvas ease dinámicas ('outQuad', 'outBack')
// ────────────────────────────────────────────

import { animate } from 'https://esm.sh/animejs';
import { els } from '../scene.js';
import { flyWoodstock } from './woodstock.js';

/**
 * Calcula la distancia horizontal exacta desde la puerta de la casita roja
 * hasta la posición final de Snoopy en el centro.
 */
function getDoghouseOffset() {
  if (!els.doghouse || !els.snoopy) {
    return -window.innerWidth * 0.45;
  }
  const door = els.doghouse.querySelector('.doghouse-door') || els.doghouse;
  const doorRect = door.getBoundingClientRect();
  const snoopyRect = els.snoopy.getBoundingClientRect();

  // Alineamos a Snoopy con el centro de la puerta de la casita
  const doorCenterX = doorRect.left + doorRect.width * 0.45;
  const snoopyCenterX = snoopyRect.left + snoopyRect.width * 0.5;

  return doorCenterX - snoopyCenterX;
}

/**
 * Snoopy sale de su casita roja y camina hacia el centro de la escena.
 *
 * 🎓 Secuencia cinematográfica:
 *    1. Inicia en el umbral oscuro de la puerta de su casita.
 *    2. Se asoma y da su primer paso hacia afuera, revelando su sombra en el pasto.
 *    3. Pausa tierna de asombro.
 *    4. Recorre alegremente el camino al centro con pasitos rítmicos.
 *    5. Frena con amortiguación elástica (Squash & Stretch).
 */
export async function enterSnoopy() {
  // Calculamos la posición de inicio en la puerta de la casita
  const startOffset = getDoghouseOffset();

  // Posicionamos a Snoopy en la entrada de la casita
  els.snoopy.style.transform = `translateX(${startOffset}px)`;
  els.snoopy.style.opacity = '1';

  if (els.snoopyShadow) {
    els.snoopyShadow.style.opacity = '0';
  }

  // 1. Fase de salida: Snoopy se asoma desde el umbral oscuro de la casita
  const exitStep = 36; // Píxeles que avanza al salir de la puerta
  const exitPromises = [];

  if (els.snoopyImg) {
    exitPromises.push(
      animate(els.snoopyImg, {
        opacity: [0, 1],
        scale: [0.65, 1],
        translateY: [6, 0],
        duration: 650,
        ease: 'outQuad',
      })
    );
  }

  exitPromises.push(
    animate(els.snoopy, {
      translateX: [startOffset, startOffset + exitStep],
      duration: 650,
      ease: 'outQuad',
    })
  );

  if (els.snoopyShadow) {
    exitPromises.push(
      animate(els.snoopyShadow, {
        opacity: [0, 0.72],
        scaleX: [0.35, 1],
        scaleY: [0.35, 1],
        duration: 650,
        ease: 'outQuad',
      })
    );
  }

  await Promise.all(exitPromises);

  // Pequeña pausa tierna (mira el campo y respira el atardecer)
  await new Promise(resolve => setTimeout(resolve, 320));

  // 2. Fase de caminata: Pasitos rítmicos desde la casita hasta el centro
  // Woodstock despega de la casita y vuela acompañando a Snoopy
  flyWoodstock();

  const walkDuration = 2400; // 2.4 segundos de caminata fluida
  let walkingLoop = null;
  let shadowLoop = null;

  if (els.snoopyImg) {
    walkingLoop = animate(els.snoopyImg, {
      translateY: [0, -12], // Pequeño salto en cada paso
      rotate: [-3, 3],       // Bamboleo lateral
      duration: 220,         // Ritmo de pasitos
      loop: true,
      alternate: true,       // Va y viene entre -3 y +3 grados
      ease: 'inOutSine',
    });
  }

  // Sombra dinámica durante la caminata
  if (els.snoopyShadow) {
    shadowLoop = animate(els.snoopyShadow, {
      scaleX: [1, 0.75],
      scaleY: [1, 0.7],
      opacity: [0.72, 0.38],
      duration: 220,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    });
  }

  // Desplazamiento horizontal hasta su posición final
  await animate(els.snoopy, {
    translateX: [startOffset + exitStep, 0],
    duration: walkDuration,
    ease: 'outQuad',
  });

  // Detenemos los bucles de caminar al frenar
  if (walkingLoop && typeof walkingLoop.pause === 'function') {
    walkingLoop.pause();
  }
  if (shadowLoop && typeof shadowLoop.pause === 'function') {
    shadowLoop.pause();
  }

  // 3. Efecto de frenado elástico (Squash & Stretch)
  await stopSnoopy();

  console.log('🐕 Snoopy ha salido de su casita y llegado al centro');
}

/**
 * Snoopy frena y amortigua su llegada con un "squash & stretch".
 * Sombra y cuerpo reaccionan en sincronía física con el impacto contra el suelo.
 */
export async function stopSnoopy() {
  const promises = [];

  if (els.snoopyImg) {
    promises.push(
      animate(els.snoopyImg, {
        translateY: 0,
        rotate: 0,
        scaleY: [1, 0.88, 1.06, 1], // Se achata y rebota
        scaleX: [1, 1.08, 0.96, 1], // Se ensancha proporcionalmente
        duration: 500,
        ease: 'outBack',
      })
    );
  }

  if (els.snoopyShadow) {
    // La sombra se expande en el suelo al recibir el peso del cuerpo
    promises.push(
      animate(els.snoopyShadow, {
        scaleX: [1, 1.25, 0.92, 1],
        scaleY: [1, 1.2, 0.95, 1],
        opacity: [0.7, 0.85, 0.65, 0.7],
        duration: 500,
        ease: 'outBack',
      })
    );
  }

  await Promise.all(promises);
}

/**
 * Snoopy hace un gesto de entrega / presentación hacia la flor.
 * Un saltito alegre con respuesta inmediata en su sombra de suelo.
 */
export async function presentFlower() {
  const promises = [];

  if (els.snoopyImg) {
    promises.push(
      animate(els.snoopyImg, {
        translateY: [0, -10, 0],
        rotate: [0, 4, 0],
        duration: 700,
        ease: 'outBack',
      })
    );
  }

  if (els.snoopyShadow) {
    promises.push(
      animate(els.snoopyShadow, {
        scaleX: [1, 0.78, 1],
        scaleY: [1, 0.72, 1],
        opacity: [0.7, 0.42, 0.7],
        duration: 700,
        ease: 'outBack',
      })
    );
  }

  await Promise.all(promises);
  console.log('🐕 Snoopy presenta la flor amarilla');
}
