// Inimigos que nosso jogador deve evitar

class Enemy {
    
    // As variáveis aplicadas a nossas instâncias entram aqui.
    // Fornecemos uma a você para que possa começcar.

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
    };

    // A imagem/sprite de nossos inimigos, isso usa um
    // ajudante que é fornecido para carregar imagens
    // com facilidade.
    // Desenhe o inimigo na tela, método exigido pelo jogo
    render(sprite) {
        sprite = 'images/enemy-bug.png'
        console.log('render');    
        ctx.drawImage(Resources.get(sprite), 30, 60);
    };
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
class Player {
    
    constructor(sprite = 'images/enemy-bug.png') {
        console.log('sprite', sprite);   
    }
    
    update() {
        console.log('update');        
    }

    // render() {
    //     console.log('render');    
    // }

    // handleInput() {
    //     console.log('handleInput');        
    // }
};

const player = new Player();

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.
var allEnemies = [
    new Enemy(0,0)
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
