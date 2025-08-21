import { Routes } from '@angular/router';
import { Login } from './paginas/login/login';

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
        loadComponent: () => import('./paginas/cadastro-conta/cadastro-conta').then(m => m.CadastroConta)
    },
    {
        path: 'home',
        loadComponent: () => import('./paginas/home/home').then(m => m.Home)
    }
];
