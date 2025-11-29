// Sitewide navigation component
export function createNav() {
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.innerHTML = `
    <a href="./" class="brand">Alphanon</a>
    <a href="./sine.html">Sine</a>
    <a href="./three.html">3D</a>
    <a href="./universal-mathematics.html">Universal Mathematics</a>
    <a href="./wave.html">Wave</a>
    <a href="https://github.com/afomi/alphanon" class="github" target="_blank">GitHub</a>
  `;
  return nav;
}

export function injectNav() {
  const nav = createNav();
  document.body.insertBefore(nav, document.body.firstChild);
}
