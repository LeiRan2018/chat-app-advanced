import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.url}/api/contacts`).pipe(
      map(res => { return res['data']['contacts'] })
    );
  }

}
