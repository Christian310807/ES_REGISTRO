from flask import Flask, request, jsonify
from flask_cors import CORS
from db_wrapper import DBWrapper

app = Flask(__name__)
CORS(app)
db = DBWrapper()

@app.route('/voti', methods=['GET'])
def get_voti():
    # Recupera tutti i voti (solo docente)
    return jsonify(db.get_all_voti())

@app.route('/voti/<studente>', methods=['GET'])
def get_voti_studente(studente):
    # Recupera voti di uno studente (solo studente)
    return jsonify(db.get_voti_studente(studente))

@app.route('/voti', methods=['POST'])
def inserisci_voto():
    data = request.json
    db.inserisci_voto(data['studente'], data['materia'], data['voto'])
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
