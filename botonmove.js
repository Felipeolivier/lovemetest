const nao = document.getElementById("nao");

let iniciado = false;

function iniciar() {
  if (!iniciado) {
    const rect = nao.getBoundingClientRect();

    nao.style.position = "fixed";
    nao.style.left = rect.left + "px";
    nao.style.top  = rect.top  + "px";

    iniciado = true;
  }
}

function fugir() {
  iniciar();

  const margem = 20;

  const maxX = window.innerWidth  - nao.offsetWidth  - margem;
  const maxY = window.innerHeight - nao.offsetHeight - margem;

  const deslocamentoX = (Math.random() * 140) - 70;
  const deslocamentoY = (Math.random() * 140) - 70;

  let novoX = nao.offsetLeft + deslocamentoX;
  let novoY = nao.offsetTop  + deslocamentoY;

  novoX = Math.max(margem, Math.min(maxX, novoX));
  novoY = Math.max(margem, Math.min(maxY, novoY));

  nao.style.left = novoX + "px";
  nao.style.top  = novoY + "px";
}

// PC
nao.addEventListener("mouseenter", fugir);

// Celular
nao.addEventListener("touchstart", fugir);