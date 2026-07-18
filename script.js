/* ============================================================
   VIA MUSIC — script.js
   TODO EL CONTENIDO EDITABLE ESTÁ EN LA SECCIÓN "DATOS" DE AQUÍ ABAJO.
   Sustituye los textos, colores y enlaces de Spotify por los reales
   cuando los tengas. No hace falta tocar nada más del archivo.
   ============================================================ */

/* ---------- DATOS: portadas / discografía ----------
   Álbumes que han sido número 1 en la lista oficial de Promusicae
   (Top 100 España) durante 2025-2026. spotify = enlace directo verificado
   cuando lo tenemos; si no, se usa una búsqueda en Spotify (igual de real,
   solo que sin ID exacto de álbum). */
const DISCOGRAFIA = [
  { titulo: "LUX", artista: "ROSALÍA", anio: "2025", c1: "#ff0092", c2: "#3d1f52",
    spotify: "https://open.spotify.com/album/3goLwu2fkSSmghikOcVufU" },
  { titulo: "DeBÍ TiRAR MáS FOToS", artista: "Bad Bunny", anio: "2025", c1: "#ff33a8", c2: "#1c0f28",
    spotify: "https://open.spotify.com/album/5K79FLRUCSysQnVESLcTdb" },
  { titulo: "Buenas Noches", artista: "Quevedo", anio: "2025", c1: "#c400ff", c2: "#1c0f28",
    spotify: "https://open.spotify.com/album/3V2ApPxUSquOkjLQU3wmjh" },
  { titulo: "Daisy", artista: "Rusowsky", anio: "2026", c1: "#ff0092", c2: "#241238",
    spotify: "https://open.spotify.com/album/0o1RGF3A02UN1aVAX1SLuQ" },
  { titulo: "El Día Que Me Olvides", artista: "Walls", anio: "2026", c1: "#ff5fb8", c2: "#2a1339",
    spotify: "https://open.spotify.com/album/5dr5f9aeHuDORZXkJIQWGB" },
  { titulo: "How Did I Get Here?", artista: "Louis Tomlinson", anio: "2026", c1: "#e600ff", c2: "#160a20",
    spotify: "https://open.spotify.com/album/5Ihp8gEWnduyUdUqcxqkzB" },
];

/* ---------- DATOS: canciones más escuchadas ----------
   Top de la lista diaria oficial de Spotify España (vía kworb.net).
   Cada spotify es el enlace directo real a la canción. */
const CANCIONES = [
  { titulo: "LA GRACIOSA", artista: "Quevedo",
    spotify: "https://open.spotify.com/track/0TJYJrUDKQ1btt4g0Xwklw", c1: "#ff0092", c2: "#3d1f52" },
  { titulo: "BAILE INoLVIDABLE", artista: "Bad Bunny",
    spotify: "https://open.spotify.com/track/2lTm559tuIvatlT1u0JYG2", c1: "#ff33a8", c2: "#1c0f28" },
  { titulo: "Dichavate", artista: "Ya Ice Dilan",
    spotify: "https://open.spotify.com/track/6Ab2trdJulkRRhaJ9zVGQa", c1: "#c400ff", c2: "#1c0f28" },
  { titulo: "KOKO", artista: "Omar Courtz",
    spotify: "https://open.spotify.com/track/1tz7RZirwiuaJw2p0jbdHb", c1: "#ff0092", c2: "#241238" },
  { titulo: "MUCHACHA", artista: "Aissa",
    spotify: "https://open.spotify.com/track/4rDCRcln8WCHWPRt0YTFLs", c1: "#ff5fb8", c2: "#2a1339" },
  { titulo: "NUEVAYoL", artista: "Bad Bunny",
    spotify: "https://open.spotify.com/track/5TFD2bmFKGhoCRbX61nXY5", c1: "#e600ff", c2: "#160a20" },
  { titulo: "SUPERESTRELLA", artista: "Aitana",
    spotify: "https://open.spotify.com/track/6hpuesKPNa3WhV48O7Fa47", c1: "#ff33a8", c2: "#3d1f52" },
  { titulo: "De Lejitos", artista: "Jay Wheeler",
    spotify: "https://open.spotify.com/track/3r2ZoCWlf9RewWlxxozfQ8", c1: "#c400ff", c2: "#241238" },
];

