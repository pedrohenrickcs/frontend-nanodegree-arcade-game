// Inimigos que nosso jogador deve evitar
const x = 200;
const y = 410;

class Enemy {

    constructor(x, y, run) {
        this.sprite = 'images/enemy-bug.png';
        this.positionX = x;
        this.positionY = y;
        this.run = run;  
    }
    
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.        

        this.positionX += this.run * dt;

        if (this.positionX >= 500) {
            this.positionX = 0;
        }
        
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

// function that initializes the game
class Player {
    
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.positionX = x;
        this.positionY = y;
    }
    
    update() {
        // console.log('update');        
    }
    
    render() {        
        // console.log('render');        
        ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
    }

    
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

        if (this.positionY < 50) {
            player.positionX = x;
            player.positionY = y;
        }   
    }
};

const player = new Player();

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
var allEnemies = [
    new Enemy(0, 60, 150),
    new Enemy(0, 140, 200),
    new Enemy(0, 140, 100),
    new Enemy(0, 220, 130)
];

const checkCollisions = (allEnemies, player) => {   

	for(const enemy of allEnemies) {

		if ((player.positionX >= enemy.positionX - 50 && player.positionX <= enemy.positionX + 50) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {
            
            console.log('foi', player.positionX);

            player.positionX = x;
            player.positionY = y;
            
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
