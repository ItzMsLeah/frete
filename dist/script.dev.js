"use strict";

function formatarCEP(input) {
  var cep = input.value.replace(/\D/g, '');

  if (cep.length > 5) {
    cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
  }

  input.value = cep;
}

function calcularFrete() {
  var origem, destinoElement, destino, peso, largura, altura, comprimento, response;
  return regeneratorRuntime.async(function calcularFrete$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          origem = '85819280';
          destinoElement = document.getElementById('cepDestino'); // Obtemos o elemento

          destino = destinoElement ? destinoElement.value.trim() : ''; // Verificamos se o elemento existe e obtemos seu valor

          peso = '1';
          largura = '10';
          altura = '10';
          comprimento = '10';

          if (destino) {
            _context.next = 10;
            break;
          }

          alert('Por favor, insira um CEP de destino válido.');
          return _context.abrupt("return");

        case 10:
          _context.prev = 10;
          _context.next = 13;
          return regeneratorRuntime.awrap(axios.post('http://localhost:3000/calcular-frete', {
            origem: origem,
            destino: destino,
            peso: peso,
            largura: largura,
            altura: altura,
            comprimento: comprimento
          }));

        case 13:
          response = _context.sent;
          console.log('Resposta da API:', response.data);
          mostrarResultado(response.data);
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](10);
          console.error('Erro ao calcular o frete:', _context.t0.response ? _context.t0.response.data : _context.t0.message);
          alert("Erro ao calcular o frete: ".concat(_context.t0.response ? _context.t0.response.data.message : _context.t0.message));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[10, 18]]);
}

function mostrarResultado(dadosFrete) {
  var resultados = document.getElementById('resultados');

  if (resultados) {
    resultados.innerHTML = ''; // Limpar resultados anteriores

    if (dadosFrete && dadosFrete.opcoes && Array.isArray(dadosFrete.opcoes)) {
      dadosFrete.opcoes.forEach(function (opcao) {
        // Criar uma nova div para cada transportadora
        var divTransportadora = document.createElement('div');
        divTransportadora.classList.add('opcao-frete'); // Classe para estilização
        // Criar e adicionar informações de transportadora

        var transportadora = document.createElement('p');
        transportadora.textContent = "Transportadora: ".concat(opcao.transportadora);
        divTransportadora.appendChild(transportadora); // Criar e adicionar informações de prazo de entrega

        var prazo = document.createElement('p');
        prazo.textContent = "Prazo de Entrega: ".concat(opcao.prazo, " dias");
        divTransportadora.appendChild(prazo); // Criar e adicionar informações de valor de frete

        var valor = document.createElement('p');
        valor.textContent = "Valor: R$".concat(opcao.valor.toFixed(2));
        divTransportadora.appendChild(valor); // Estilização opcional: adicionar margem entre as opções

        divTransportadora.style.marginBottom = '20px'; // Adicionar a div da transportadora ao contêiner de resultados

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
//# sourceMappingURL=script.dev.js.map
