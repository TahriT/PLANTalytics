// Cloudflare Pages Function — runs on every request
// Sets a cookie with the visitor's country code (from CF-IPCountry header)
// so the client-side i18n engine can auto-detect language

export async function onRequest(context) {
  const response = await context.next();

  // Only set cookie on HTML page requests (not assets)
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  const country = context.request.headers.get('CF-IPCountry') || '';
  if (!country) return response;

  // Clone response to modify headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.append(
    'Set-Cookie',
    `cf_country=${country}; Path=/; SameSite=Lax; Max-Age=86400`
  );
  return newResponse;
}
