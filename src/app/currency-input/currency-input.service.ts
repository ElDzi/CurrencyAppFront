import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyInputService {
  private currencyInputSubject: Subject<any> = new Subject<any>();

  get currencyInput() {
    return this.currencyInputSubject.asObservable();
  }

  sendCurrencyInputData(data: any) {
    this.currencyInputSubject.next(data);
  }
}
