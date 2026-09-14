// js/utils/dom.js
// ────────────────────────────────────────────
// Utilidades DOM mínimas.
// ────────────────────────────────────────────

/**
 * Atajo para document.querySelector.
 * @param {string} selector - Selector CSS.
 * @param {Element} [parent=document] - Contexto de búsqueda.
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Atajo para document.querySelectorAll (devuelve Array).
 * @param {string} selector
 * @param {Element} [parent=document]
 * @returns {Element[]}
 */
export function $$(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
