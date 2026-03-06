import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from './keycloak.service';

export function roleGuard(role: string): CanActivateFn {
  return (route, state) => {
    const keycloak = new KeycloakService();
    if (keycloak.getRoles().includes(role)) {
      return true;
    }
    return false;
  };
}

export const accessoNegatoGuard: CanActivateFn = (route, state) => {
  window.location.href = '/accesso-negato';
  return false;
};
