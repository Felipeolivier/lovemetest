const nao = document.getElementById("nao");
const area = document.querySelector(".buttons");

const DISTANCIA_MINIMA = 80; // 👈 aumenta esse valor se quiser mais fuga

nao.addEventListener("mouseenter", () => {
  const areaWidth = area.clientWidth - nao.offsetWidth;
  const areaHeight = area.clientHeight - nao.offsetHeight;

  let x = Math.random() * areaWidth;
  let y = Math.random() * areaHeight;

  // força um deslocamento mínimo
  const dx = x - nao.offsetLeft;
  const dy = y - nao.offsetTop;

  if (Math.abs(dx) < DISTANCIA_MINIMA) {
    x += dx >= 0 ? DISTANCIA_MINIMA : -DISTANCIA_MINIMA;
  }

  if (Math.abs(dy) < DISTANCIA_MINIMA) {
    y += dy >= 0 ? DISTANCIA_MINIMA : -DISTANCIA_MINIMA;
  }

  // garante que não saia da área
  x = Math.max(0, Math.min(x, areaWidth));
  y = Math.max(0, Math.min(y, areaHeight));

  nao.style.left = `${x}px`;
  nao.style.top = `${y}px`;
});