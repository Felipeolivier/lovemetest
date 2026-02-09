const nao = document.getElementById("nao");

const DISTANCIA_MINIMA = 120;
const MARGEM = 20;

nao.addEventListener("mouseenter", () => {
  const rect = nao.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - MARGEM;
  const maxY = window.innerHeight - rect.height - MARGEM;

  let x, y, dx, dy;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;

    dx = x - rect.left;
    dy = y - rect.top;
  } while (
    Math.abs(dx) < DISTANCIA_MINIMA &&
    Math.abs(dy) < DISTANCIA_MINIMA
  );

  nao.style.left = `${x}px`;
  nao.style.top = `${y}px`;
});