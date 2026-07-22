# VIA MUSIC — Sitio web

Web de una sola página, hecha con HTML, CSS y JavaScript puro (sin frameworks,
sin instalación, sin `npm`). Puedes subirla a **cualquier hosting** tal cual.

## Estructura

```
via-music/
├── index.html      → estructura y textos de la web
├── styles.css       → todo el diseño (colores, tipografías, animaciones)
├── script.js        → interactividad (carrusel 3D, listas, formulario...)
└── assets/
    ├── logo-principal.svg      → logo a color (usado en el menú)
    ├── logo-mono-blanco.svg    → logo blanco (usado en el pie de página)
    └── logo-mono-2.svg         → logo negro (usado como favicon)
```

## Lo primero que vas a querer cambiar

Todo el contenido "de catálogo" (portadas de discos, canciones, artistas) está
en la parte de arriba de **`script.js`**, en tres listas fáciles de editar:

```js
const DISCOGRAFIA = [ ... ];   // álbumes / singles del carrusel 3D
const CANCIONES   = [ ... ];   // lista de "canciones más escuchadas"
const ARTISTAS    = [ ... ];   // grid de "artistas más escuchados"
```

Ahora mismo llevan **nombres y portadas de ejemplo** (con colores en vez de
fotos reales, para que puedas verlo funcionando ya). Para poner tu contenido
real:

1. Cambia `titulo`, `artista`, `nombre`, `genero`, etc. por los datos reales.
2. Los enlaces a Spotify se generan automáticamente como una búsqueda
   (`https://open.spotify.com/search/...`), así que **ya funcionan** aunque
   no hayas puesto nada más. Si quieres enlazar directamente al disco,
   canción o artista exacto, añade su URL de Spotify en vez de usar la
   búsqueda (te lo dejamos preparado con un comentario en el propio archivo).
3. Si quieres usar **imágenes reales** en vez de los colores de portada,
   dímelo y adapto las tarjetas para que acepten una foto (`c1`/`c2` pasarían
   a ser una imagen de fondo).

Los textos de "Sobre nosotros", el titular animado del *hero*
(ESPECTÁCULO / ÚNICO / EN DIRECTO...) y el resto de textos corporativos están
directamente en `index.html`, listos para ajustarlos si quieres matizar algo.

El email, teléfono y redes sociales de contacto están en `index.html`,
dentro de la sección `<section id="contacto">` — ahora mismo llevan datos
de ejemplo (`hola@viamusic.es`, `+34 900 00 00 00`) que debes sustituir por
los reales.

## El formulario de contacto

Ahora mismo el formulario es solo de interfaz: valida los campos y muestra un
mensaje de confirmación, pero **no envía el email a ningún sitio** todavía
(una web estática no puede enviar correos por sí sola). Para que llegue de
verdad a tu bandeja de entrada, la forma más rápida sin programar nada más es
conectar un servicio gratuito como:

- [Formspree](https://formspree.io)
- [Web3Forms](https://web3forms.com)

Ambos te dan una URL a la que apuntar el formulario; solo hay que cambiar el
`action` del `<form>` en `index.html`. Si prefieres, puedo dejártelo ya
conectado en cuanto elijas uno.

## Cómo publicarla (subir el código donde quieras)

Cualquiera de estas opciones sirve — solo necesitas los archivos de esta
carpeta:

- **Netlify / Vercel (más fácil):** arrastra la carpeta entera a
  [app.netlify.com/drop](https://app.netlify.com/drop) y en segundos tienes
  la web publicada con una URL.
- **GitHub Pages:** sube estos archivos a un repositorio y activa GitHub
  Pages en la configuración del repo.
- **Tu propio hosting (cPanel, FTP, etc.):** sube toda la carpeta tal cual
  a `public_html` (o la carpeta raíz de tu hosting).
- **Dominio propio:** una vez publicada en cualquiera de las opciones
  anteriores, apunta tu dominio desde el panel de tu proveedor de dominios.

No hace falta ningún paso de compilación (`build`): los archivos que ves son
exactamente los que se suben.

## Notas de diseño

- Colores de marca extraídos de vuestro manual de identidad: magenta
  `#FF0092`, negro `#000000` y blanco `#FFFFFF`, sobre un fondo casi negro
  para dar sensación de escenario.
- Tipografías: **Syne** para titulares (impacto, personalidad de cartel de
  concierto) y **Lato** para el resto de textos, que es la tipografía que ya
  usáis en el logotipo y el manual de marca — se cargan desde Google Fonts,
  así que necesitas conexión a internet para que se vean tal cual (si no,
  el navegador usa una alternativa del sistema automáticamente).
- El carrusel 3D, las animaciones y los efectos de scroll están hechos en
  CSS/JS puro — no dependen de ninguna librería externa.
- Web totalmente responsive (adaptada a móvil) y con foco visible de teclado
  para accesibilidad.

## Foto de portada

La imagen de fondo del hero (`assets/hero-concierto.jpg`) es una foto de
concierto de **Pexels** (autor: Teddy Yang), de uso libre. Ya está
optimizada para web (~218 KB). Si quieres cambiarla por una foto vuestra
de un evento real, sustituye ese archivo manteniendo el nombre, o dímelo
y la preparo. Recomendado: horizontal, mínimo 2000px de ancho, con zonas
oscuras donde encaje el texto.

También queda incluida `assets/hero-arena.jpg` como alternativa (tono azul
más frío) por si prefieres esa; para usarla, cambia el `src` de la imagen
del hero en `index.html`.

---

## PENDIENTE ANTES DE PUBLICAR

### 1. URLs de redes sociales (obligatorio)
Los tres iconos del menú (Instagram, Facebook, LinkedIn) apuntan a `href="#"`.
Busca `data-social` en `index.html` (6 apariciones: 3 en el menú de escritorio
y 3 en el móvil) y sustituye `href="#"` por la URL real de cada perfil.
Si algún perfil aún no existe, borra ese enlace en vez de dejarlo en `#`.

### 2. El formulario no envía (obligatorio)
El `<form id="contactForm">` valida y muestra confirmación, pero no manda el
correo. Opción rápida sin programar:
1. Crea una cuenta en formspree.io o web3forms.com
2. Te dan una URL tipo `https://formspree.io/f/xxxxxxx`
3. En `index.html` añade al `<form>`:  `action="LA_URL" method="POST"`

### 3. Dominio en las etiquetas sociales (obligatorio)
En el `<head>` hay 4 apariciones de `https://viamusic.es` (canonical, og:url,
og:image, twitter:image). Sustitúyelas por tu dominio real. Sin esto, al
compartir el enlace en WhatsApp o Instagram no se verá la imagen de portada.

### 4. Contenido propio (recomendado)
- Las secciones "La escena / En bucle / En el radar" muestran artistas que NO
  son de VIA MUSIC: son referencias declaradas como tales. Cuando tengáis
  artistas o eventos propios, sustituidlos en las listas de `script.js`.
- La foto del hero es de banco de imágenes (Pexels). En cuanto tengáis foto de
  un evento vuestro, sustituid `assets/hero-concierto.jpg` manteniendo el nombre.