/* ---------- DATOS: artistas más escuchados ----------
   Artistas con más presencia en el Top 50 diario de España (Spotify,
   vía kworb.net). spotify = enlace directo real al perfil del artista. */
const ARTISTAS = [
  { nombre: "Bad Bunny", genero: "Reguetón / Urbano",
    spotify: "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X", c1: "#ff0092", c2: "#3d1f52" },
  { nombre: "Quevedo", genero: "Trap / Urbano",
    spotify: "https://open.spotify.com/artist/52iwsT98xCoGgiGntTiR7K", c1: "#ff33a8", c2: "#1c0f28" },
  { nombre: "Aitana", genero: "Pop",
    spotify: "https://open.spotify.com/artist/7eLcDZDYHXZCebtQmVFL25", c1: "#c400ff", c2: "#1c0f28" },
  { nombre: "ROSALÍA", genero: "Flamenco-pop / Experimental",
    spotify: "https://open.spotify.com/artist/7ltDVBr6mKbRvohxheJ9h1", c1: "#ff0092", c2: "#241238" },
  { nombre: "Omar Courtz", genero: "Reguetón / Urbano",
    spotify: "https://open.spotify.com/artist/3E12tRURRvPfHz0hAMCFYc", c1: "#ff5fb8", c2: "#2a1339" },
  { nombre: "Myke Towers", genero: "Trap / Urbano",
    spotify: "https://open.spotify.com/artist/7iK8PXO48WeuP03g8YR51W", c1: "#e600ff", c2: "#160a20" },
];

/* ============================================================
   A partir de aquí es lógica de la web — no hace falta tocarlo.
   ============================================================ */

function spotifySearchUrl(...parts){
  return "https://open.spotify.com/search/" + encodeURIComponent(parts.join(" "));
}
// Enlace de Spotify para un item: el directo y verificado si lo tenemos
// guardado en los datos, o si no, una búsqueda (funciona igual, solo que
// no apunta exactamente a esa versión/edición del álbum).
function spotifyLinkFor(item, ...fallbackParts){
  return item.spotify || spotifySearchUrl(...fallbackParts);
}
function initials(name){
  return name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
}

/* ---------- Carátulas/fotos oficiales vía Spotify oEmbed ----------
   Spotify ofrece este endpoint público precisamente para insertar sus
   carátulas en webs de terceros — es la vía correcta y legal para mostrar
   la imagen real sin tener que descargarla ni alojarla nosotros.
   Si por lo que sea falla (sin red, bloqueada, etc.) el diseño se queda
   tal cual, con el degradado de color de respaldo. */
async function applyOfficialArtwork(el, spotifyUrl){
  if (!spotifyUrl) return;
  try {
    const res = await fetch("https://open.spotify.com/oembed?url=" + encodeURIComponent(spotifyUrl));
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.thumbnail_url){
      el.style.backgroundImage = `linear-gradient(0deg, rgba(10,9,16,.55), rgba(10,9,16,.1)), url("${data.thumbnail_url}")`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.classList.add("has-cover");
    }
  } catch (err) {
    // Sin conexión al oEmbed o bloqueado — se queda el degradado, sin romper nada.
  }
}

/* ---------- NAV: fondo al hacer scroll ---------- */
const nav = document.getElementById("nav");
function onScrollNav(){
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
}
document.addEventListener("scroll", onScrollNav, { passive:true });
onScrollNav();

/* ---------- Indicador de sección activa en el nav ---------- */
(function navScrollSpy(){
  const sections = Array.from(document.querySelectorAll("main > section[id]"));
  const links = Array.from(document.querySelectorAll('.nav__links a, .nav__mobile a'));
  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkFor = (id) => links.filter(a => a.getAttribute("href") === `#${id}`);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.classList.remove("is-active"));
      linkFor(entry.target.id).forEach(a => a.classList.add("is-active"));
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

  sections.forEach(s => io.observe(s));
})();

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

/* ---------- Hero: spotlight que sigue al ratón ----------
   Solo en dispositivos con puntero fino (ratón); en táctil no aporta nada
   y solo consumiría batería sin motivo. */
