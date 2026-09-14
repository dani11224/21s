// js/scene.js
// ────────────────────────────────────────────
// Configuración y estado de la escena.
//
// Responsabilidades:
//  - Mantener referencias a los elementos principales.
//  - Guardar el estado actual de la escena.
//  - Preparar/resetear elementos antes de las animaciones.
//
// No poner aquí lógica de Anime.js.
// ────────────────────────────────────────────

import { $ } from './utils/dom.js';

/**
 * Estado de la escena.
 * Se irá enriqueciendo conforme se agreguen fases.
 */
export const state = {
  phase: 'idle',   // 'idle' | 'intro' | 'walking' | 'giving' | 'done'
  ready: false,
};

/**
 * Referencias a los elementos del DOM.
 * Se rellenan en `prepareScene()`.
 */
export const els = {
  scene:     null,
  bg:        null,
  ground:    null,
  snoopy:    null,   // Contenedor — se anima como unidad completa
  flower:    null,   // Contenedor de la flor
  message:   null,
};

/**
 * Inicializa las referencias DOM.
 * Debe llamarse una sola vez al arrancar.
 *
 * Nota: ya no necesitamos inyectar SVGs. Snoopy es un asset
 * visual completo (imagen o placeholder) y la flor está
 * construida con HTML/CSS directamente en el HTML.
 */
export function prepareScene() {
  els.scene   = $('#scene');
  els.bg      = $('#scene-bg');
  els.ground  = $('#ground');
  els.snoopy  = $('#snoopy-container');
  els.flower  = $('#flower-container');
  els.message = $('#message');

  state.ready = true;
  state.phase = 'intro';

  console.log('🎬 Escena preparada. Elementos cargados.');
}
