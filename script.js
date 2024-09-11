function formatarCEP(input) {
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
    }

    input.value = cep;
}

async function calcularFrete() {
    const origem = '85819280';
    const destinoElement = document.getElementById('cepDestino');
    const destino = destinoElement ? destinoElement.value.trim() : '';

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
    const resultados = document.getElementById('resultados');

    if (resultados) {
        resultados.innerHTML = '';

        if (dadosFrete && dadosFrete.opcoes && Array.isArray(dadosFrete.opcoes)) {
            dadosFrete.opcoes.forEach(opcao => {
                
                const divTransportadora = document.createElement('div');
                divTransportadora.classList.add('opcao-frete');

                
                const transportadora = document.createElement('p');
                transportadora.textContent = `Transportadora: ${opcao.transportadora}`;
                divTransportadora.appendChild(transportadora);

                
                const prazo = document.createElement('p');
                prazo.textContent = `Prazo de Entrega: ${opcao.prazo} dias`;
                divTransportadora.appendChild(prazo);

                
                const valor = document.createElement('p');
                valor.textContent = `Valor: R$${opcao.valor.toFixed(2)}`;
                divTransportadora.appendChild(valor);

                
                divTransportadora.style.marginBottom = '20px';

                
                resultados.appendChild(divTransportadora);
            });
        } else {
            console.error("Formato de resposta inválido:", dadosFrete);
            alert('Não foi possível obter opções de frete.');
        }
    } else {
        console.error("Elemento 'resultados' não encontrado.");
    }
}