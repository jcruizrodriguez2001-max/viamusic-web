/* ============================================================
   VIA MUSIC — script.js
   TODO EL CONTENIDO EDITABLE ESTÁ EN LA SECCIÓN "DATOS" DE AQUÍ ABAJO.
   Sustituye los textos, colores y enlaces de Spotify por los reales
   cuando los tengas. No hace falta tocar nada más del archivo.
   ============================================================ */

/* ---------- DATOS: portadas / discografía ---------- */
// spotify: pon aquí la URL directa del álbum/single cuando la tengas.
// Mientras tanto, dejamos un enlace de búsqueda en Spotify que ya funciona.
const DISCOGRAFIA = [
  { titulo: "NOCTURNA",     artista: "Nova Ardiente", anio: "2026", c1: "#ff0092", c2: "#3d1f52" },
  { titulo: "RAÍZ",         artista: "Califa",        anio: "2025", c1: "#ff33a8", c2: "#1c0f28" },
  { titulo: "AZUL ELÉCTRICO", artista: "Lúa",          anio: "2026", c1: "#c400ff", c2: "#1c0f28" },
  { titulo: "VÉRTIGO",      artista: "Marte 21",       anio: "2025", c1: "#ff0092", c2: "#241238" },
  { titulo: "SOLSTICIO",    artista: "Kayra",          anio: "2026", c1: "#ff5fb8", c2: "#2a1339" },
  { titulo: "DESIERTO",     artista: "Nova Ardiente",  anio: "2024", c1: "#e600ff", c2: "#160a20" },
];

/* ---------- DATOS: canciones más escuchadas ---------- */
const CANCIONES = [
  { titulo: "Espejismo",      artista: "Nova Ardiente", c1: "#ff0092", c2: "#3d1f52" },
  { titulo: "Ceniza y Oro",   artista: "Califa",        c1: "#ff33a8", c2: "#1c0f28" },
  { titulo: "Marea",          artista: "Lúa",           c1: "#c400ff", c2: "#1c0f28" },
  { titulo: "Fuego Lento",    artista: "Marte 21",      c1: "#ff0092", c2: "#241238" },
  { titulo: "Horizonte",      artista: "Kayra",         c1: "#ff5fb8", c2: "#2a1339" },
];

/* ---------- DATOS: artistas más escuchados ---------- */
const ARTISTAS = [
  { nombre: "Nova Ardiente", genero: "Pop alternativo", c1: "#ff0092", c2: "#3d1f52" },
  { nombre: "Califa",        genero: "Urbano",          c1: "#ff33a8", c2: "#1c0f28" },
  { nombre: "Lúa",           genero: "Indie folk",      c1: "#c400ff", c2: "#1c0f28" },
  { nombre: "Marte 21",      genero: "Electrónica",     c1: "#ff0092", c2: "#241238" },
  { nombre: "Kayra",         genero: "R&B",             c1: "#ff5fb8", c2: "#2a1339" },
  { nombre: "Onda Sur",      genero: "Rock",             c1: "#e600ff", c2: "#160a20" },
];

/* ---------- Palabras del titular animado del hero ---------- */
const HERO_WORDS = ["ESPECTÁCULO", "ÚNICO", "EN DIRECTO", "INOLVIDABLE", "VIA MUSIC"];

/* ============================================================
   A partir de aquí es lógica de la web — no hace falta tocarlo.
   ============================================================ */

function spotifySearchUrl(...parts){
  return "https://open.spotify.com/search/" + encodeURIComponent(parts.join(" "));
}
function initials(name){
  return name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
}

/* ---------- NAV: fondo al hacer scroll ---------- */
const nav = document.getElementById("nav");
function onScrollNav(){
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
}
document.addEventListener("scroll", onScrollNav, { passive:true });
onScrollNav();

/* ---------- Menú móvil ---------- */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

