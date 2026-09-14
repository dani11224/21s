# 21 de Septiembre 🌻

Pequeña experiencia interactiva animada para el 21 de septiembre, inspirada en la tradición de regalar flores amarillas.

Un Snoopy animado entra en escena y entrega una flor amarilla al usuario.

## Tecnologías

- HTML5 / CSS3 / JavaScript vanilla
- [Anime.js v4](https://animejs.com/) — cargado vía CDN con ES Modules
- Sin frameworks, sin bundlers, sin Node.js como dependencia

## Cómo verlo localmente

Los ES Modules requieren un servidor HTTP. Opciones rápidas:

```bash
# Python 3
python -m http.server 8000

# npx (no necesita instalar nada)
npx -y serve .

# VS Code → Live Server extension
```

Luego abre `http://localhost:8000` en el navegador.

## Estructura del proyecto

```
/
├── index.html              → Estructura HTML de la escena
├── css/
│   └── style.css           → Layout, estilos, estados iniciales
├── js/
│   ├── main.js             → Punto de entrada, orquestación
│   ├── scene.js            → Estado y preparación de la escena
│   ├── animations/
│   │   ├── intro.js        → Aparición del fondo y suelo
│   │   ├── snoopy.js       → Animaciones de Snoopy (contenedor completo)
│   │   └── flower.js       → Animaciones de la flor
│   └── utils/
│       └── dom.js          → Utilidades DOM (selectores)
├── assets/
│   └── images/
│       └── snoopy.png      → Asset visual de Snoopy (se proporciona manualmente)
└── README.md
```

## Assets

### Snoopy
Snoopy es un **asset visual externo**. Colocar la imagen en `assets/images/snoopy.png`.

Mientras no exista, se usa un placeholder CSS. Para activar la imagen real:
1. Colocar `snoopy.png` en `assets/images/`
2. En `index.html`, descomentar la línea `<img>` y eliminar el placeholder

Las animaciones funcionan igual con el placeholder o con la imagen final.

### Flor
La flor está construida con HTML/CSS puro y se anima de forma independiente con Anime.js.

## Despliegue

Preparado para **GitHub Pages** con rutas relativas (`./`).

## Licencia

Proyecto personal / educativo.
