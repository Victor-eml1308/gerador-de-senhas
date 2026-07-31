// Elementos do DOM
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lengthValEl = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');

// Bancos de caracteres
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~|}{[]:;?><,./-=';

// Atualizar o valor do tamanho na interface
lengthEl.addEventListener('input', (e) => {
    lengthValEl.innerText = e.target.value;
});

// Copiar para a área de transferência
clipboardBtn.addEventListener('click', () => {
    const password = resultEl.innerText;

    if (!password || password === 'Sua senha aparecerá aqui') {
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        // Feedback visual
        const icon = clipboardBtn.querySelector('i');
        icon.className = 'fa-solid fa-check';
        clipboardBtn.classList.add('copied');

        setTimeout(() => {
            icon.className = 'fa-regular fa-clipboard';
            clipboardBtn.classList.remove('copied');
        }, 2000);
    });
});

// Evento de geração de senha
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value; // Converte para número
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumbers, hasSymbols, length);
    resultEl.classList.add('has-password');
});

// Função principal de geração
function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    
    // Verifica se pelo menos uma opção foi marcada
    const typesCount = upper + lower + number + symbol;
    if (typesCount === 0) {
        return 'Selecione ao menos uma opção!';
    }

    // Cria o pool de caracteres com base nas opções marcadas
    let charset = '';
    if (upper) charset += upperLetters;
    if (lower) charset += lowerLetters;
    if (number) charset += numbers;
    if (symbol) charset += symbols;

    // Garante que a senha tenha uma boa mistura aleatória pegando do charset
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
    }

    return generatedPassword;
}

// Gerar uma senha logo ao abrir a página
generateBtn.click();
