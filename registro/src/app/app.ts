import { Component, signal } from '@angular/core';
import { DocenteComponent } from './docente/docente.component';
import { StudenteComponent } from './studente/studente.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DocenteComponent, StudenteComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  username = '';
  ruolo = '';
  isLogged = false;

  constructor(private keycloak: KeycloakService) {
    this.username = this.keycloak.getUsername();
    const roles = this.keycloak.getRoles();
    this.ruolo = roles.includes('docente') ? 'docente' : (roles.includes('studente') ? 'studente' : '');
    this.isLogged = !!this.keycloak.getToken();
  }

  logout() {
    this.keycloak.logout();
  }
}
