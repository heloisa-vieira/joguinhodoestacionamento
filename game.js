const carros = [
    { id: 'carro1', x: 900, y: 250, rotation: 0, vagaCorreta: 1 },
    { id: 'carro2', x: 900, y: 400, rotation: 0, vagaCorreta: 3 },
    { id: 'carro3', x: 1050, y: 250, rotation: 0, vagaCorreta: 5 },
    { id: 'carro4', x: 1050, y: 400, rotation: 0, vagaCorreta: 7 },
    { id: 'carro5', x: 1200, y: 325, rotation: 0, vagaCorreta: 9 }
];
let carroAtivo = 0;


const velocidade = 15;


const teclasPressionadas = {};


carros.forEach(carro => {
    const elemento = document.getElementById(carro.id);
    elemento.style.left = carro.x + 'px';
    elemento.style.top = carro.y + 'px';
});


document.addEventListener('keydown', (e) => {
    teclasPressionadas[e.key] = true;
    
    // ESPAÇO troca de carro
    if (e.key === ' ') {
        e.preventDefault();
        trocarCarro();
    }
});

document.addEventListener('keyup', (e) => {
    teclasPressionadas[e.key] = false;
});


function mover() {
    const carro = carros[carroAtivo];
    const elemento = document.getElementById(carro.id);

    // Mover para CIMA
    if (teclasPressionadas['ArrowUp']) {
        carro.y -= velocidade;
        carro.rotation = 0;
    }
    
    // Mover para BAIXO
    if (teclasPressionadas['ArrowDown']) {
        carro.y += velocidade;
        carro.rotation = 180;
    }
    
    // Mover para ESQUERDA
    if (teclasPressionadas['ArrowLeft']) {
        carro.x -= velocidade;
        carro.rotation = 270;
    }
    
    // Mover para DIREITA
    if (teclasPressionadas['ArrowRight']) {
        carro.x += velocidade;
        carro.rotation = 90;
    }

    // Impedir que o carro saia da tela
    carro.x = Math.max(0, Math.min(window.innerWidth - 80, carro.x));
    carro.y = Math.max(0, Math.min(window.innerHeight - 120, carro.y));

    // Atualizar posição visual do carro
    elemento.style.left = carro.x + 'px';
    elemento.style.top = carro.y + 'px';
    elemento.style.transform = `rotate(${carro.rotation}deg)`;

    // Verificar se estacionou
    verificarEstacionamento();

    // Continuar o loop
    requestAnimationFrame(mover);
}


function trocarCarro() {
    // Remove destaque do carro atual
    document.getElementById(carros[carroAtivo].id).classList.remove('ativo');
    
    // Vai para o próximo carro (volta ao primeiro quando chegar no último)
    carroAtivo = (carroAtivo + 1) % carros.length;
    
    // Adiciona destaque ao novo carro
    document.getElementById(carros[carroAtivo].id).classList.add('ativo');
}

// ========================================
// VERIFICAR SE ESTACIONOU
// ========================================
function verificarEstacionamento() {
    const carro = carros[carroAtivo];
    const elemento = document.getElementById(carro.id);
    const vagas = document.querySelectorAll('.vaga');
    
    vagas.forEach(vaga => {
        // Pegar posição da vaga e do carro
        const vagaRect = vaga.getBoundingClientRect();
        const carroRect = elemento.getBoundingClientRect();
        
        // Calcular centro da vaga
        const vagaCentroX = vagaRect.left + vagaRect.width / 2;
        const vagaCentroY = vagaRect.top + vagaRect.height / 2;
        
        // Calcular centro do carro
        const carroCentroX = carroRect.left + carroRect.width / 2;
        const carroCentroY = carroRect.top + carroRect.height / 2;
        
        // Calcular distância entre os centros
        const distancia = Math.sqrt(
            Math.pow(vagaCentroX - carroCentroX, 2) + 
            Math.pow(vagaCentroY - carroCentroY, 2)
        );
        
        // Se o carro está próximo da vaga (menos de 60 pixels)
        if (distancia < 60) {
            const numeroVaga = parseInt(vaga.getAttribute('data-vaga'));
            
            // Verifica se é a vaga correta para este carro
            if (numeroVaga === carro.vagaCorreta) {
                // ESTACIONOU CORRETAMENTE!
                
                // Vaga fica VERMELHA
                vaga.classList.add('ocupada');
                
                // Centraliza o carro na vaga
                carro.x = vagaRect.left + (vagaRect.width - 80) / 2;
                carro.y = vagaRect.top + (vagaRect.height - 120) / 2;
                elemento.style.left = carro.x + 'px';
                elemento.style.top = carro.y + 'px';
                elemento.style.transform = 'rotate(0deg)';
                carro.rotation = 0;
            }
        }
    });
}


mover();
