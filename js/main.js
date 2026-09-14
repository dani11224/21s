// js/main.js
// ────────────────────────────────────────────
// Punto de entrada principal.
//
// Responsabilidades:
//  1. Preparar la escena (refs DOM).
//  2. Ejecutar la secuencia de animaciones en orden:
//     - Intro (cielo y suelo)
//     - Entrada de Snoopy
//     - Florecimiento 3D de la flor amarilla
//     - Revelación del mensaje final
// ────────────────────────────────────────────

import { prepareScene } from './scene.js';
import { playIntro } from './animations/intro.js';
import { enterSnoopy } from './animations/snoopy.js';
import { showFlower, showMessage } from './animations/flower.js';

/**
 * Función principal de arranque.
 */
async function init() {
  console.log('🚀 Iniciando aplicación...');

  // 1. Preparar la escena
  prepareScene();

  // 2. Intro — fade-in del cielo y suelo
  console.log('▶ Iniciando intro...');
  await playIntro();

  // 3. Snoopy entra desde la izquierda
  console.log('▶ Iniciando entrada de Snoopy...');
  await enterSnoopy();

  // 4. La flor brota y florece con su efecto 3D
  console.log('▶ Iniciando aparición de la flor...');
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
