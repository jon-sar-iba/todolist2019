import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSubject: Subject<any>;

  constructor() { 
    this.alertSubject = new Subject();
  }

  show(obj: any): void {
    this.alertSubject.next(obj);
  }
}
