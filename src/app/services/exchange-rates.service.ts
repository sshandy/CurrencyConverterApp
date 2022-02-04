import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExchangeRatesResponse} from './payloads/exchange-rates-reponse';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(private http: HttpClient) {
  }

  getRates(): Observable<ExchangeRatesResponse> {
    // I am using exchange rate host API and it always provide the exchange rate
    // based on 'EUR' as base currency no matter what base currency passed to the
    // API. So, I am considering base currency as 'EUR' and handling accordingly.
    // There might be other APIs but I haven't found it free.
    const base_curr = 'EUR';
    return this.http.get<ExchangeRatesResponse>(
      'https://api.exchangerate.host/latest&base=${base_curr}'
    );
  }
}