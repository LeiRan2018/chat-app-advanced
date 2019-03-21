import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = JSON.parse(localStorage.getItem('token'));
        const authRequest = req.clone({
            headers: req.headers.set('authorization', 'Bearer ' + authToken)
        });
        return next.handle(authRequest);
    }
}