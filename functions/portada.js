/* ============================================================
   /portada  ·  Cloudflare Pages Function
   ------------------------------------------------------------
   El navegador NO puede preguntarle a Spotify por una carátula:
   Spotify bloquea esas peticiones desde webs ajenas (política
   CORS). Por eso las portadas nunca llegaban a aparecer.

   La solución es preguntar desde el servidor, donde esa política
   no aplica. Este archivo hace justo eso: recibe un enlace de
   Spotify, le pregunta por la carátula y devuelve la dirección de
   la imagen. Se despliega solo junto con la web, sin configurar
   nada, y la respuesta se cachea 24 horas en la red de Cloudflare.
   ============================================================ */

const PERMITIDO = /^https:\/\/open\.spotify\.com\/(album|track|artist)\/[A-Za-z0-9]+(\?.*)?$/;

export async function onRequestGet({ request }) {
  const json = (datos, estado) => new Response(JSON.stringify(datos), {
    status: estado || 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=86400',
      'access-control-allow-origin': '*'
    }
  });

  const destino = new URL(request.url).searchParams.get('url') || '';

  // Solo enlaces de Spotify: este endpoint no debe servir de proxy general.
  if (!PERMITIDO.test(destino)) return json({ img: null, error: 'enlace no permitido' }, 400);

  try {
    const r = await fetch(
      'https://open.spotify.com/oembed?url=' + encodeURIComponent(destino),
      { cf: { cacheTtl: 86400, cacheEverything: true } }
    );
    if (!r.ok) return json({ img: null, error: 'spotify no responde' }, 502);
    const d = await r.json();
    return json({ img: d.thumbnail_url || null });
  } catch (e) {
    return json({ img: null, error: 'fallo de red' }, 502);
  }
}
