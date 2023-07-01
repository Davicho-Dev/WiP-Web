const apiUrl = import.meta.env.VITE_API_URL
const audience = import.meta.env.VITE_AUTH0_AUDIENCE
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
const scope = import.meta.env.VITE_AUTH0_SCOPE

export { apiUrl, audience, clientId, domain, redirectUri, scope }
