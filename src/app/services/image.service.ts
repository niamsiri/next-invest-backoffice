import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class ImageService {

    constructor(
        private apiService: ApiService
    ) { }

    public insertImage(file): Observable<any> {
        return this.apiService.postFormData(`/image`, { file: file })
    }
    
}