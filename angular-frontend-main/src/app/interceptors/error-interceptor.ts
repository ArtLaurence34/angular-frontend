import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const accountService = inject(AccountService);

    return next(req).pipe(catchError((err: HttpErrorResponse) => {
        if ([401, 403].includes(err.status) && accountService.accountValue) {
            accountService.logout();
        }

        const error = err.error?.message || err.statusText;
        return throwError(() => error);
    }));
};