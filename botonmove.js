const nao = document.getElementById("nao");
const buttons = document.querySelector(".buttons");

// ativa absolute só quando começa a interação
let initialized = false;

function iniciarFuga() {
  if (!initialized) {
    const rect = nao.getBoundingClientRect();
    const parentRect = buttons.getBoundingClientRect();

    nao.style.position = "absolute";
    nao.style.left = rect.left - parentRect.left + "px";
    nao.style.top  = rect.top  - parentRect.top  + "px";

    initialized = true;
  }
}

function fugir() {
  iniciarFuga();

  const parentRect = buttons.getBoundingClientRect();
  const maxX = parentRect.width - nao.offsetWidth;
  const maxY = parentRect.height - nao.offsetHeight;

  // movimento curto (fuga, não teleporte)
  const deslocamentoX = (Math.random() * 120) - 60;
  const deslocamentoY = (Math.random() * 80) - 40;

  let novoX = nao.offsetLeft + deslocamentoX;
  let novoY = nao.offsetTop  + deslocamentoY;

  // limites
  novoX = Math.max(0, Math.min(maxX, novoX));
  novoY = Math.max(0, Math.min(maxY, novoY));

  nao.style.left = novoX + "px";
  nao.style.top  = novoY + "px";
}

// PC
nao.addEventListener("mouseenter", fugir);

// Celular
nao.addEventListener("touchstart", fugir);