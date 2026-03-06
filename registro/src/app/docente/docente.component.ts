import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from '../keycloak.service';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  voti: any[] = [];
  studente = '';
  materia = '';
  voto: number | null = null;

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit() {
    this.voti = await this.keycloak.getVoti();
  }

  async inserisciVoto() {
    if (this.studente && this.materia && this.voto !== null) {
      await this.keycloak.inserisciVoto(this.studente, this.materia, this.voto);
      this.voti = await this.keycloak.getVoti();
      this.studente = '';
      this.materia = '';
      this.voto = null;
    }
  }
}
