// Inimigos que nosso jogador deve evitar

class Enemy {

    constructor(x, y, velocity) {
        this.sprite = 'images/enemy-bug.png';
        this.positionX = x;
        this.positionY = y;
        this.velocity = velocity;  
    }
    
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.        

        this.positionX += this.velocity * dt;

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
class Player {
    
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.positionX = 100;
        this.positionY = 400;
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
            this.positionY -= 80;
        }

        if ( key === 'down' && this.positionY <= 350) {
            this.positionY += 80;
        }

        if ( key === 'left' && this.positionX >= 50) {
            this.positionX -= 100;
        }

        if ( key === 'right' && this.positionX <= 350) {
            this.positionX += 100;
        }
    }
};

const player = new Player();


// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
var allEnemies = [
    new Enemy(10, 50, 55),
    new Enemy(60, 100, 75),
    new Enemy(50, 150, 300),
    new Enemy(300, 300, 200)
];

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
