import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class AdminService {

    constructor(
        private apiService: ApiService
    ) { }

    public getAdminList(params): Observable<any> {
        return this.apiService.post(`/account/admin/list`, params)
    }

    public getAdminById(id): Observable<any> {
        return this.apiService.get(`/account/admin/${id}`)
    }

    public insertAdmin(params): Observable<any> {
        return this.apiService.post(`/account/admin`, params)
    }

    public updateNameAdmin(id, params): Observable<any> {
        return this.apiService.put(`/account/admin/name/${id}`, params)
    }

    public updateStatusAdmin(id, params): Observable<any> {
        return this.apiService.put(`/account/admin/status/${id}`, params)
    }

    public resetAdminPassword(id): Observable<any> {
        return this.apiService.put(`/account/admin/reset-password/${id}`)
    }

}