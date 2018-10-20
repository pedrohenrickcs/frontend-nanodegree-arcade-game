// Inimigos que nosso jogador deve evitar
const x = 200;
const y = 410;
let level = 1;

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
        if (this.positionY < 50) {
            player.positionX = x;
            player.positionY = y;  
            console.log(player.positionY = y);

            alertify
            .alert('Parabéns, você venceu!! :)', function(){
                alertify.message('OK');
            });
                      
            document.dispatchEvent(this.eventWin);
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

document.addEventListener('win', (e) => {

    if (e.type === 'win') {
        document.getElementById('level').innerHTML = level = level + 1;
        console.log(level);
    }

}, false);

document.addEventListener('loose', (e) => {

    if (e.type === 'loose') {
        document.getElementById('level').innerHTML = level = level - 1;
        console.log(level);
    }

}, false);

// inicializando a classe Player criada
const player = new Player();

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

var allEnemies = [
    new Enemy(0, 60, Math.floor(Math.random() * 300) + 100),
    new Enemy(0, 140, Math.floor(Math.random() * 300) + 100),
    new Enemy(0, 140, Math.floor(Math.random() * 300) + 100),
    new Enemy(0, 220, Math.floor(Math.random() * 300) + 100)
];

const checkCollisions = (allEnemies, player) => {

	for(const enemy of allEnemies) {

		if ((player.positionX >= enemy.positionX - 50 && player.positionX <= enemy.positionX + 50) && (player.positionY >= enemy.positionY - 50 && player.positionY <= enemy.positionY + 50)) {

            player.positionX = x;
            player.positionY = y;

            this.eventLoose = new Event('loose');

            if (document.getElementById('level').textContent > 1) {
                document.dispatchEvent(this.eventLoose);
            }

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
