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
import { burstPetals } from './petals.js';

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
    // Si ya existía un ramo previo lo removemos sin borrar la sombra del suelo
    const prevFlowers = els.flower.querySelector('.flowers') || els.flower.querySelector('.flower');
    if (prevFlowers) prevFlowers.remove();

    const clone = template.content.cloneNode(true);
    els.flower.appendChild(clone);
    els.flower.style.opacity = '1';
  }

  // Animación de la sombra en el suelo al pie del tallo
  if (els.flowerShadow) {
    animate(els.flowerShadow, {
      scaleX: [0.2, 1],
      scaleY: [0.2, 1],
      opacity: [0, 0.75],
      duration: 1600,
      ease: 'outQuad',
    });
  }

  // Oleada festiva de pétalos dorados al abrirse la flor
  setTimeout(() => {
    burstPetals();
  }, 1200);

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
 * Muestra el sobre con la carta final tras florecer.
 * 1. El sobre entra flotando suavemente.
 * 2. La solapa superior se abre en 3D.
 * 3. La carta con el mensaje se desliza elegantemente hacia arriba.
 * 4. Habilita interactividad para que el usuario pueda abrirla o guardarla al tocarla.
 */
export async function showMessage() {
  const envelope = els.envelope || document.getElementById('envelope-wrapper');
  if (!envelope) return;

  // 1. Entrada suave del sobre flotante
  await animate(envelope, {
    opacity: [0, 1],
    translateY: ['25px', '0px'],
    duration: 1100,
    ease: 'outQuad',
  });

  // 2. Breve pausa de anticipación
  await new Promise(resolve => setTimeout(resolve, 350));

  // 3. Abrir la solapa y deslizar la carta hacia arriba
  envelope.classList.add('is-open');

  // Lluvia festiva de pétalos dorados al revelarse la carta
  burstPetals();

  // 4. Configurar interactividad (toque/clic para guardar o volver a abrir la carta)
  envelope.addEventListener('click', () => {
    envelope.classList.toggle('is-open');
  });

  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      envelope.classList.toggle('is-open');
    }
  });

  console.log('💌 Sobre abierto y carta revelada');
}