function setMobileMenu(open){
  mobileMenu.classList.toggle("is-open", open);
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
  // inert saca el menú del orden de tabulación y de los lectores de pantalla
  // cuando está fuera de pantalla — con solo transform, seguía siendo enfocable.
  if (open) mobileMenu.removeAttribute("inert");
  else mobileMenu.setAttribute("inert", "");
  document.body.style.overflow = open ? "hidden" : "";
  if (open){
    mobileMenu.querySelector("a")?.focus();
  }
}
burger.addEventListener("click", () => {
  setMobileMenu(!mobileMenu.classList.contains("is-open"));
});
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  setMobileMenu(false);
}));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("is-open")){
    setMobileMenu(false);
    burger.focus();
  }
});

/* ---------- Titular del hero: palabras que van cambiando ---------- */
(function heroWordCycler(){
  const titleEl = document.querySelector(".hero__title");
  const wrapEl = document.querySelector(".hero__word-wrap");
  const el = document.getElementById("heroWord");
  if (!el || !titleEl || !wrapEl) return;

  // Sonda invisible con la misma tipografía que la palabra animada,
  // para medir cuánto ocupa el texto sin pintarlo en pantalla.
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.whiteSpace = "nowrap";
  probe.style.left = "-9999px";
  probe.style.top = "0";
  document.body.appendChild(probe);

  function fitWord(word){
    // Medimos a escala 1 para tener el ancho real disponible en la línea.
    // Solo tocamos la escala de la palabra: la línea "ESTO ES" no depende
    // de esta variable y por tanto nunca cambia de tamaño con ella.
    wrapEl.style.setProperty("--hero-scale", 1);
    const available = titleEl.getBoundingClientRect().width;
    const cs = getComputedStyle(el);
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontWeight = cs.fontWeight;
    probe.style.fontSize = cs.fontSize;
    probe.style.letterSpacing = cs.letterSpacing;
    probe.style.textTransform = cs.textTransform;
    probe.textContent = word;
    const width = probe.getBoundingClientRect().width;
    // Cada palabra llena el ancho disponible por sí sola — nunca se agranda
    // por encima de 1x, solo se encoge si de verdad no cabe. Así todas se
    // ven con un peso visual consistente y ancladas a la izquierda.
    const scale = width > 0 ? Math.min(1, Math.max(0.32, (available / width) * 0.97)) : 1;
    wrapEl.style.setProperty("--hero-scale", scale);
  }

  let i = 0;
  function applyWord(){
    el.textContent = HERO_WORDS[i];
    if (document.fonts && document.fonts.ready){
      document.fonts.ready.then(() => fitWord(HERO_WORDS[i]));
    } else {
      fitWord(HERO_WORDS[i]);
    }
  }
  applyWord();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => fitWord(HERO_WORDS[i]), 150);
  });

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  setInterval(() => {
    i = (i + 1) % HERO_WORDS.length;
    el.style.animation = "none";
    // fuerza reflow para poder reiniciar la animación
    void el.offsetWidth;
    applyWord();
    el.style.animation = "";
  }, 2200);
})();

/* ---------- Scroll reveal genérico ---------- */
(function scrollReveal(){
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  items.forEach(el => io.observe(el));
})();

