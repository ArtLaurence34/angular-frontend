import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const accountService = inject(AccountService);
    const account = accountService.accountValue;

    if (account?.role === 'Admin') {
        return true;
    }

    router.navigate(['/']);
    return false;
};