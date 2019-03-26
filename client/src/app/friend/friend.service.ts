import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../contact/contact';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private url = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
  ) { }

  getFriends(email: string): Observable<IContact[]> {
    return this.http.post<IContact[]>(`${this.url}/api/contacts/friends`, { data: email }).pipe(
      map(res => { return res['data']['friends'] })
    );
  }
}
