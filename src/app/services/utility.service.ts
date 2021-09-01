import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()

export class UtilityService {

    constructor(
        private apiService: ApiService
    ) { }

}