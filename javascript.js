const canvas = document.getElementById("canvas")
const container = canvas.getContext("2d")
container.font = "30px Arial"

var jogador1 = {
    x: 10,
    y: 200,
    altura: 100,
    largura: 10,
    pontos: 0
}

var jogador2 = {
    x: 880,
    y: 200,
    altura: 100,
    largura: 10,
    pontos: 0
}

var bola = {
    x: 430,
    y: 230,
    altura: 20,
    largura: 20,
    dirX: 1,
    dirY: 1
}

var pause = false

function colisaoCima() {
    if (bola.y <= 0) {
        bola.dirY *= -1
    }
}

function colisaoBaixo() {
    if (bola.y >= canvas.height - bola.altura) {
        bola.dirY *= -1
    }
}

function colisaoDireita() {
    if (bola.x >= canvas.width - bola.largura) {
        bola.dirX *= -1
        jogador1.pontos += 1
    }
}

function colisaoEsquerda() {
    if (bola.x <= 0) {
        bola.dirX *= -1
        jogador2.pontos += 1
    }
}

function colisaoJogador1() {
    // colisão da bolinha com o jogador 2
    if (
        (bola.x + bola.largura) >= jogador2.x &&
        bola.y >= jogador2.y &&
        bola.y <= jogador2.y + jogador2.altura
    ) {
        bola.dirX *= -1
    }
}

function colisaoJogador2() {
    // colisão da bolinha com o jogador 1
    if (
        bola.x <= (jogador1.x + jogador1.largura) &&
        bola.y >= jogador1.y &&
        bola.y <= (jogador1.y + jogador1.altura)
    ) {
        bola.dirX *= -1
    }
}

function moverBola() {
    bola.x += bola.dirX
    bola.y += bola.dirY
    colisaoCima()
    colisaoBaixo()
    colisaoDireita()
    colisaoEsquerda()
    colisaoJogador1()
    colisaoJogador2()
}

function desenharNaTela() {
    container.clearRect(0, 0, canvas.width, canvas.height)
    // jogador 1
    container.fillRect(jogador1.x, jogador1.y, jogador1.largura, jogador1.altura)
    // jogador 2
    container.fillRect(jogador2.x, jogador2.y, jogador2.largura, jogador2.altura)
    // bola
    container.fillRect(bola.x, bola.y, bola.largura, bola.altura)
    // pontos
    container.fillText("PONT0S: " + jogador1.pontos, 30, 30)
    container.fillText("PONTOS: " + jogador2.pontos, 680, 30)
    // bola info
    container.fillText("X: " + bola.x + "dirX: " + bola.dirX, 320, 30)
    if (pause == false) {
        moverBola()
    }
}

setInterval(desenharNaTela, 1)

document.addEventListener("keydown", function (e) { })