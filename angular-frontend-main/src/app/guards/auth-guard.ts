import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const accountService = inject(AccountService);
    const account = accountService.accountValue;

    if (account) {
        return true;
    }

    router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
};