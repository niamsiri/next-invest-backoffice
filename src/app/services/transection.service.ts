import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class TransectionService {

    constructor(
        private apiService: ApiService
    ) { }

    public getDepositList(params): Observable<any> {
        return this.apiService.post(`/transection/deposit/all/list`, params)
    }

    public approveDeposit(id, params): Observable<any> {
        return this.apiService.put(`/transection/approve/deposit/${id}`, params)
    }

    public getWithdrawList(params): Observable<any> {
        return this.apiService.post(`/transection/withdraw/all/list`, params)
    }

    public approveWithdraw(id, params): Observable<any> {
        return this.apiService.put(`/transection/approve/Withdraw/${id}`, params)
    }

}