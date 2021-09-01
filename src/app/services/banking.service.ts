import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class BankingService {

    constructor(
        private apiService: ApiService
    ) { }

    public getBankList(params): Observable<any> {
        return this.apiService.post(`/bank/list`, params)
    }

    public getBankById(id): Observable<any> {
        return this.apiService.get(`/bank/${id}`)
    }

    public insertBank(params): Observable<any> {
        return this.apiService.post(`/bank`, params)
    }

    public updateBank(id, params): Observable<any> {
        return this.apiService.put(`/bank/${id}`, params)
    }

    public updateStatusBank(id, params): Observable<any> {
        return this.apiService.put(`/bank/status/${id}`, params)
    }

    public deleteBank(id): Observable<any> {
        return this.apiService.delete(`/bank/${id}`)
    }

}