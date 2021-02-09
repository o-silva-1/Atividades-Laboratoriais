// Montagem 2
export default class Montagem2 {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Carrinho
        this.carrinho = {
            posXi: 10,
            largura: 150 * (this.simula.inputs.m / this.simula.inputs.mMax) ** (1/3),
            altura: 75 * (this.simula.inputs.m / this.simula.inputs.mMax) ** (1/3),
            cor: 'rgb(255, 130, 35)'
        }

        // Definições do Plano Horizontal
        this.plano = {
            posY: 40,
            altura: 20,
            cor: 'rgb(10, 100, 230)'
        }

        // Definições do Alvo
        this.alvo = {
            posX: this.simula.largura - 20,
            largura: 20,
            altura: 80,
            cor: 'rgb(0, 0, 0)'
        }

        // Cores dos vetores
        this.corVetores = {
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'rgb(250, 70, 10)',
        }

        // Multiplicador do tamanho dos vetores
        this.tamanhoVetor = 3
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.m = this.simula.inputs.m
        this.vi = this.simula.inputs.vi
        this.e = this.simula.inputs.e

        // Cinemática inicial
        this.posicao = this.carrinho.posXi
        this.velocidade = this.vi
        this.colidiu = false
    }

    update(deltaTempo) {
        if (!this.colidiu && this.posicao + this.carrinho.largura >= this.alvo.posX) {
            this.colidiu = true
            this.velocidade *= -this.e
        }

        this.posicao += this.velocidade * deltaTempo
    }

    desenhar(ctx) {
        // Desenhar o plano
        ctx.fillStyle = this.plano.cor
        ctx.fillRect(0, this.simula.altura - this.plano.posY, this.simula.largura, this.plano.altura)

        // Desenhar o alvo
        ctx.fillStyle = this.alvo.cor
        ctx.fillRect(this.alvo.posX, this.simula.altura - this.plano.posY - this.alvo.altura, this.alvo.largura, this.alvo.altura)

        // Calcular as posições dos carrinhos
        let xCarrinho = this.posicao
        let yCarrinho = this.simula.altura - this.plano.posY - this.carrinho.altura

        // Desenhar o Carrinho no local indicado pela posição
        ctx.fillStyle = this.carrinho.cor
        ctx.fillRect(xCarrinho, yCarrinho, this.carrinho.largura, this.carrinho.altura)

        // Ajustar as posições para o topo centro do bloco
        xCarrinho += this.carrinho.largura / 2

        // Desenhar o Vetor Velocidade do Carrinho
        if (this.velocidade != 0) {
            let posVetor = 0.8

            this.simula.desenharVetor(xCarrinho, yCarrinho * posVetor, xCarrinho + this.velocidade * this.tamanhoVetor, yCarrinho * posVetor, this.corVetores.velocidade)
        }
    }
}