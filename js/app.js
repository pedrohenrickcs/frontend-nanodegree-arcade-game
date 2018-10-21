// As variáveis aplicadas a nossas instâncias entram aqui.
// Fornecemos uma a você para que possa começcar.
const x = 200;
const y = 410;
const level = 1;

// Inimigos que nosso jogador deve evitar
class Enemy {

    constructor(x, y, run) {
        this.sprite = 'images/enemy-bug.png';
        this.positionX = x;
        this.positionY = y;
        this.run = run;  
    }

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.        

        this.positionX += this.run * dt;
        this.positionX >= 500 ? this.positionX = 0 : '';
        
    };

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    // Desenhe o inimigo na tela, método exigido pelo jogo
    render() {        
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    };
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

// classe que inicializa o game
class Player {
    
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.positionX = x;
        this.positionY = y;
        this.eventWin = new Event('win');
    }
    
    update() {
        // verifica se o jogador chegou do outro lado
        if (this.positionY < 50) {
            player.positionX = x;
            player.positionY = y;  
            
            leveuUp();

            alertify
            .alert('Parabéns, você subiu de nível!! :)', function(){
                alertify.message('Próximo level');
            });
                      
            document.dispatchEvent(this.eventWin);

            // reseta o jogo caso o jogador chegue ao nível '10'
            if (document.getElementById('level').textContent === '10') {

                document.getElementById('level').innerHTML = level = 1;

                // reseta a velocidade do inimigo
                for (let enemy in allEnemies) {
                    window.allEnemies = [new Enemy(0, 60, 150), new Enemy(0, 140, 170), new Enemy(0, 220, 200)];
                }

                alertify
                    .alert('Parabéns, você venceu!! :)', function () {
                        alertify.message('Win');
                    });
            }
        }        
    }
    
    // renderiza o jogador
    render() {        
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }

    // movimenta o jogador conforme tecla que for pressionada
    handleInput(key) {       
        
        if ( key === 'up' && this.positionY >= 50) {            
            this.positionY -= 90;
        }

        if ( key === 'down' && this.positionY <= 350) {
            this.positionY += 90;
        }

        if ( key === 'left' && this.positionX >= 50) {
            this.positionX -= 101;
        }

        if ( key === 'right' && this.positionX <= 350) {
            this.positionX += 101;
        }
    }
};

// aumenta a velocidade dos enemies, caso suba de nível
const leveuUp = () => {
    for (const enemy in allEnemies) {
        if (allEnemies.hasOwnProperty(enemy)) {
            const element = allEnemies[enemy];
            element.run += 50;
        }
    }
}

// escuta o evento caso o jogador avance o nivel
document.addEventListener('win', (e) => {

    e.type === 'win' ? document.getElementById('level').innerHTML = level = level + 1 : '';

}, false);

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

// inicializando a classe Player criada
const player = new Player();

var allEnemies = [
    new Enemy(0, 60, 150),
    new Enemy(0, 140, 170),
    new Enemy(0, 220, 200)
];

// verifica caso o jogador entre em colisão com o inimigo
const checkCollisions = (allEnemies, player) => {

	for(const enemy of allEnemies) {
        
        if ((player.positionX >= enemy.positionX - 50 && player.positionX <= enemy.positionX + 50) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {

            document.getElementById('level').innerHTML = level = 1;

            // reseta a posição do jogador
            player.positionX = x;
            player.positionY = y;
            
            // reseta a velocidade do inimigo
            for (let enemy in allEnemies) {
                window.allEnemies = [new Enemy(0, 60, 150), new Enemy(0, 140, 170), new Enemy(0, 220, 200)];
            }

            // exibe uma mensagem caso o jogador toque no inimigo
            alertify
                .alert('Poxa! mas não desista, você consegue!! :)', function () {
                    alertify.message('OK');
                });
            
		}
    }
    
}

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    
});
