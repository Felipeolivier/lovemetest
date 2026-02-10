const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsContainer = document.querySelector(".buttons"); // container relativo
const questionBox = document.getElementById("questionBox");
const resultBox = document.getElementById("resultBox");

// coloca o botão "Não" logo à direita do botão "Sim" com um gap
function placeNoBesideYes(gap = 20) {
    const yesRect = yesBtn.getBoundingClientRect();
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // calcula posição relativa ao container (left/top)
    // left: distância da borda esquerda do container até a direita do botão "yes" + gap
    const left = (yesRect.right - containerRect.left) + gap;
    // top: alinhar verticalmente ao centro do yesBtn
    const top = (yesRect.top - containerRect.top) + (yesRect.height - btnHeight) / 2;

    // aplica posição inicial (usa left/top para respeitar absolute)
    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
}

// Função que move o botão "No" para uma posição aleatória
// usando left/top (mantendo-o dentro do viewport)
function moveNoButton() {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // limites para que o botão fique totalmente visível na janela
    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // usa left/top para mover, animado pelo CSS transition
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Eventos
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); }, {passive:false});

// Quando clicar em YES: esconde a pergunta e mostra o resultado
yesBtn.addEventListener("click", () => {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
});

// posiciona inicialmente e reposiciona ao redimensionar
window.addEventListener("load", () => placeNoBesideYes(20));   // gap em px
window.addEventListener("resize", () => placeNoBesideYes(20));