import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading$ = new ReplaySubject<boolean>(1);

  constructor() {}

  setLoadingState(loading: boolean) {
    this.loading$.next(loading);
  }

  getLoadingState(): Observable<boolean> {
    return this.loading$;
  }
}
