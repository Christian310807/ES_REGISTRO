class DBWrapper:
    def __init__(self):
        self.voti = []

    def get_all_voti(self):
        return self.voti

    def get_voti_studente(self, studente):
        return [v for v in self.voti if v['studente'] == studente]

    def inserisci_voto(self, studente, materia, voto):
        self.voti.append({'studente': studente, 'materia': materia, 'voto': voto})
