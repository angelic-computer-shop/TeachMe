import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private cardCoveredStatus = new BehaviorSubject<boolean>(false);
  cardCoveredStatus$ = this.cardCoveredStatus.asObservable();

  setCardCoveredStatus(status: boolean) {
    this.cardCoveredStatus.next(status);
  }
}
