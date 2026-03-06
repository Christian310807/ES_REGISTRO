# Keycloak Setup

1. Avvia Keycloak (puoi usare Docker):
   ```bash
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.1 start-dev
   ```

2. Accedi a Keycloak su http://localhost:8080 con admin/admin.

3. Crea un nuovo Realm chiamato `registro`.

4. Crea due ruoli:
   - `docente`
   - `studente`

5. Crea due utenti di test:
   - docente1 (ruolo: docente)
   - studente1 (ruolo: studente)

6. Crea un client:
   - Nome: `registro-angular`
   - Tipo: `public`
   - Redirect URI: `http://localhost:4200/*`

7. Configura il client per includere i ruoli nel token.

8. Scarica il file di configurazione JSON del client e salvalo qui.
