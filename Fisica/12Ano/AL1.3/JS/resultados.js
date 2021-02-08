// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal


// Constantes para a Simulação
const RESOLUCAO = 15                        // Tamanho do deltaT em cada update


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F12_AL12 = {
    preparado: false,
    divCurva: [],
    processandoAnim: false
}

let massaCarrinho, massaCarrinhoResp
let velocidadeInicial, velocidadeInicialResp
let massaOutroCarrinho, massaOutroCarrinhoResp
let coefRestituicao, coefRestituicaoResp

let EcConservadaResp

let montagemBtns
let dadosBtn

// Ligar ou desligar a aquisição de dados
let recolherDados = false

let simula, ctx
function prepararResultados() {
    if (F12_AL12.preparado) {
        return
    }

    // Selecionar Sliders
    massaCarrinho = document.getElementById('massaCarrinho')
    velocidadeInicial = document.getElementById('velocidadeInicial')
    massaOutroCarrinho = document.getElementById('massaOutroCarrinho')
    coefRestituicao = document.getElementById('coefRestituicao')

    // Selecionar os Spans com os Valores dos Sliders
    massaCarrinhoResp = document.getElementById('massaCarrinhoValue')
    velocidadeInicialResp = document.getElementById('velocidadeInicialValue')
    massaOutroCarrinhoResp = document.getElementById('massaOutroCarrinhoValue')

    // Selecionar os Spans com os Resultados da Tabela
    EcConservadaResp = document.getElementById('EcConservadaValue')
    coefRestituicaoResp = document.getElementById('coefRestituicaoValue')

    // Selecionar a div que vai ter a Curva
    F12_AL12.divCurva.push(document.getElementById('curva-ft'))
    F12_AL12.divCurva.push(document.getElementById('curva-ct'))

    // Selecionar os Butões que permitem escolher o Procedimento
    montagemBtns = document.getElementsByName('montagens')

    // Botão associado ao recolher dados
    dadosBtn = document.getElementById('interruptor')
    dadosBtn.estado = '0'

    dadosBtn.onclick = () => {
        if (dadosBtn.estado == '0') {
            dadosBtn.estado = '1'
            dadosBtn.innerText = 'Desligar'
            // simula.dados.reiniciar()
            graficos = window.graficos(F12_AL12.divCurva)
            recolherDados = true
        } else {
            dadosBtn.estado = '0'
            dadosBtn.innerText = 'Ligar'
            recolherDados = false
        }
    }

    // Atualizar os Sliders
    massaCarrinho.oninput = () => {
        let massaCarrinhoValue = massaCarrinho.value / 1

        massaCarrinhoResp.innerText = `${massaCarrinhoValue.toFixed(0)}`
    }
    velocidadeInicial.oninput = () => {
        let velocidadeInicialValue = velocidadeInicial.value / 100

        console.log(velocidadeInicialValue)
    
        velocidadeInicialResp.innerText = `${velocidadeInicialValue.toFixed(2)}`
    }
    massaOutroCarrinho.oninput = () => {
        let massaOutroCarrinhoValue = massaOutroCarrinho.value / 1
    
        massaOutroCarrinhoResp.innerText = `${massaOutroCarrinhoValue.toFixed(0)}`
    }
    
    
    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO, {
        mOutroCarrinho: massaOutroCarrinho,
        coefRestituicao: coefRestituicao
    })
    F12_AL12.preparado = true
    loopSimula()
}

let montagemEscolhida = 0

// Esolher a montagem a estudar
function montagem(num) {
    if (num == montagemEscolhida) return
    else {
        if (F12_AL12.processandoAnim) return
        F12_AL12.processandoAnim = true

        montagemBtns[montagemEscolhida].className = 'escolha'
        montagemBtns[num].className = 'escolha-atual'

        // Esconder e mostrar a opção selecionada
        mostrarExtra(`Montagem${montagemEscolhida}`)
        window.setTimeout(mostrarExtra, mostrarExtraTempo, `Montagem${num}`)
        window.setTimeout(function() {
            F12_AL12.processandoAnim = false
        }, mostrarExtraTempo * 2)

        montagemEscolhida = num
    }

    simula.reiniciar(montagemEscolhida)
}


// Corrige o tamanho do Canvas e corrige o DPI
function fixDPI() {
    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Obter o DPI do ecrã
    let DPI = window.devicePixelRatio

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasSim.parentElement).getPropertyValue('height').slice(0, -2) - 4
    // Larura do CSS
    let largura_css = +getComputedStyle(canvasSim.parentElement).getPropertyValue('width').slice(0, -2)

    // Altera o tamanho do canvas
    canvasSim.width = largura_css * DPI
    canvasSim.height = altura_css * DPI

    simula.novoTamanho()
}


// Reiniciar a Simulação
function reiniciar() {
    simula.reiniciar(montagemEscolhida)
    
    let EcConservada
    let e
    if (montagemEscolhida == 0) {
        e = 0
        EcConservada = massaCarrinho.value / (massaCarrinho.value / 1 + massaOutroCarrinho.value / 1) * 100
    } else {
        e = coefRestituicao.value / 1000
        EcConservada = e**2 * 100
    }

    coefRestituicaoResp.innerText = e.toFixed(2)
    EcConservadaResp.innerText = EcConservada.toFixed(2)

    velocidadeInicial.value = velocidadeInicial.min
    velocidadeInicialResp.innerText = `${Number(velocidadeInicial.min).toFixed(2)}`
}


// Criar o loop da Simulação
let ultimoTempo, graficos

function loopSimula(tempo) {
    if (ultimoTempo === undefined) {
        ultimoTempo = tempo
        fixDPI()
        if (!graficos) graficos = window.graficos(F12_AL12.divCurva)
        requestAnimationFrame(loopSimula)
        reiniciar()
        return
    }

    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo
    
    let dados
    for (let i = 0; i < RESOLUCAO; i++) {
        dados = simula.update(deltaTempo)
    }
    if (dados && recolherDados) {
        window.atualizarGraficos(graficos, dados[0], dados.slice(1, dados.lenght))
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

window.onresize = fixDPI