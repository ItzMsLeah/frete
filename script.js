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
    const resultados = document.getElementById('resultados');

    if (resultados) {
        resultados.innerHTML = ''; // Limpar resultados anteriores

        if (dadosFrete && dadosFrete.opcoes && Array.isArray(dadosFrete.opcoes)) {
            dadosFrete.opcoes.forEach(opcao => {
                // Criar uma nova div para cada transportadora
                const divTransportadora = document.createElement('div');
                divTransportadora.classList.add('opcao-frete'); // Classe para estilização

                // Criar e adicionar informações de transportadora
                const transportadora = document.createElement('p');
                transportadora.textContent = `Transportadora: ${opcao.transportadora}`;
                divTransportadora.appendChild(transportadora);

                // Criar e adicionar informações de prazo de entrega
                const prazo = document.createElement('p');
                prazo.textContent = `Prazo de Entrega: ${opcao.prazo} dias`;
                divTransportadora.appendChild(prazo);

                // Criar e adicionar informações de valor de frete
                const valor = document.createElement('p');
                valor.textContent = `Valor: R$${opcao.valor.toFixed(2)}`;
                divTransportadora.appendChild(valor);

                // Estilização opcional: adicionar margem entre as opções
                divTransportadora.style.marginBottom = '20px';

                // Adicionar a div da transportadora ao contêiner de resultados
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