(function heroSpotlight(){
  const hero = document.getElementById("heroSection");
  if (!hero || !window.matchMedia("(pointer: fine)").matches) return;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
    hero.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
})();

/* ---------- Hero: chip "sonando ahora" con dato real ----------
   Usa la misma canción Nº1 que ya mostramos en Canciones — no es un
   texto de relleno, es el mismo dato real de Spotify. */
(function heroLive(){
  const el = document.getElementById("heroLiveTrack");
  if (!el || !CANCIONES[0]) return;
  el.textContent = `${CANCIONES[0].titulo} — ${CANCIONES[0].artista}`;
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
    const link = spotifyLinkFor(item, item.titulo, item.artista);
    card.querySelector(".card3d__play").addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(link, "_blank", "noopener");
    });
    card.addEventListener("click", () => {
      if (i === active){
        window.open(link, "_blank", "noopener");
      } else {
        active = i;
        render();
      }
    });
    applyOfficialArtwork(card.querySelector(".card3d__art"), item.spotify);
    track.appendChild(card);
  });

  const cards = Array.from(track.children);

  // Panel "reproduciendo ahora"
  const nowTitle = document.getElementById("discoNowTitle");
  const nowArtist = document.getElementById("discoNowArtist");
  const nowLink = document.getElementById("discoNowLink");

  // Puntos de navegación
  DISCOGRAFIA.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Ir a la portada ${i+1}`);
    dot.addEventListener("click", () => { active = i; render(); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render(){
    const current = DISCOGRAFIA[active];
    if (nowTitle){
      nowTitle.textContent = current.titulo;
      nowArtist.textContent = `${current.artista} · ${current.anio}`;
      nowLink.href = spotifyLinkFor(current, current.titulo, current.artista);
    }
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
  const featuredWrap = document.getElementById("trackFeatured");
  if (!list) return;

  // La primera canción del top se muestra como destacado grande;
  // el resto entra en la lista compacta de al lado.
  const [top, ...rest] = CANCIONES;

  if (featuredWrap && top){
    const link = spotifyLinkFor(top, top.titulo, top.artista);
    featuredWrap.innerHTML = `
      <span class="tracks__featured-label">Nº1 esta semana</span>
      <div class="tracks__featured-art" style="--c1:${top.c1};--c2:${top.c2}"></div>
      <h3>${top.titulo}</h3>
      <p>${top.artista}</p>
      <a href="${link}" target="_blank" rel="noopener" class="btn btn--solid">Escuchar ahora</a>`;
    applyOfficialArtwork(featuredWrap.querySelector(".tracks__featured-art"), top.spotify);
  }

  rest.forEach((t, i) => {
    const row = document.createElement("a");
    row.className = "track";
    row.style.setProperty("--i", i);
    row.href = spotifyLinkFor(t, t.titulo, t.artista);
    row.target = "_blank";
    row.rel = "noopener";
    row.innerHTML = `
      <span class="track__index">${String(i+2).padStart(2,"0")}</span>
      <span class="track__art" style="--c1:${t.c1};--c2:${t.c2}"></span>
      <span class="track__body">
        <h4>${t.titulo}</h4>
        <span>${t.artista}</span>
      </span>
      <span class="track__link" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
      </span>`;
    applyOfficialArtwork(row.querySelector(".track__art"), t.spotify);
    list.appendChild(row);
  });
})();

/* ---------- Grid de artistas ---------- */
(function renderArtists(){
  const grid = document.getElementById("artistsGrid");
  if (!grid) return;
  ARTISTAS.forEach((a, i) => {
    const item = document.createElement("a");
    item.className = "artist";
    item.style.setProperty("--i", i);
    item.href = spotifyLinkFor(a, a.nombre);
    item.target = "_blank";
    item.rel = "noopener";
    item.innerHTML = `
      <span class="artist__photo" style="--c1:${a.c1};--c2:${a.c2}">${initials(a.nombre)}</span>
      <h4>${a.nombre}</h4>
      <span>${a.genero}</span>`;
    applyOfficialArtwork(item.querySelector(".artist__photo"), a.spotify);
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
