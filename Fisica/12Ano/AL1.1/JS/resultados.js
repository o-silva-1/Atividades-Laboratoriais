// Definir Constantes
const g = 9.80665   // Aceleração Gravitaconal


// Constantes para a Simulação
const RESOLUCAO = 15                        // Tamanho do deltaT em cada update


// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let F12_AL11 = {
    preparado: false
}

let dEsfera, dEsferaResp
let hInicial, hInicialResp
let hLanc, hLancResp

let tempoPassagemResp, alcanceResp

let simula, ctx
function prepararResultados() {
    if (F12_AL11.preparado) {
        return
    }

    // Selecionar Sliders
    dEsfera = document.getElementById('dEsfera')
    hInicial = document.getElementById('hInicial')
    hLanc = document.getElementById('hLanc')

    // Selecionar os Spans com os Valores dos Sliders
    dEsferaResp = document.getElementById('dEsferaValue')
    hInicialResp = document.getElementById('hInicialValue')
    hLancResp = document.getElementById('hLancValue')

    // Selecionar os Spans com os Resultados da Tabela
    tempoPassagemResp = document.getElementById('tempoPassagemValue')
    alcanceResp = document.getElementById('alcanceValue')

    // Atualizar os Sliders
    dEsfera.oninput = () => {
        let dEsferaValue = dEsfera.value / 10

        dEsferaResp.innerText = `${dEsferaValue.toFixed(1)}`
    }
    hInicial.oninput = () => {
        let hInicialValue = hInicial.value / 100
    
        hInicialResp.innerText = `${hInicialValue.toFixed(2)}`
    }
    hLanc.oninput = () => {
        let hLancValue = hLanc.value / 100
    
        hLancResp.innerText = `${hLancValue.toFixed(2)}`
    }


    // SIMULAÇÂO
    
    // Selecionar o Canvas e o seu context
    canvasSim = document.getElementById('canvasSim')

    ctx = canvasSim.getContext('2d')

    // Criar o Objeto Simula
    simula = new window.Simula(canvasSim, RESOLUCAO)

    F12_AL11.preparado = true
    loopSimula()
}


// Corrige o tamanho do Canvas e corrige o DPI
function fixDPI() {
    // Usar variável global
    if (simulaFQmenu.aberto !== 'resultados.html') return

    // Obter o DPI do ecrã
    let DPI = window.devicePixelRatio

    // Altura do CSS
    let altura_css = +getComputedStyle(canvasSim).getPropertyValue('height').slice(0, -2)
    // Larura do CSS
    let largura_css = +getComputedStyle(canvasSim).getPropertyValue('width').slice(0, -2)

    // Altera o tamanho do canvas
    canvasSim.width = largura_css * DPI
    canvasSim.height = altura_css * DPI

    simula.novoTamanho()
}


// Reiniciar a Simulação
function reiniciar() {
    simula.reiniciar()
}


// Criar o loop da Simulação
let ultimoTempo, graficos

function loopSimula(tempo) {
    if (ultimoTempo === undefined) {
        ultimoTempo = tempo
        fixDPI()
        requestAnimationFrame(loopSimula)
        reiniciar() // Fix
        return
    }

    let deltaTempo = tempo - ultimoTempo
    ultimoTempo = tempo
    
    for (let i = 0; i < RESOLUCAO; i++) {
        simula.update(deltaTempo)
    }

    ctx.clearRect(0, 0, canvasSim.width, canvasSim.height)
    simula.desenhar(ctx)

    requestAnimationFrame(loopSimula)
}

window.onresize = fixDPI