import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../keycloak.service';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.css']
})
export class StudenteComponent implements OnInit {
  voti: any[] = [];

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit() {
    this.voti = await this.keycloak.getVotiStudente();
  }
}
