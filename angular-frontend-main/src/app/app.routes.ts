import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./home/home-module').then(m => m.HomeModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account-module').then(m => m.AccountModule)
    },
    {
        path: 'admin',
        canActivate: [authGuard, adminGuard],
        loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)
    },
    { path: '**', redirectTo: '' }
];