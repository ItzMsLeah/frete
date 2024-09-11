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
  var resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = '';

  if (!dadosFrete || dadosFrete.length === 0) {
    resultadoDiv.innerHTML = 'Não foi possível obter opções de frete.';
    return;
  }

  dadosFrete.forEach(function (opcao) {
    var transportadora = opcao.transportadora,
        prazo = opcao.prazo,
        valor = opcao.valor;
    var freteInfo = "\n            <p>Transportadora: ".concat(transportadora, "</p>\n            <p>Prazo de Entrega: ").concat(prazo, " dias</p>\n            <p>Valor do Frete: R$ ").concat(valor.toFixed(2), "</p>\n            <hr>\n        ");
    resultadoDiv.innerHTML += freteInfo;
  });
}
//# sourceMappingURL=script.dev.js.map
