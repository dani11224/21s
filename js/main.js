// js/main.js
// ────────────────────────────────────────────
// Punto de entrada principal.
//
// Responsabilidades:
//  1. Preparar la escena (refs DOM).
//  2. Ejecutar la secuencia de animaciones en orden:
//     - Intro (cielo y suelo)
//     - Entrada de Snoopy con pasitos rítmicos y frenado elástico
//     - Florecimiento 3D de la flor amarilla + gesto de entrega
//     - Revelación del mensaje final
// ────────────────────────────────────────────

import { prepareScene } from './scene.js';
import { playIntro } from './animations/intro.js';
import { enterSnoopy, presentFlower } from './animations/snoopy.js';
import { showFlower, showMessage } from './animations/flower.js';
import { alignWoodstockToRoof } from './animations/woodstock.js';
import { startPetalsRain } from './animations/petals.js';

/**
 * Función principal de arranque.
 */
async function init() {
  console.log('🚀 Iniciando aplicación...');

  // 1. Preparar la escena y posicionar a Woodstock en el tejado
  prepareScene();
  alignWoodstockToRoof();
  window.addEventListener('resize', alignWoodstockToRoof);

  // 2. Intro — fade-in del cielo, suelo, casita y Woodstock
  console.log('▶ Iniciando intro...');
  await playIntro();

  // Iniciar la suave brisa de pétalos amarillos flotantes
  startPetalsRain();

  // 3. Snoopy sale de su casita roja mientras Woodstock emprende el vuelo
  console.log('▶ Iniciando salida de Snoopy y vuelo de Woodstock...');
  await enterSnoopy();

  // 4. La flor brota y florece con su efecto 3D, oleada de pétalos y gesto de entrega
  console.log('▶ Iniciando aparición de la flor...');
  presentFlower(); // Se dispara a la par que la flor empieza a brotar
  await showFlower();

  // 5. El mensaje final aparece
  console.log('▶ Mostrando mensaje final...');
  await showMessage();

  console.log('🎬 Secuencia completa.');
}

// Arrancar con catch para registrar cualquier error en consola
init().catch(err => {
  console.error('❌ Error en la secuencia:', err);
});
