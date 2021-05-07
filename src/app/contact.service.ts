import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public send(params = {}): Observable<boolean> {
    console.log(params);
    return of(true);
  }
}
