const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionBox = document.getElementById("questionBox");
const resultBox = document.getElementById("resultBox");

/*
 Função que move o botão "No" para uma posição aleatória
 dentro do viewport, sem deixar ele sair da tela
*/
function moveNoButton() {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;

    // Gera posições aleatórias dentro do viewport
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Move suavemente usando transform
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/*
 Evento para desktop (mouse chegando perto)
*/
noBtn.addEventListener("mouseenter", moveNoButton);

/*
 Evento para mobile (tentativa de toque)
*/
noBtn.addEventListener("touchstart", moveNoButton);

/*
 Quando clicar em YES:
 esconde a pergunta e mostra o resultado
*/
yesBtn.addEventListener("click", () => {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
});