import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private internalConnectChanged = new Subject<boolean>(); 
  get connectionChanged(){
    return this.internalConnectChanged.asObservable();
  }
  get isOnline(){
    return !!window.navigator.onLine;
  }

  constructor() { 
window.addEventListener('online', ()=> this.updateOnlineStatus());
window.addEventListener('offline', ()=> this.updateOnlineStatus());
  }

  private updateOnlineStatus(){
    this.internalConnectChanged.next(window.navigator.onLine);

  }
}
