// Constantes Físicas
const PI = Math.PI

// Base: 1m
const comprimentos = {
    'pm': 1e-12,
    'nm': 1e-09,
    '&mu;m': 1e-06,
    'mm': 1e-03,
    'cm': 1e-02,
    'dm': 1e-01,
    'm': 1,
    'dam': 1e01,
    'hm': 1e02,
    'km': 1e03,
    'Mm': 1e06,
    'Gm': 1e09,
    'Tm': 1e12,
    'in': 0.0254,
    'ft': 0.3048,
    'UA': 149597870700,
    'Segundo-Luz': 299792458,
}
const comprimentosNomes = {
    'pm': 'Picómetro',
    'nm': 'Nanómetro',
    '&mu;m': 'Micrómetro',
    'mm': 'Milímetro',
    'cm': 'Centímetro',
    'dm': 'Decímetro',
    'm': 'Metro',
    'dam': 'Decâmetro',
    'hm': 'Hectómetro',
    'km': 'Kilómetro',
    'Mm': 'Megametro',
    'Gm': 'Gigametro',
    'Tm': 'Terametro',
    'in': 'Polegada',
    'ft': 'Pé',
    'UA': 'Unidade Astronómica',
    'Segundo-Luz': 'Segundo-Luz',
}

// Base: 1J
const energias = {
  'mJ': 0.001,
  'J': 1,
  'kJ': 1000,
  'MJ': 1e06,
  'GJ': 1e09,
  'TJ': 1e12,
  'Ws': 1,
  'kWh': 3.6e06,
  'cal': 4.184,
  'kcal': 4184
}
const energiasNomes = {
  'mJ': 'Milijoule',
  'J': 'Joule',
  'kJ': 'Kilojoule',
  'MJ': 'Megajoule',
  'GJ': 'Gigajoule',
  'TJ': 'Terajoule',
  'Ws': 'Watt segundo',
  'kWh': 'Kilowatt hora',
  'cal': 'Caloria',
  'kcal': 'Kilocaloria'
}

// Base: 1W
const potencias = {
  'mW': 0.001,
  'W': 1,
  'kW': 1000,
  'MW': 1e06,
  'GW': 1e09,
  'TW': 1e12,
  'J/s': 1,
  'J/h': new BigNumber(1).dividedBy(new BigNumber(3600)),
  'kJ/s': 1000,
  'kJ/h': new BigNumber(1000).dividedBy(new BigNumber(3600)),
}
const potenciasNomes = {
  'mW': 'Miliwatt',
  'W': 'Watt',
  'kW': 'Kilowatt',
  'MW': 'Megawatt',
  'GW': 'Gigawatt',
  'TW': 'Terawatt',
  'J/s': 'Joule por segundo',
  'J/h': 'Joule por hora',
  'kJ/s': 'Kilojoule por segundo',
  'kJ/h': 'Kilojould por hora',
}

// Base: 1s
const tempos = {
  's': 1,
  'h': 3600
}
const temposNomes = {
  's': 'Segundo',
  'h': 'Hora'
}

// Base: m^3
const volumes = {
  'mL': 1e-06,
  'cL': 1e-05,
  'dL': 1e-04,
  'L': 1e-03,
  'kL': 1,
  'ML': 1e03,
  'GL': 1e06,
  'TL': 1e09,
}
const volumesNomes = {
  'mL': 'Mililitro',
  'cL': 'Centilitro',
  'dL': 'Decilitro',
  'L': 'Litro',
  'kL': 'Kilolitro',
  'ML': 'Megalitro',
  'GL': 'Gigalitro',
  'TL': 'Teralitro',
}


// HTML Constante
const converterDe = document.getElementById('converterDe')
const converterPara = document.getElementById('converterPara')

const converterNum = document.getElementById('converterNum')
const converterResultado = document.getElementById('converterResultado')

const unidadesDe = document.getElementsByName('unidadesDe')
const unidadesPara = document.getElementsByName('unidadesPara')

const unidadesDeExtenso = document.getElementsByName('unidadesDeExtenso')
const unidadesParaExtenso = document.getElementsByName('unidadesParaExtenso')

const unidadesDeGenero = document.getElementsByName('unidadesDeGenero')
const unidadesParaGenero = document.getElementsByName('unidadesParaGenero')

const razao = document.getElementsByName('razao')

const explicacao = document.getElementsByName('explicação')



// Selecionar a Grandeza
function grandeza(nomeFicheiro='') {
    let URLatual = window.location.pathname.replace(/[^/]*$/, '')
    window.location.pathname = `${URLatual}${nomeFicheiro}`
}


// Alterar o conteúdo de um array de elementos HTML
function textoArr(arr=[], texto='Erro') {
    arr.forEach(e => e.innerHTML = texto)
}


// Converter de Exponencial para Decimal
function expToDec(num) {
    let numStr = String(num)
    let numArr = numStr.split('e')
    let numDp = !!(Number(numArr[0]) % 1) ? (numArr[0].length - numStr.indexOf('.') - 1) : 0
    
    if (numArr.length == 2) {
        if (Number(numArr[1]) < 0) {
            numStr = num.toFixed(Math.abs(numArr[1]) + numDp)
            return numStr
        }
        numStr = num.toFixed(numDp)
        return numStr
    }
    return numStr
}

// Converter para notação científica em HTML
function base10HTML(num=1) {
    num = Number(num)
    if (num > 4e3 || num < 4e-04) {
        let base = String(num.toExponential()).split(/e/)
        base[1] = base[1].replace('+', '')
        base[1] = base[1].replace('-', '&minus;')

        if (base[0].length > 6) base[0] = String(Number(base[0]).toFixed(4))

        return `${base[0]} &times; 10<sup>${base[1]}</sup>`
    }
    num = String(num)
    if (num.length > 6) num = String(Number(num).toFixed(4))

    return num
}