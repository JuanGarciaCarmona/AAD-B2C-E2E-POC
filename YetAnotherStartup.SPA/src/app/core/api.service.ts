import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(private _httpClient: HttpClient) { }
      
    getValues(): Observable<any[]> {
        return this._httpClient.get<any[]>('https://localhost:5001/api/values');
    }

    getSecuredValues(): Observable<any[]> {
        return this._httpClient.get<any[]>('https://localhost:5001/api/securedvalues');
    } 
}