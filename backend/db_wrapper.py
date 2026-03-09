import pymysql

class DBWrapper:
    # costruttore con credenziali già impostate
    def __init__(self):
        self.db_config = {
            'host': 'mysql-2866c068-iisgalvanimi-2ff7.i.aivencloud.com',
            'user': 'avnadmin',
            'password': 'AVNS_v1TgPn42ElroLECEw_G',
            'database': 'defaultdb',
            'port': 22433,
            'cursorclass': pymysql.cursors.DictCursor
        }
        self.create_table()  # crea la tabella voti

    # apre la connessione ogni volta che serve
    def connect(self):
        return pymysql.connect(**self.db_config)

    # operazioni INSERT, DELETE, UPDATE
    def execute_query(self, query, params=()):
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            conn.commit()
        conn.close()

    # SELECT
    def fetch_query(self, query, params=()):
        conn = self.connect()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            result = cursor.fetchall()
        conn.close()
        return result

    # crea la tabella voti se non esiste
    def create_table(self):
        self.execute_query('''
            CREATE TABLE IF NOT EXISTS Voti (
                id INT AUTO_INCREMENT PRIMARY KEY,
                studente VARCHAR(255) NOT NULL,
                materia VARCHAR(255) NOT NULL,
                voto INT NOT NULL
            )
        ''')

    # restituisce tutti i voti
    def get_all_voti(self):
        return self.fetch_query("SELECT * FROM Voti")

    # restituisce i voti di uno studente
    def get_voti_studente(self, studente):
        return self.fetch_query("SELECT * FROM Voti WHERE studente = %s", (studente,))

    # inserisce un nuovo voto
    def inserisci_voto(self, studente, materia, voto):
        self.execute_query(
            "INSERT INTO Voti (studente, materia, voto) VALUES (%s, %s, %s)",
            (studente, materia, voto)
        )