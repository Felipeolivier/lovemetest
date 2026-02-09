const nao = document.getElementById("nao");
const area = document.querySelector(".buttons");

nao.addEventListener("mouseenter", () => {
  const areaWidth = area.clientWidth - nao.offsetWidth;
  const areaHeight = area.clientHeight - nao.offsetHeight;

  const x = Math.random() * areaWidth;
  const y = Math.random() * areaHeight;

  nao.style.left = `${x}px`;
  nao.style.top = `${y}px`;
});