// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const simBtn = document.getElementById('sim');
    const naoBtn = document.getElementById('nao');
    const resetBtn = document.getElementById('reset');
    const messageDiv = document.getElementById('message');
    const gif = document.querySelector('.gif');
    const h1 = document.querySelector('h1');
    const buttonsDiv = document.querySelector('.buttons');
    
    // Estado
    let yesClicked = false;
    let isMobile = false;
    
    // Verificar se é dispositivo móvel
    function checkMobile() {
        isMobile = window.innerWidth <= 768 || 
                  ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
    
    // GIFs para diferentes estados
    const gifs = {
        default: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        yesClicked: "https://media.giphy.com/media/26tknCqiJrBQG6DrC/giphy.gif",
        noEscape: "https://media.giphy.com/media/3o7TKz8aXhq4kfQFDq/giphy.gif"
    };
    
    // Mover o botão "Não" para uma posição aleatória
    function moveNoButton() {
        if (yesClicked) return;
        
        // Dimensões da área dos botões
        const buttonsRect = buttonsDiv.getBoundingClientRect();
        const naoBtnRect = naoBtn.getBoundingClientRect();
        const simBtnRect = simBtn.getBoundingClientRect();
        
        // Limites para o movimento
        const minX = 0;
        const maxX = buttonsRect.width - naoBtnRect.width;
        const minY = 0;
        const maxY = buttonsRect.height - naoBtnRect.height;
        
        // Gerar nova posição
        let newX, newY;
        let attempts = 0;
        const maxAttempts = 20;
        
        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            attempts++;
            
            // Verificar se não está sobrepondo o botão Sim
            const simBtnX = simBtnRect.left - buttonsRect.left;
            const simBtnY = simBtnRect.top - buttonsRect.top;
            
            const overlap = (
                newX < simBtnX + simBtnRect.width &&
                newX + naoBtnRect.width > simBtnX &&
                newY < simBtnY + simBtnRect.height &&
                newY + naoBtnRect.height > simBtnY
            );
            
            // Se não houver sobreposição ou muitas tentativas, aceitar
            if (!overlap || attempts >= maxAttempts) {
                break;
            }
        } while (attempts < maxAttempts);
        
        // Aplicar nova posição
        naoBtn.style.left = `${newX}px`;
        naoBtn.style.top = `${newY}px`;
        
        // Mudar GIF se for a primeira fuga
        if (gif.src === gifs.default) {
            gif.src = gifs.noEscape;
            h1.textContent = "Please say yes! ❤️";
        }
    }
    
    // Lidar com clique no "Sim"
    function handleYesClick() {
        if (yesClicked) return;
        
        yesClicked = true;
        
        // Mostrar mensagem
        messageDiv.classList.remove('hidden');
        
        // Mudar GIF e texto
        gif.src = gifs.yesClicked;
        h1.textContent = "Yay! I love you! ❤️";
        
        // Parar o botão "Não" de fugir
        naoBtn.style.position = 'relative';
        naoBtn.style.left = '0';
        naoBtn.style.top = '0';
        naoBtn.style.transition = 'all 0.5s ease';
        naoBtn.style.opacity = '0.7';
        
        // Remover eventos do botão "Não"
        naoBtn.removeEventListener('mouseenter', moveNoButton);
        naoBtn.removeEventListener('touchstart', handleTouchStart);
        
        // Mudar texto do botão "Sim"
        simBtn.innerHTML = '<i class="fas fa-heart"></i> I love you too!';
        
        // Remover movimento do mouse se não for mobile
        if (!isMobile) {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }
    
    // Lidar com reset
    function handleReset() {
        yesClicked = false;
        
        // Esconder mensagem
        messageDiv.classList.add('hidden');
        
        // Resetar GIF e texto
        gif.src = gifs.default;
        h1.textContent = "Do you love me?";
        
        // Resetar botão "Não"
        naoBtn.style.position = 'absolute';
        naoBtn.style.left = '';
        naoBtn.style.top = '';
        naoBtn.style.opacity = '';
        naoBtn.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
        
        // Resetar botão "Sim"
        simBtn.innerHTML = '<i class="fas fa-heart"></i> Yes';
        
        // Re-adicionar eventos
        setupEventListeners();
    }
    
    // Lidar com toque em mobile
    function handleTouchStart(e) {
        e.preventDefault();
        moveNoButton();
    }
    
    // Lidar com movimento do mouse (fuga quando perto)
    function handleMouseMove(e) {
        if (yesClicked) return;
        
        const naoBtnRect = naoBtn.getBoundingClientRect();
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        
        // Centro do botão "Não"
        const btnCenterX = naoBtnRect.left + naoBtnRect.width / 2;
        const btnCenterY = naoBtnRect.top + naoBtnRect.height / 2;
        
        // Distância entre cursor e botão
        const distance = Math.sqrt(
            Math.pow(cursorX - btnCenterX, 2) + 
            Math.pow(cursorY - btnCenterY, 2)
        );
        
        // Se cursor estiver a menos de 80px, mover botão
        if (distance < 80) {
            moveNoButton();
        }
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Botão Sim
        simBtn.addEventListener('click', handleYesClick);
        
        // Botão Não - evento de hover/toque
        if (isMobile) {
            naoBtn.addEventListener('touchstart', handleTouchStart);
        } else {
            naoBtn.addEventListener('mouseenter', moveNoButton);
            document.addEventListener('mousemove', handleMouseMove);
        }
        
        // Botão Reset
        resetBtn.addEventListener('click', handleReset);
    }
    
    // Lidar com redimensionamento da tela
    function handleResize() {
        checkMobile();
        
        // Remover eventos antigos
        naoBtn.removeEventListener('mouseenter', moveNoButton);
        naoBtn.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('mousemove', handleMouseMove);
        
        // Reconfigurar eventos baseado no novo tamanho
        if (!yesClicked) {
            if (isMobile) {
                naoBtn.addEventListener('touchstart', handleTouchStart);
            } else {
                naoBtn.addEventListener('mouseenter', moveNoButton);
                document.addEventListener('mousemove', handleMouseMove);
            }
        }
    }
    
    // Inicializar
    checkMobile();
    setupEventListeners();
    
    // Configurar evento de redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Adicionar alguns corações flutuantes para efeito
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.container');
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.color = 'rgba(255, 64, 129, 0.2)';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.zIndex = '0';
            heart.style.animation = `float ${Math.random() * 5 + 3}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            heartsContainer.appendChild(heart);
        }
        
        // Adicionar animação de flutuação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(10deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Criar corações flutuantes após carregamento
    setTimeout(createFloatingHearts, 500);
});