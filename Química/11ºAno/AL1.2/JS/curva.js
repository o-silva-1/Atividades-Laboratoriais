// Inicializar Variáveis Globais

// Usar um Objeto para proteger as variáveis com nomes comuns
let Q11_AL12 = {
    preparado: false,
}

let solEscolhidoPos = 0


function prepararResultados() {
    if (Q11_AL12.preparado) {
        return
    }
    Q11_AL12.preparado = true

    // Selecionar os Butões
    solArray = document.getElementsByName('sAdicionada')

    // Selecionar os Spans com os Resultados da Tabela
}

// Altera a Solução escolhida, bem como a aparência dos butões
function escolherSol(pos) {
    solArray[solEscolhidoPos].className = 'escolha'
    solArray[pos].className = 'escolha-atual'

    curva()

    solEscolhidoPos = pos

    curva()
}


// Mostra todo o raciocínio por detrás da mudança de cor
function curva() {
    mostrarExtra(`solução${solEscolhidoPos}`)
}