import { Routes } from '@angular/router';
import { Login } from './features/login/login';

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
        loadComponent: () => import('./features/cadastro-conta/cadastro-conta').then(m => m.CadastroConta)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    }
];
