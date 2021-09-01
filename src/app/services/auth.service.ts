import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })

export class AuthService {

    public currentUser: Observable<any>;
    private currentUserSubject: BehaviorSubject<any>;

    constructor(
        private apiService: ApiService
    ) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('info'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public login(value) {
        return this.apiService.post('/account/admin/login', value)
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('info');
        this.currentUserSubject.next(null);
    }

    getToken(): String {
        return window.localStorage?.token;
    }

    saveToken(token: any) {
        window.localStorage['token'] = token;
    }

    saveUserInfo(info: any) {
        this.currentUserSubject.next(JSON.stringify(info));
        window.localStorage['info'] = JSON.stringify(info);
    }

}