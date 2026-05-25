import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './interceptors/jwt-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { fakeBackendInterceptor } from './services/fake-backend';

// SET TO true FOR STAGE A (Fake Backend Testing)
// SET TO false FOR STAGE B (Live Backend)
const useFakeBackend = false;

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(
            withInterceptors(
                useFakeBackend
                    ? [fakeBackendInterceptor, jwtInterceptor, errorInterceptor]
                    : [jwtInterceptor, errorInterceptor]
            )
        )
    ]
};