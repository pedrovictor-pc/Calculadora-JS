let primeiroNumero = '';
let segundoNumero = '';
let operadorAtual = null;
let resetarDisplay = false;

const simbolosOperadores = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    '**': '^'
};

const display = document.getElementById('display');
const botoes = document.querySelectorAll('button');

for (const botao of botoes) {
    botao.addEventListener('click', () => {
        const valor = botao.getAttribute('data-valor');

        if (botao.classList.contains('numero')) {
            inserirNumero(valor);
        } else if (botao.classList.contains('operador')) {
            inserirOperador(valor);
        } else if (botao.classList.contains('igual')) {
            calcularResultado();
        } else if (botao.classList.contains('limpar')) {
            limparCalculadora();
        }
    })
};

function inserirNumero(num) {
    if (resetarDisplay) {
        display.value = '';
        resetarDisplay = false
    }
    display.value = display.value + num;

    if (operadorAtual === null) {
        primeiroNumero = display.value
    } else {
        segundoNumero = display.value
    }
}

function inserirOperador(op) {
    if (primeiroNumero !== '' && operadorAtual !== null && segundoNumero !== '') {
        calcularResultado()
    }
    operadorAtual = op;
    primeiroNumero = display.value !== '' ? display.value : '0';
    display.value = simbolosOperadores[op];
    resetarDisplay = true

    if (operadorAtual === 'Math.sqrt()'){
        calcularResultado()
    }
}

function calcularResultado() {
    const num1 = Number(primeiroNumero);
    const num2 = Number(segundoNumero);

    let resultado;
    if (operadorAtual === '+') {
        resultado = num1 + num2;
    } else if (operadorAtual === '-') {
        resultado = num1 - num2;
    } else if (operadorAtual === '*') {
        resultado = num1 * num2;
    } else if (operadorAtual === '/') {
        resultado = num2 !== 0 ? num1 / num2 : 'Erro';
    } else if (operadorAtual === '**') {
        resultado = num1 ** num2;
    } else if (operadorAtual === 'Math.sqrt()') {
        resultado = num1 > 0 ? Math.sqrt(num1) : 'Erro';
    } else {
        return;
    }

    display.value = resultado === 'Erro' ? 'Erro' : resultado;
    primeiroNumero = display.value;
    operadorAtual = null;
    segundoNumero = '';
    resetarDisplay = true;
}

function limparCalculadora() {
    display.value = '';
    primeiroNumero = '';
    segundoNumero = '';
    operadorAtual = null;
    resetarDisplay = false
}