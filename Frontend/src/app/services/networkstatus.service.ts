import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkstatusService {
  onlineStatusChanged = new Subject<boolean>();
  onlineStatus$ = this.onlineStatusChanged.asObservable();
  private otherErrorOccurred = new Subject<void>();

constructor() { 
  this.initialize();
  this.onlineStatusChanged.next(true);
}

private initialize() {
  window.addEventListener('online', () => this.updateOnlineStatus());
  window.addEventListener('offline', () => this.updateOnlineStatus());
}

private updateOnlineStatus() {
  this.onlineStatusChanged.next(navigator.onLine);
}


notifyBackOnline() {
  this.onlineStatusChanged.next(true);
}

notifyOtherError() {
  this.otherErrorOccurred.next();
}

otherErrorNotification() {
  return this.otherErrorOccurred.asObservable();
}

}
