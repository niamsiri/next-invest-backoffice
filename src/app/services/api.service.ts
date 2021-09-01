import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class ApiService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    private setHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        };
        if (window.localStorage['token']) {
            headersConfig['Authorization'] = `Bearer ${window.localStorage['token']}`;
        }
        return new HttpHeaders(headersConfig);
    }

    private setHeadersFile(): HttpHeaders {
        const headersConfig = {
            'X-Requested-With': 'XMLHttpRequest',
        };
        if (window.localStorage['token']) {
            headersConfig['Authorization'] = `Bearer ${window.localStorage['token']}`;
        }
        return new HttpHeaders(headersConfig);
    }

    private formatErrors(error: any) {
        if ((error.status === 401) && (window.location.href.match(/\?/g) || []).length < 2) {
            this.router.navigate(['/']);
        }
        return observableThrowError(error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.apiUrl}${path}`,
            { headers: this.setHeaders(), params: params }).pipe(
                catchError(this.formatErrors.bind(this)));
    }

    getContent(path: string): Observable<any> {
        return this.http.get(`${path}`,
            {
                headers: this.setHeaders(),
                responseType: 'blob'
            }).pipe(catchError(this.formatErrors.bind(this)));
    }

    getEventSource(path: string): Observable<any> {
        return Observable.create(observer => {
            const eventSource = new EventSource(`${environment.apiUrl}${path}`);
            eventSource.onmessage = (x) => {
                if (x.data.length > 0) {
                    observer.next(JSON.parse(x.data));
                }
            };
            eventSource.onerror = x => observer.error(x);
            return () => {
                eventSource.close();
            };
        }).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    postContent(path: string, body: Object = {}): any {
        return this.http.post(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            {
                headers: this.setHeaders(),
                responseType: 'blob'
            }).pipe(
                catchError(this.formatErrors.bind(this)));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() }
        ).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    putFormData(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.apiUrl}${path}`, this.getFormData(body),
            { headers: this.setHeadersFile() }
        ).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            { headers: this.setHeaders() }
        ).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    postFormData(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}${path}`, this.getFormData(body),
            { headers: this.setHeadersFile() }
        ).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    postFile(path: string, file: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}${path}`, file,
            { headers: this.setHeadersFile() }
        )
    }

    delete(path, body: Object = {}): Observable<any> {
        return this.http.request('delete', `${environment.apiUrl}${path}`,
            {
                headers: this.setHeaders(),
                body: JSON.stringify(body),
            }
        ).pipe(
            catchError(this.formatErrors.bind(this)));
    }

    getFormData(object) {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

}