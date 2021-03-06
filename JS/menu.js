// Se necessário, fazer de forma a não ter de fazer mais Requests ao Server

// Valores Iniciais das Variaveis
let simulaFQmenu = {
    pronto: false,
    aberto: 'teoria.html'
}

// Inicializar Variáveis Globais
let liTeoria, liMaterial, liProcedimento, liResultados
let divTeoria, divMaterial, divProcedimento, divResultados

function carregar(ficheiro) {
    // Identificar os Elementos do Menu, após estes carregarem
    if (!simulaFQmenu.pronto) {
        divTeoria = document.getElementById('div-teoria')
        divMaterial = document.getElementById('div-material')
        divProcedimento = document.getElementById('div-procedimento')
        divResultados = document.getElementById('div-resultados')

        liTeoria = document.getElementById('teoria')
        liMaterial = document.getElementById('material')
        liProcedimento = document.getElementById('procedimento')
        liResultados = document.getElementById('resultados')

        simulaFQmenu.pronto = true
    }
    // Abrir um novo ficheiro
    if (simulaFQmenu.aberto != ficheiro) {
        simulaFQmenu.aberto = ficheiro

        liTeoria.style.textDecoration = ''
        liMaterial.style.textDecoration = ''
        liProcedimento.style.textDecoration = ''
        liResultados.style.textDecoration = ''
        
        divTeoria.style.display = 'none'
        divMaterial.style.display = 'none'
        divProcedimento.style.display = 'none'
        divResultados.style.display = 'none'

        if (simulaFQmenu.aberto == 'teoria.html') {
            liTeoria.style.textDecoration = 'underline'
            divTeoria.style.display = 'initial'
        } else if (simulaFQmenu.aberto == 'material.html') {
            liMaterial.style.textDecoration = 'underline'
            divMaterial.style.display = 'initial'
        } else if (simulaFQmenu.aberto == 'procedimento.html') {
            liProcedimento.style.textDecoration = 'underline'
            divProcedimento.style.display = 'initial'
        } else if (simulaFQmenu.aberto == 'resultados.html') {
            liResultados.style.textDecoration = 'underline'
            divResultados.style.display = 'initial'
            carregarJSResultados()
        }
    }
}
// Carregar o JS que simula os Resultados
async function carregarJSResultados() {
    let JScarregado = false
    while (!JScarregado) {  
        try {
            prepararResultados()
            JScarregado = true
            console.log('Simulação Carregada!')
        } catch(erro) {
            /* Caso a rede esteja lenta, repetir a função até que os
                elementos HTML sejam selecionados*/
            console.log('Rede lenta, a tentar carregar a Simulação de novo...')
            console.log(`Erro: ${erro}`)
            await new Promise(r => setTimeout(r, 500))
        }
    }
}
            