/* ---------- Carrusel 3D de discografía ---------- */
(function discoCarousel(){
  const track = document.getElementById("discoTrack");
  const dotsWrap = document.getElementById("discoDots");
  const btnPrev = document.getElementById("discoPrev");
  const btnNext = document.getElementById("discoNext");
  if (!track) return;

  let active = 0;
  const total = DISCOGRAFIA.length;

  // Construir tarjetas
  DISCOGRAFIA.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card3d";
    card.style.setProperty("--c1", item.c1);
    card.style.setProperty("--c2", item.c2);
    card.innerHTML = `
      <div class="card3d__art">
        <span class="card3d__mark">${item.anio}</span>
        <button class="card3d__play" type="button" tabindex="-1" aria-label="Escuchar ${item.titulo} en Spotify">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="card3d__info">
          <h4>${item.titulo}</h4>
          <span>${item.artista}</span>
        </div>
      </div>`;
    card.querySelector(".card3d__play").addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(spotifySearchUrl(item.titulo, item.artista), "_blank", "noopener");
    });
    card.addEventListener("click", () => {
      if (i === active){
        window.open(spotifySearchUrl(item.titulo, item.artista), "_blank", "noopener");
      } else {
        active = i;
        render();
      }
    });
    track.appendChild(card);
  });

  const cards = Array.from(track.children);

  // Puntos de navegación
  DISCOGRAFIA.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a la portada ${i+1}`);
    dot.addEventListener("click", () => { active = i; render(); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render(){
    cards.forEach((card, i) => {
      let offset = i - active;
      // distancia circular más corta
      if (offset > total/2) offset -= total;
      if (offset < -total/2) offset += total;

      const abs = Math.abs(offset);
      const isActive = offset === 0;

      let tx = offset * 210;
      let tz = -abs * 160;
      let ry = offset * -32;
      let scale = isActive ? 1 : 0.78;
      let opacity = abs > 2 ? 0 : 1 - abs * 0.28;
      let zIndex = 100 - abs;

      card.style.transform = `translate(-50%,-50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = abs > 2 ? "none" : "auto";
      card.classList.toggle("is-active", isActive);
      card.querySelector(".card3d__play").tabIndex = isActive ? 0 : -1;
    });
    dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
  }

  btnPrev.addEventListener("click", () => { active = (active - 1 + total) % total; render(); });
  btnNext.addEventListener("click", () => { active = (active + 1) % total; render(); });

  // Arrastre táctil / ratón
  let startX = 0, dragging = false;
  const stage = track.parentElement;
  stage.addEventListener("pointerdown", (e) => { dragging = true; startX = e.clientX; });
  window.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    if (dx > 40) { active = (active - 1 + total) % total; render(); }
    else if (dx < -40) { active = (active + 1) % total; render(); }
  });

  // Teclado
  stage.setAttribute("tabindex", "0");
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft"){ active = (active - 1 + total) % total; render(); }
    if (e.key === "ArrowRight"){ active = (active + 1) % total; render(); }
  });

  render();
  window.addEventListener("resize", render);
})();

/* ---------- Lista de canciones más escuchadas ---------- */
(function renderTracks(){
  const list = document.getElementById("tracksList");
  if (!list) return;
  CANCIONES.forEach((t, i) => {
    const row = document.createElement("a");
    row.className = "track";
    row.href = spotifySearchUrl(t.titulo, t.artista);
    row.target = "_blank";
    row.rel = "noopener";
    row.innerHTML = `
      <span class="track__index">${String(i+1).padStart(2,"0")}</span>
      <span class="track__art" style="--c1:${t.c1};--c2:${t.c2}"></span>
      <span class="track__body">
        <h4>${t.titulo}</h4>
        <span>${t.artista}</span>
      </span>
      <span class="track__link" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
      </span>`;
    list.appendChild(row);
  });
})();

/* ---------- Grid de artistas ---------- */
(function renderArtists(){
  const grid = document.getElementById("artistsGrid");
  if (!grid) return;
  ARTISTAS.forEach(a => {
    const item = document.createElement("a");
    item.className = "artist";
    item.href = spotifySearchUrl(a.nombre);
    item.target = "_blank";
    item.rel = "noopener";
    item.innerHTML = `
      <span class="artist__photo" style="--c1:${a.c1};--c2:${a.c2}">${initials(a.nombre)}</span>
      <h4>${a.nombre}</h4>
      <span>${a.genero}</span>`;
    grid.appendChild(item);
  });
})();

/* ---------- Formulario de contacto ---------- */
(function contactForm(){
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Este formulario es solo de interfaz: no envía datos a ningún sitio todavía.
    // Para recibir mensajes reales, conéctalo a un servicio como Formspree,
    // Web3Forms o tu propio backend (lo explicamos en el README).
    note.textContent = "¡Gracias! Tu mensaje quedaría enviado aquí en cuanto conectemos el formulario a un servicio de envío.";
    note.classList.add("is-success");
    form.reset();
  });
})();

/* ---------- Año en el footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
