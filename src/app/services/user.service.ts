import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class UserService {

    constructor(
        private apiService: ApiService
    ) { }

    public getListInvestPackage(params): Observable<any> {
        return this.apiService.post(`/account/invest/list`, params)
    }

    public getUserList(params): Observable<any> {
        return this.apiService.post(`/account/user/list`, params)
    }

    public getUserById(id): Observable<any> {
        return this.apiService.get(`/account/user/${id}`)
    }

    public updateUser(id, params): Observable<any> {
        return this.apiService.put(`/account/user/${id}`, params)
    }

    public updateStatusUser(id, params): Observable<any> {
        return this.apiService.put(`/account/user/status/${id}`, params)
    }

    public updateStatusInvest(id, params): Observable<any> {
        return this.apiService.put(`/account/invest/status/${id}`, params)
    }
}