import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const accountsKey = 'fake-backend-accounts';
let accounts: any[] = JSON.parse(localStorage.getItem(accountsKey) || '[]');

export const fakeBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const { url, method, body } = req;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/accounts/register') && method === 'POST':
                return register();
            case url.endsWith('/accounts/verify-email') && method === 'POST':
                return verifyEmail();
            case url.endsWith('/accounts/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/accounts/refresh-token') && method === 'POST':
                return refreshToken();
            case url.endsWith('/accounts/revoke-token') && method === 'POST':
                return revokeToken();
            case url.endsWith('/accounts/forgot-password') && method === 'POST':
                return forgotPassword();
            case url.endsWith('/accounts/validate-reset-token') && method === 'POST':
                return validateResetToken();
            case url.endsWith('/accounts/reset-password') && method === 'POST':
                return resetPassword();
            case url.endsWith('/accounts') && method === 'GET':
                return getAccounts();
            case url.match(/\/accounts\/\d+$/) && method === 'GET':
                return getAccountById();
            case url.match(/\/accounts\/\d+$/) && method === 'PUT':
                return updateAccount();
            case url.match(/\/accounts\/\d+$/) && method === 'DELETE':
                return deleteAccount();
            default:
                return next(req);
        }
    }

    function register() {
        const account = body;
        if (accounts.find(x => x.email === account.email)) {
            return error(`Email ${account.email} is already registered`);
        }
        account.id = accounts.length ? Math.max(...accounts.map(x => x.id)) + 1 : 1;
        account.role = accounts.length === 0 ? 'Admin' : 'User';
        account.verificationToken = 'fake-token-' + account.id;
        account.verified = null;
        account.passwordHash = account.password;
        accounts.push(account);
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        return ok({ message: 'Registration successful, please check your email for verification instructions' });
    }

    function verifyEmail() {
        const { token } = body;
        const account = accounts.find(x => x.verificationToken === token);
        if (!account) return error('Verification failed');
        account.verified = new Date();
        account.verificationToken = null;
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        return ok({ message: 'Verification successful, you can now login' });
    }

    function authenticate() {
        const { email, password } = body;
        const account = accounts.find(x => x.email === email && x.passwordHash === password && x.verified);
        if (!account) return error('Email or password is incorrect');
        return ok({
            ...basicDetails(account),
            jwtToken: 'fake-jwt-token-' + account.id
        });
    }

    function refreshToken() {
        return ok({});
    }

    function revokeToken() {
        return ok({ message: 'Token revoked' });
    }

    function forgotPassword() {
        const { email } = body;
        const account = accounts.find(x => x.email === email);
        if (!account) return ok({ message: 'Please check your email for password reset instructions' });
        account.resetToken = 'fake-reset-token-' + account.id;
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        alert(`FAKE EMAIL: Reset token is: ${account.resetToken}`);
        return ok({ message: 'Please check your email for password reset instructions' });
    }

    function validateResetToken() {
        const { token } = body;
        const account = accounts.find(x => x.resetToken === token);
        if (!account) return error('Invalid token');
        return ok({ message: 'Token is valid' });
    }

    function resetPassword() {
        const { token, password } = body;
        const account = accounts.find(x => x.resetToken === token);
        if (!account) return error('Invalid token');
        account.passwordHash = password;
        account.resetToken = null;
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        return ok({ message: 'Password reset successful' });
    }

    function getAccounts() {
        return ok(accounts.map(basicDetails));
    }

    function getAccountById() {
        const id = parseInt(url.split('/').pop()!);
        const account = accounts.find(x => x.id === id);
        if (!account) return error('Account not found');
        return ok(basicDetails(account));
    }

    function updateAccount() {
        const id = parseInt(url.split('/').pop()!);
        const account = accounts.find(x => x.id === id);
        if (!account) return error('Account not found');
        Object.assign(account, body);
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        return ok(basicDetails(account));
    }

    function deleteAccount() {
        const id = parseInt(url.split('/').pop()!);
        accounts = accounts.filter(x => x.id !== id);
        localStorage.setItem(accountsKey, JSON.stringify(accounts));
        return ok({ message: 'Account deleted' });
    }

    function basicDetails(account: any) {
        const { id, title, firstName, lastName, email, role, verified } = account;
        return { id, title, firstName, lastName, email, role, isVerified: !!verified };
    }

    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500));
    }

    function error(message: string) {
        return throwError(() => ({ error: { message } }))
            .pipe(materialize(), delay(500), dematerialize());
    }
};