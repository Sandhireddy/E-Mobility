import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CdrService {

  constructor(private _http: HttpClient) { }

  getFullRecords(): Observable<any>{
    return this._http.get(`${environment.apiURL}/cdr/`);
  }
}
