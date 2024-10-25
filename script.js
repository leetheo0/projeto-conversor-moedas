// Chave da API
const apiKey = '2957696406cbbb2cd8d2a455';
 
// URL base da API (usando a ExchangeRate-API como exemplo)
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
 
// Função de conversão
async function converterMoeda() {
    const valor = document.getElementById("valor").value;
    const moedaOrigem = document.getElementById("moedaOrigem").value;
    const moedaDestino = document.getElementById("moedaDestino").value;
 
    if (valor === '' || valor <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }
 
    try {
        const resposta = await fetch(`${apiUrl}${moedaOrigem}`);
        const dados = await resposta.json();
       
        // Verificar se a resposta contém as taxas de câmbio
        if (dados && dados.conversion_rates) {
            const taxaDeCambio = dados.conversion_rates[moedaDestino];
            const valorConvertido = (valor * taxaDeCambio).toFixed(2);
            document.getElementById("resultado").innerText = `Resultado: ${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`;
        } else {
            alert("Erro ao obter as taxas de câmbio.");
        }
    } catch (error) {
        alert("Ocorreu um erro ao acessar a API.");
    }
}
 
// Limpar os campos
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("converterForm").reset();
    document.getElementById("resultado").innerText = '';
});
 
// Evento de submissão do formulário
document.getElementById("converterForm").addEventListener("submit", (event) => {
    event.preventDefault();
    converterMoeda();
});
 