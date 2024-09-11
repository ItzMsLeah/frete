function formatarCEP(input) {
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }

    input.value = cep;
}

async function calcularFrete() {
    const origem = '85819280';
    const destinoElement = document.getElementById('cepDestino');  // Obtemos o elemento
    const destino = destinoElement ? destinoElement.value.trim() : '';  // Verificamos se o elemento existe e obtemos seu valor

    const peso = '1';
    const largura = '10';
    const altura = '10';
    const comprimento = '10';

    if (!destino) {
        alert('Por favor, insira um CEP de destino válido.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/calcular-frete', {
            origem,
            destino,
            peso,
            largura,
            altura,
            comprimento
        });

        console.log('Resposta da API:', response.data);
        mostrarResultado(response.data);
    } catch (error) {
        console.error('Erro ao calcular o frete:', error.response ? error.response.data : error.message);
        alert(`Erro ao calcular o frete: ${error.response ? error.response.data.message : error.message}`);
    }
}


function mostrarResultado(dadosFrete) {
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = '';

    if (!dadosFrete || dadosFrete.length === 0) {
        resultadoDiv.innerHTML = 'Não foi possível obter opções de frete.';
        return;
    }

    dadosFrete.forEach(opcao => {
        const { transportadora, prazo, valor } = opcao;

        const freteInfo = `
            <p>Transportadora: ${transportadora}</p>
            <p>Prazo de Entrega: ${prazo} dias</p>
            <p>Valor do Frete: R$ ${valor.toFixed(2)}</p>
            <hr>
        `;
        resultadoDiv.innerHTML += freteInfo;
    });
}