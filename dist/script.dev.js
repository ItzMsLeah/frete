"use strict";

function formatarCEP(input) {
  var cep = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (cep.length > 5) {
    cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
  }

  input.value = cep;
}

function calcularFrete() {
  var cepDestino, cepOrigem, response, resultado;
  return regeneratorRuntime.async(function calcularFrete$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cepDestino = document.getElementById('cepDestino').value;

          if (cepDestino) {
            _context.next = 4;
            break;
          }

          alert("Por favor, preencha o CEP de destino.");
          return _context.abrupt("return");

        case 4:
          cepOrigem = '85819-280'; // Defina seu CEP de origem fixo.

          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.post('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
            from: {
              postal_code: cepOrigem
            },
            to: {
              postal_code: cepDestino
            },
            "package": {
              weight: 1,
              // Peso fictício (em kg)
              width: 10,
              // Largura fictícia (em cm)
              height: 10,
              // Altura fictícia (em cm)
              length: 10 // Comprimento fictício (em cm)

            },
            services: "1,2" // IDs dos serviços de transporte

          }, {
            headers: {
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiJkYmIzOGEwMmUxNjZjMDg3ZjM3NDFjOGUyYTRmZTRiNTFlMmE5NGI3ZmUxYTEzNWY4YjBhMDQ0ZjgwN2Y1MTBlZGZiMzBiMGExNTAzNzk5NSIsImlhdCI6MTcyNTk0NzIzMC43NjAzNDIsIm5iZiI6MTcyNTk0NzIzMC43NjAzNDUsImV4cCI6MTc1NzQ4MzIzMC43NDYxOTMsInN1YiI6IjljZjkzNTkxLWY3NWUtNGRiNy1iYjNjLWY2OGQ4ODU5YmY0ZCIsInNjb3BlcyI6WyJjYXJ0LXJlYWQiLCJjYXJ0LXdyaXRlIiwiY29tcGFuaWVzLXJlYWQiLCJjb21wYW5pZXMtd3JpdGUiLCJjb3Vwb25zLXJlYWQiLCJjb3Vwb25zLXdyaXRlIiwibm90aWZpY2F0aW9ucy1yZWFkIiwib3JkZXJzLXJlYWQiLCJwcm9kdWN0cy1yZWFkIiwicHJvZHVjdHMtZGVzdHJveSIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIiwid2ViaG9va3MtcmVhZCIsIndlYmhvb2tzLXdyaXRlIiwid2ViaG9va3MtZGVsZXRlIiwidGRlYWxlci13ZWJob29rIl19.R2I3ROuxZ1E263ja8KyzlseOnr9WY1es5LEwKk4xSR19U3R4D9jJz_YoZAJXdqwJQ4gShM_VLEEUWgd2yGYwDzOpuKiyjxpX_ypHazpAp1PzF3YOr6aiD4f3va-dqZvteqhjf9oo5mA_hv_J4XNYK8qDouiHXvCyLF6cnnh0JkoImDtuikaBfs1JfZnle6V8W20pe62fgvkVgndSHevlznzuNJgF_HzUSM8TB7luILDaGoVpe_E7t0Ei34_5GixEN8p3XeimqSfAbls_LMYo-QybKi3q2R1JmYiiLpFcr6Wc5UFbDYTLV_rAkOCk_C-lMYJAqRt1kWg56ntUn3E16R7yDkzwxc0YfjvG6tn7_JOQVDoan9nc6um4GKiuUfH_sy4ODlSy6Jeiewh3KKWTKLwKetmrvOUUv_tOBtxoiheWj54BPK0Vp0wrexpuqts0XnTFWTgaVS3yA3D7KF-oH0cWcgjR1GP5jfoz1EBY-YW8JxaQJV4dIxfDZY-AqxBcE_l_or3iRjrz6jLEhQx2iR-CDZOdWa0Jci0kZ9VxIh0i5D_lhJnkKYtMzR9DA_jX1SvUKDIRAL_aeWlmmhZzVcOK5-LyQ3HP8f9wk4Z5kbp_WKRRuWCHK1HaND3nCXESDIG487WZxEO6FwnxeRyXr5gJ5zNa7cZHFjIwC7Y_SU0',
              // Substitua pela sua chave de API
              'Content-Type': 'application/json',
              'Accept': 'application/json' // Adicionado para garantir o formato de resposta

            }
          }));

        case 8:
          response = _context.sent;
          resultado = response.data;
          mostrarResultado(resultado);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](5);
          console.error(_context.t0);

          if (_context.t0.response) {
            alert("Erro ao calcular o frete: ".concat(_context.t0.response.data.message));
          } else {
            alert("Erro ao calcular o frete. Por favor, verifique os dados e tente novamente.");
          }

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 13]]);
}

function mostrarResultado(resultado) {
  var html = '<h3>Opções de Frete:</h3><ul>';
  resultado.forEach(function (service) {
    html += "\n            <li>\n                <strong>Transportadora:</strong> ".concat(service.company.name, "<br>\n                <strong>Servi\xE7o:</strong> ").concat(service.name, "<br>\n                <strong>Prazo de Entrega:</strong> ").concat(service.delivery_time, " dias\n            </li>\n        ");
  });
  html += '</ul>';
  document.getElementById('resultado').innerHTML = html;
}
//# sourceMappingURL=script.dev.js.map
