"use strict";

var express = require('express');

var axios = require('axios');

var cors = require('cors');

var app = express();
var port = 3000;
app.use(cors());
app.use(express.json());
app.post('/calcular-frete', function _callee(req, res) {
  var cepDestino, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cepDestino = req.body.cepDestino;

          if (cepDestino) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'CEP de destino é necessário.'
          }));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.post('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
            from: {
              postal_code: '85819-280'
            },
            to: {
              postal_code: cepDestino
            },
            "package": {
              weight: 1,
              width: 10,
              height: 10,
              length: 10
            },
            services: '1, 2'
          }, {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiI2NDI0MjBjZjdlNGJlOWIxNzY5Mzg5ZDdkOTdmMmRmYTY2ZDU3ZmQ4MzVjMTBkODVkNmI4NTdhZThmMDc4YTFlOTAzMDIzMDVkNDY3YWVmOCIsImlhdCI6MTcyNTk5MDkxMC41NTU0MjgsIm5iZiI6MTcyNTk5MDkxMC41NTU0MzEsImV4cCI6MTc1NzUyNjkxMC41NDAwNTcsInN1YiI6IjljZjkzNTkxLWY3NWUtNGRiNy1iYjNjLWY2OGQ4ODU5YmY0ZCIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.WZx2eJe1blLuYOKQidQZtOA1fkr1Cwa8STlT8C3S73CVzy5Crjz87EoihQtY3zj8gzR2Vjkyss9_PZav1PKY77sAa6vcvyCKLQE_XfFUSQFuKaI2ARS0BTKYeLiT-kAy5y8fDcN3tNh7X218uyHdCNX1p1eh_-TfVLSgY8EVKCx4BoqWwgJuSlemFo1wLzYY6IVBToNOIcy2709FPJ3JLzd-tqSKAAquArJoLjZPC9eOopi3qIhEtl0DoTKmpvhi-LkfA7oHl_QQ62N7SalJaNLmM_5xgy4zsQR4oj4212iVPN_mzL7ksfQpMqg2nBpNcz-AjhhxWIh2dan02hwIlmrf6DJ4LJxKdJrbbaSa0IY3eeA2wDvXrnrZYqNsalu3txxbjST6k9xBlknmh1MndQz4Nfme66SnDf_KaLqwZh8ESJjyDEOT25iRKCQBzoJ0Aek38i8b_zKMK4r1zxJ2NaLKo-cErGT4UEr0vH2_prK4c0BLYUxm-0YbIbhq-DtMevUvJ47lSQcWOQw5JulGKeyEgkQNHB7Ieb8f4waVzoDNfFRxN51KXtJB0BOX41oRDC9vUvgFof0W6DVUu2sZkV0_htL2ZLp1ja3gdqTG-BC2kObSUgjQ9Gr80MeKpKdaABOqI0hBjjcs6HoWv6boaZt2dsDOe0PifLX4v9tc6YM',
              // Substitua pela sua chave de API do Melhor Envio (sandbox)
              'Content-Type': 'application/json',
              'User-Agent': 'Aplicação lesimoneto@gmail.com'
            }
          }));

        case 6:
          response = _context.sent;
          res.json(response.data);
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Erro ao calcular o frete.'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
});
app.listen(port, function () {
  console.log("Servidor backend rodando em http://localhost:".concat(port));
});
//# sourceMappingURL=index.dev.js.map
