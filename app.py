from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calcular-frete', methods=['POST'])
def calcular_frete():
    data = request.json

    
    if not all(key in data for key in ('origem', 'destino', 'peso', 'largura', 'altura', 'comprimento')):
        return jsonify({"message": "Todos os campos são necessários."}), 400

    origem = data['origem']
    destino = data['destino']
    peso = float(data['peso'])
    largura = float(data['largura'])
    altura = float(data['altura'])
    comprimento = float(data['comprimento'])

    if not destino:
        return jsonify({"message": "CEP de destino é necessário."}), 400

    
    frete_pac = peso * 1.5 + largura * 0.5 + altura * 0.5 + comprimento * 0.5
    frete_sedex = peso * 2.0 + largura * 0.7 + altura * 0.7 + comprimento * 0.7
    prazo_pac = 7
    prazo_sedex = 4

    response = {
        "opcoes": [
            {"transportadora": "PAC", "valor": round(frete_pac, 2), "prazo": prazo_pac},
            {"transportadora": "SEDEX", "valor": round(frete_sedex, 2), "prazo": prazo_sedex},
        ]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(port=3000)
