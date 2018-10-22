// As variáveis aplicadas a nossas instâncias entram aqui.
// Fornecemos uma a você para que possa começar.
let level = 1;

// Superclasse para extender 'Enemy' e 'Player'
class Game {
    constructor(sprite, positionX, positionY) {
        this.sprite = sprite;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }
}

// Inimigos que nosso jogador deve evitar
class Enemy extends Game {

    constructor(sprite, positionX, positionY, run) {
        super(sprite = 'images/enemy-bug.png', positionX = positionX, positionY = positionY);
        this.run = run;
        this.initialRun = run;
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
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().

// classe que inicializa o game
class Player extends Game {
    
    constructor(sprite, positionX, positionY) {
        super(sprite = 'images/char-boy.png', positionX = positionX, positionY = positionY);
        this.initialPositionX = positionX;
        this.initialPositionY = positionY;
        this.eventWin = new Event('win');
        
    }
    
    update() {
        // verifica se o jogador chegou do outro lado
        if (this.positionY < 50) {
            this.positionX = this.initialPositionX;
            this.positionY = this.initialPositionY;  
            
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
                    // window.allEnemies = [new Enemy('images/enemy-bug.png', 0, 60, 150), new Enemy('images/enemy-bug.png', 0, 140, 170), new Enemy('images/enemy-bug.png', 0, 220, 200)];
                    enemy.run = enemy.initialRun;
                    console.log('enemy', enemy);
                    
                }

                alertify
                    .alert('Parabéns, você venceu!! :)', function () {
                        alertify.message('Win');
                    });
            }
        }        
    }

    // movimenta o jogador conforme tecla que for pressionada
    handleInput(key) {       

        key === 'up' && this.positionY >= 50 ? this.positionY -= 90 : '';
        key === 'down' && this.positionY <= 350 ? this.positionY += 90 : '';
        key === 'left' && this.positionX >= 50 ? this.positionX -= 101 : '';
        key === 'right' && this.positionX <= 350 ? this.positionX += 101 : '';

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
const player = new Player('images/char-boy.png', 200, 410);

var allEnemies = [
    new Enemy('images/enemy-bug.png' , 0, 60, 150),
    new Enemy('images/enemy-bug.png' , 0, 140, 170),
    new Enemy('images/enemy-bug.png' , 0, 220, 200)
];

// verifica caso o jogador entre em colisão com o inimigo
const checkCollisions = (allEnemies, player) => {

	for(const enemy of allEnemies) {
        
        if ((player.positionX >= enemy.positionX - 50 && player.positionX <= enemy.positionX + 50) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {

            document.getElementById('level').innerHTML = level = 1;

            // reseta a posição do jogador
            player.positionX = player.initialPositionX;
            player.positionY = player.initialPositionY;
            
            // reseta a velocidade do inimigo
            for (let element of allEnemies) {
                element.run = element.initialRun;
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
