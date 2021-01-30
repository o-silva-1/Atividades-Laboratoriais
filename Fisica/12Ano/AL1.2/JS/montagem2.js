// Montagem 2
export default class Montagem2 {
    constructor(simula) {
        // Simulação
        this.simula = simula

        // Definições do Bloco
        this.bloco = {
            posXi: 10,
            largura: 150 * (this.simula.inputs.m / 2) ** (1/3),
            altura: 75 * (this.simula.inputs.m / 2) ** (1/3),
            cor: 'rgb(255, 130, 35)'
        }

        // Definições do Plano Horizontal
        this.plano = {
            posY: 40,
            altura: 20,
            cor: 'rgb(10, 100, 230)'
        }

        // Cores dos vetores
        this.corVetores = {
            forca: 'rgb(0, 120, 255)',
            fa: 'black',
            velocidade: 'rgb(145, 200, 20)',
            aceleracao: 'rgb(250, 70, 10)',
        }

        // Multiplicador do tamanho dos vetores
        this.tamanhoVetor = 10

        // Zoom Out
        this.zoomOut = 1
        
        this.reiniciar()
    }

    // Reiniciar a Bola
    reiniciar() {
        // Inputs
        this.g = this.simula.inputs.g
        this.m = this.simula.inputs.m
        this.cae = this.simula.inputs.cae
        this.cac = this.simula.inputs.cac

        // Valores Constantes
        this.normal = this.m * this.g
        this.faemax = this.normal * this.cae
        this.fac = this.normal * this.cac

        // Cinemática inicial
        this.posicao = this.bloco.posXi
        this.velocidade = 0
        this.aceleracao = 0
    }

    update(deltaTempo) {
        // Massa Areia
        this.massaAreia = this.simula.inputVariavel.massaAreia.value / 1000

        // A Velocidade e a Aceleração não podem ser negativas
        if (this.velocidade < 0) {
            this.velocidade = 0
        }
        if (this.aceleracao < 0) {
            this.aceleracao = 0
        }

        // Determinar a Força de Atrito
        if (this.velocidade > 0) {
            this.fa = - this.fac
            this.aceleracao = (this.massaAreia * this.g + this.fa) / (this.m + this.massaAreia)
        } else if (this.massaAreia <= this.cae * this.m) {
            this.fa = -this.massaAreia * this.g
            this.aceleracao = 0
        } else {
            this.fa = - this.faemax
            this.aceleracao = (this.massaAreia * this.g + this.fa) / (this.m + this.massaAreia)
        }
        
        this.fr = this.m * this.aceleracao
        this.forca = this.fr - this.fa

        this.posicao += this.velocidade * deltaTempo + 0.5 * this.aceleracao * deltaTempo ** 2

        this.velocidade += this.aceleracao * deltaTempo
    }

    desenhar(ctx) {
        // Desenhar o plano
        ctx.fillStyle = this.plano.cor
        ctx.fillRect(0, this.simula.altura - this.plano.posY, this.simula.largura, this.plano.altura)

        // Desenhar o Bloco no local indicado pela posição
        let xBloco = this.posicao / this.zoomOut
        let yBloco = this.simula.altura - this.plano.posY - this.bloco.altura
        ctx.fillStyle = this.bloco.cor
        ctx.fillRect(xBloco, yBloco, this.bloco.largura, this.bloco.altura)

        // Desenhar os vetores Força, Fa e Aceleração
        xBloco += this.bloco.largura / 2
        yBloco += this.bloco.altura / 2

        if (this.forca != 0) {
            this.simula.desenharVetor(xBloco, yBloco, xBloco + this.forca * this.tamanhoVetor, yBloco, this.corVetores.forca)
        }
        if (this.fa != 0) {
            this.simula.desenharVetor(xBloco, yBloco, xBloco + this.fa * this.tamanhoVetor, yBloco, this.corVetores.fa)
        }
        if (this.velocidade != 0) {
            let posVetor = 0.8

            this.simula.desenharVetor(xBloco, yBloco * posVetor, xBloco + this.velocidade * this.tamanhoVetor, yBloco * posVetor, this.corVetores.velocidade)
        }
        if (this.aceleracao != 0) {
            let posVetor = 0.8

            this.simula.desenharVetor(xBloco, yBloco * posVetor, xBloco + this.aceleracao * this.tamanhoVetor, yBloco * posVetor, this.corVetores.aceleracao)
        }
    }
}