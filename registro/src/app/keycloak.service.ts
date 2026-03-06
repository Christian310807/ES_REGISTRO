import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak: any;

  async init(): Promise<void> {
    if (!this.keycloak) {
      this.keycloak = (window as any).Keycloak({
        url: 'https://supreme-enigma-5gwggp4rw5jxhvxrp-8080.app.github.dev/',
        realm: 'registro-angular',
        clientId: 'registro-angular'
      });
      await this.keycloak.init({ onLoad: 'check-sso' });
    }
  }

  login(): void {
    this.keycloak.login();
  }

  getToken(): string {
    return this.keycloak?.token;
  }

  getRoles(): string[] {
    return this.keycloak?.realmAccess?.roles || [];
  }

  getUsername(): string {
    return this.keycloak?.tokenParsed?.preferred_username || '';
  }

  logout(): void {
    this.keycloak.logout();
  }

  async getVoti(): Promise<any> {
    const res = await fetch('https://supreme-enigma-5gwggp4rw5jxhvxrp-5000.app.github.dev/voti', {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
    return await res.json();
  }

  async getVotiStudente(): Promise<any> {
    const username = this.getUsername();
    const res = await fetch(`https://supreme-enigma-5gwggp4rw5jxhvxrp-5000.app.github.dev/voti/${username}`, {
      headers: {
        Authorization: 'Bearer ' + this.getToken()
      }
    });
    return await res.json();
  }

  async inserisciVoto(studente: string, materia: string, voto: number): Promise<any> {
    const res = await fetch('https://supreme-enigma-5gwggp4rw5jxhvxrp-5000.app.github.dev/voti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getToken()
      },
      body: JSON.stringify({ studente, materia, voto })
    });
    return await res.json();
  }
}
