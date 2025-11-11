import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const proxyUrl = process.env.API_GATEWAY_BASE_URL as string;

  const path = event.path.replace(/^\/api-gateway\//, '');

  const target = joinURL(proxyUrl, '', path);

  return proxyRequest(event, target);
});
