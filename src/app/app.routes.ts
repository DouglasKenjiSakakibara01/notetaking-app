import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { AuthGuard } from './core/services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'cadastro-conta',
        loadComponent: () => import('./features/cadastro-conta/cadastro-conta').then(m => m.CadastroConta),
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
        canActivate: [AuthGuard]
    },
    {
        path: 'evento',
        loadComponent: () => import('./features/evento/pagina-evento').then(e => e.PaginaEvento),
        canActivate: [AuthGuard]
    }

];
