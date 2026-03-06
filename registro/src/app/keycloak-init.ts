export function loadKeycloak(): Promise<void> {
  return new Promise(async (resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/keycloak-js@24.0.1/dist/keycloak.min.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}
