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
 * Muestra el sobre cayendo con el viento como un pétalo,
 * reposando junto a la casita de Snoopy y permitiendo abrir la carta centrada en pantalla.
 */
export async function showMessage() {
  const envelope = els.envelope || document.getElementById('envelope-wrapper');
  const envelopeShadow = envelope ? envelope.querySelector('.envelope-shadow') : null;
  const envelopeHint = document.getElementById('envelope-hint');
  const letterModal = document.getElementById('letter-modal');
  const letterCloseBtn = document.getElementById('letter-close-btn');
  const letterBackdrop = document.getElementById('letter-backdrop');

  if (!envelope) return;

  // 1. Animación del sobre cayendo con el viento como un pétalo
  envelope.style.opacity = '1';

  // Usamos Web Animations API para una trayectoria fluida con viento y oscilación
  // Importante: rotateY debe terminar en múltiplo de 360° (720°) para quedar de frente y no espejado
  const fallAnimation = envelope.animate(
    [
      {
        transform: 'translate3d(15px, -85vh, 0) rotate(-28deg) rotateY(0deg) scale(0.8)',
        opacity: 0,
      },
      {
        opacity: 0.95,
        offset: 0.12,
      },
      {
        transform: 'translate3d(45px, -50vh, 0) rotate(18deg) rotateY(180deg) scale(0.9)',
        offset: 0.38,
      },
      {
        transform: 'translate3d(-30px, -22vh, 0) rotate(-16deg) rotateY(360deg) scale(0.96)',
        offset: 0.68,
      },
      {
        transform: 'translate3d(12px, -4vh, 0) rotate(8deg) rotateY(540deg) scale(1)',
        offset: 0.88,
      },
      {
        transform: 'translate3d(0, 0, 0) rotate(-10deg) rotateY(720deg) scale(1)',
        opacity: 1,
      },
    ],
    {
      duration: 3800,
      easing: 'cubic-bezier(0.33, 0.05, 0.28, 1)',
      fill: 'forwards',
    }
  );

  await new Promise(resolve => {
    fallAnimation.onfinish = resolve;
  });

  // Liberamos el fill forwards del WAAPI y mantenemos el transform de reposo
  fallAnimation.cancel();
  envelope.style.transform = 'rotate(-10deg)';

  // Micro-rebote de aterrizaje al recostarse contra la casita de Snoopy
  await animate(envelope, {
    transform: ['rotate(-10deg) translateY(-8px)', 'rotate(-10deg) translateY(0px)'],
    duration: 400,
    ease: 'outBounce',
  });
  envelope.style.transform = 'rotate(-10deg)';

  // Aparece la sombra de contacto en el pasto
  if (envelopeShadow) {
    envelopeShadow.style.opacity = '0.7';
  }

  // Aparece el indicador táctil invitando a abrir la carta
  if (envelopeHint) {
    envelopeHint.style.opacity = '1';
  }

  const hintTextEl = document.querySelector('.envelope__hint .hint-text');

  // 2. Funciones para abrir y cerrar la carta centrada en pantalla
  const openLetter = () => {
    // Abrir solapa del sobre en la casita
    envelope.classList.add('is-open');

    // Desplegar la carta centrada en pantalla con fondo atenuado
    if (letterModal) {
      letterModal.classList.add('is-active');
      letterModal.setAttribute('aria-hidden', 'false');
    }

    if (hintTextEl) {
      hintTextEl.textContent = 'Toca para guardar la carta';
    }

    // Celebración con lluvia de pétalos dorados
    burstPetals();
  };

  const closeLetter = () => {
    if (letterModal) {
      letterModal.classList.remove('is-active');
      letterModal.setAttribute('aria-hidden', 'true');
    }
    if (hintTextEl) {
      hintTextEl.textContent = 'Toca para abrir la carta';
    }
    // Cerrar solapa del sobre
    setTimeout(() => {
      envelope.classList.remove('is-open');
    }, 250);
  };

  // 3. Listeners de interacción
  envelope.addEventListener('click', openLetter);

  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLetter();
    }
  });

  if (letterCloseBtn) {
    letterCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLetter();
    });
  }

  if (letterBackdrop) {
    letterBackdrop.addEventListener('click', closeLetter);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && letterModal && letterModal.classList.contains('is-active')) {
      closeLetter();
    }
  });

  // 4. Revelar botón de "Volver a ver" una vez completada la experiencia
  const replayBtn = document.getElementById('replay-btn');
  if (replayBtn) {
    replayBtn.classList.add('is-visible');
    replayBtn.addEventListener('click', () => {
      const overlay = document.querySelector('.fade-overlay');
      if (overlay) overlay.classList.add('fade-overlay--active');
      setTimeout(() => {
        window.location.reload();
      }, 350);
    });
  }

  console.log('💌 Sobre aterrizado en la casita de Snoopy. Listo para abrir la carta centrada.');
}

/* ═══════════════════════════════════════════════════════
   INTERACCIÓN TÁCTIL: RAMO DE FLORES
   Al tocar o hacer clic sobre el ramo de flores, este hace un
   suave balanceo orgánico con la brisa y desprende una ráfaga
   de pétalos y destellos mágicos que flotan hacia arriba.
   ═══════════════════════════════════════════════════════ */
let lastFlowerTap = 0;
let isFlowerSwaying = false;

/**
 * Inicializa la interactividad táctil para el ramo de flores.
 */
export function setupFlowerInteraction() {
  const flowerContainer = els.flower || document.getElementById('flower-container');
  if (!flowerContainer) return;

  const trigger = (e) => {
    // Si hicieron clic en el modal de la carta o en el botón de replay, ignorar
    if (e.target.closest('#letter-modal') || e.target.closest('#replay-btn')) return;

    const now = Date.now();
    if (now - lastFlowerTap < 180) return;
    lastFlowerTap = now;

    // 1. Balanceo elástico del ramo
    if (!isFlowerSwaying) {
      isFlowerSwaying = true;
      flowerContainer.classList.add('flower-container--sway');
      setTimeout(() => {
        flowerContainer.classList.remove('flower-container--sway');
        isFlowerSwaying = false;
      }, 820);
    }

    // 2. Ráfaga de pétalos y destellos mágicos desde la copa del ramo
    burstPetalsFromBouquet();
  };

  flowerContainer.addEventListener('click', trigger);
  flowerContainer.addEventListener('touchstart', trigger, { passive: true });
}

function burstPetalsFromBouquet() {
  const flowerContainer = els.flower || document.getElementById('flower-container');
  if (!flowerContainer) return;

  const rect = flowerContainer.getBoundingClientRect();
  const centerX = rect.left + rect.width * 0.5;
  const centerY = rect.top + rect.height * 0.25; // Copa de las flores

  const symbols = ['🌸', '✨', '💮', '💖', '⭐', '🌻'];

  for (let i = 0; i < 7; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-heart';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.fontSize = `${1.1 + Math.random() * 0.9}rem`;
    particle.style.left = `${centerX + (Math.random() - 0.5) * 45}px`;
    particle.style.top = `${centerY + (Math.random() - 0.5) * 35}px`;
    document.body.appendChild(particle);

    const driftX = (Math.random() - 0.5) * 70;
    const driftY = -70 - Math.random() * 55;
    const rot = (Math.random() - 0.5) * 70;

    animate(particle, {
      translateX: [0, driftX],
      translateY: [0, driftY],
      scale: [0.5, 1.3, 0.8],
      opacity: [1, 1, 0],
      rotate: [0, rot],
      duration: 1200 + Math.random() * 400,
      ease: 'outQuad',
    }).then(() => {
      particle.remove();
    });
  }
}
