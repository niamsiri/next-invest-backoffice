import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class PackageService {

    constructor(
        private apiService: ApiService
    ) { }

    public getPackageList(params): Observable<any> {
        return this.apiService.post(`/package/list`, params)
    }

    public getPackageById(id): Observable<any> {
        return this.apiService.get(`/package/${id}`)
    }

    public insertPackage(params): Observable<any> {
        return this.apiService.post(`/package`, params)
    }

    public updatePackage(id, params): Observable<any> {
        return this.apiService.put(`/package/${id}`, params)
    }

    public updateStatusPackage(id, params): Observable<any> {
        return this.apiService.put(`/package/status/${id}`, params)
    }

    public deletePackage(id): Observable<any> {
        return this.apiService.delete(`/package/${id}`)
    }
}