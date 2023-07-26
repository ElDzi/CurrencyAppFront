import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Pageable} from "../requests-list/request.interface";

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'http://localhost:8080/currencies';

  constructor(private http: HttpClient) {}

  getCurrentCurrencyValue(name: string, currencyCode: string, surname: string): Observable<any> {
    const body = {
      name: name,
      currencyCode: currencyCode,
      surname: surname,
    };
    return this.http.post(`${this.baseUrl}/get-current-currency-value-command`, body);
  }

  getRequests(pageable: Pageable): Observable<any> {
    const params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString());

    return this.http.get<any>(`${this.baseUrl}/requests`, { params });
  }
}
