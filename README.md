# Portafolio personal — Xavier Rojas

Portafolio web de una sola página para presentar el perfil profesional, las habilidades técnicas y proyectos de Xavier Rojas. La interfaz incluye soporte en español e inglés, tema claro/oscuro y vistas de detalle de proyectos con reproductores de video.

## Funcionalidades

- Secciones de presentación, habilidades, proyectos y contacto.
- Selector de idioma entre español e inglés, con detección automática del idioma del navegador.
- Tema claro y oscuro.
- Navegación entre secciones con desplazamiento y ajuste a pantalla.
- Tarjetas de proyectos con imágenes, tecnologías y características.
- Vista de detalle de cada proyecto con video incrustado y descripción.
- Reproductores compatibles con enlaces de YouTube y Google Drive.
- Diseño adaptable a pantallas móviles y de escritorio.

## Tecnologías

- React 19
- Vite 8
- Tailwind CSS 4
- i18next y react-i18next
- Lucide React

## Requisitos

- Node.js compatible con Vite 8.
- npm.

## Instalación y ejecución local

Clona el repositorio y entra en su directorio:

```bash
git clone https://github.com/JustKillu/Portfolio-JustKillu.git
cd Portfolio-JustKillu
```

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
npm ci
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir el portafolio en el navegador.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |
| `npm run deploy` | Compila y publica `dist/` con GitHub Pages mediante `gh-pages`. |

## Estructura del proyecto

```text
public/
  images/projects/       Imágenes de las tarjetas de proyectos
  locales/
    en/translation.json  Textos en inglés
    es/translation.json  Textos en español
src/
  components/            Componentes reutilizables
  sections/              Secciones Hero, Skills y Projects
  App.jsx                Diseño general, navegación y tema
  i18n.js                Configuración de internacionalización
  index.css              Estilos globales y animaciones
```

## Actualizar los proyectos

Los textos y videos de cada proyecto se encuentran en los archivos de traducción:

- `public/locales/es/translation.json`
- `public/locales/en/translation.json`

Cada elemento de `projects.items` contiene el título, la empresa, la descripción, la lista de características y el campo `videoUrl`. Para que aparezca el proyecto en ambos idiomas, mantén los elementos en el mismo orden en los dos archivos.

Las imágenes de las tarjetas se asignan por orden en `PROJECT_IMAGES`, en `src/sections/Projects.jsx`. Actualmente se esperan estos archivos:

```text
public/images/projects/ventas.png
public/images/projects/redes.png
```

Al añadir o reordenar proyectos, actualiza también `PROJECT_IMAGES` y `PROJECT_TAGS` en el mismo orden.

### Añadir un video

Pega el enlace de YouTube o Google Drive en el `videoUrl` del proyecto correspondiente en ambos archivos de traducción. Para videos de Drive, configura el archivo para que cualquier persona con el enlace pueda verlo; las políticas de la cuenta de Google pueden afectar la reproducción incrustada.

## Despliegue en GitHub Pages

El proyecto incluye un comando de despliegue con `gh-pages`. Ejecuta:

```bash
npm run deploy
```

La ruta base de producción está configurada como `/Portfolio/` en `vite.config.js`, coincidiendo con la URL publicada. Los recursos y traducciones usan esa ruta base automáticamente. Si cambia la URL del sitio, actualiza la ruta en `vite.config.js`. Después, configura GitHub Pages para servir la rama `gh-pages`.

## Personalización

- Perfil, presentación y enlace de LinkedIn: `src/sections/Hero.jsx`.
- Sección de contacto y navegación: `src/App.jsx`.
- Habilidades: `src/sections/Skills.jsx` y los textos de `public/locales/`.
- Colores, animaciones y estilos generales: `src/index.css` y clases Tailwind de los componentes.
