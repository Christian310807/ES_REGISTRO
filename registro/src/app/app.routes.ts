import { Routes } from '@angular/router';
import { DocenteComponent } from './docente/docente.component';
import { StudenteComponent } from './studente/studente.component';
import { LoginComponent } from './login/login.component';
import { AccessoNegatoComponent } from './accesso-negato/accesso-negato.component';
import { roleGuard, accessoNegatoGuard } from './auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'docente',
		component: DocenteComponent,
		canActivate: [roleGuard('docente')]
	},
	{
		path: 'studente',
		component: StudenteComponent,
		canActivate: [roleGuard('studente')]
	},
	{
		path: 'accesso-negato',
		component: AccessoNegatoComponent
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: '**',
		canActivate: [accessoNegatoGuard],
		component: AccessoNegatoComponent
	}
];
