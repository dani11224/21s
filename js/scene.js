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
  scene:        null,
  bg:           null,
  ground:       null,
  doghouse:     null,   // Casita roja de Snoopy
  woodstock:    null,   // Woodstock (Emilio)
  petals:       null,   // Contenedor de lluvia de pétalos
  snoopy:       null,   // Contenedor — se anima horizontalmente
  snoopyImg:    null,   // Imagen interna — para pasitos, rebote e inclinación
  snoopyShadow: null,   // Sombra de contacto de Snoopy en el suelo
  flower:       null,   // Contenedor de la flor
  flowerShadow: null,   // Sombra de contacto de la flor en el suelo
  message:      null,
  envelope:     null,
  fireflies:    null,   // Contenedor de luciérnagas doradas
};

/**
 * Inicializa las referencias DOM.
 * Debe llamarse una sola vez al arrancar.
 */
export function prepareScene() {
  els.scene        = $('#scene');
  els.bg           = $('#scene-bg');
  els.ground       = $('#ground');
  els.doghouse     = $('#doghouse');
  els.woodstock    = $('#woodstock-container');
  els.petals       = $('#petals-container');
  els.fireflies    = $('#fireflies-container');
  els.snoopy       = $('#snoopy-container');
  els.snoopyImg    = $('#snoopy-img');
  els.snoopyShadow = $('#snoopy-shadow');
  els.flower       = $('#flower-container');
  els.flowerShadow = $('#flower-shadow');
  els.envelope     = $('#envelope-wrapper');
  els.message      = $('#envelope-wrapper');

  state.ready = true;
  state.phase = 'intro';

  console.log('🎬 Escena preparada. Elementos cargados.');
}
