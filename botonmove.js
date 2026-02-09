const nao = document.getElementById("nao");

const DISTANCIA_MINIMA = 21; // ajuste aqui se quiser mais fuga
const MARGEM = 20; // não deixar sair da tela

nao.addEventListener("mouseenter", () => {
  const maxX = window.innerWidth - nao.offsetWidth - MARGEM;
  const maxY = window.innerHeight - nao.offsetHeight - MARGEM;

  let x, y, dx, dy;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;

    dx = x - nao.offsetLeft;
    dy = y - nao.offsetTop;

    // continua tentando até garantir distância suficiente
  } while (
    Math.abs(dx) < DISTANCIA_MINIMA &&
    Math.abs(dy) < DISTANCIA_MINIMA
  );

  nao.style.left = `${x}px`;
  nao.style.top = `${y}px`;
});