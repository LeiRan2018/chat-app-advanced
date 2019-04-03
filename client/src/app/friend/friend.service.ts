import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IContact } from '../contact/contact';
import { map } from 'rxjs/operators';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private url = 'http://localhost:3000';
  subject: BehaviorSubject<string>;
  constructor(
    private http: HttpClient,
    private chat: ChatService,
  ) {
    this.subject = new BehaviorSubject("");
  }

  getFriends(email: string): Observable<IContact[]> {
    return this.http.post<IContact[]>(`${this.url}/api/contacts/friends`, { data: email }).pipe(
      map(res => { return res['data']['friends'] })
    );
  };

  selectUser(users: string[]): Observable<string> {
    return this.http.post(`${this.url}/api/one`, { data: users }).pipe(
      map(res => {
        this.chat.joinroom(res['data']['roomID']);
        return res['data'];
      }));
  };

  getHistory(roomID: string) {
    return this.http.post(`${this.url}/api/one/history`, { data: roomID }).pipe(
      map(res => {
        return res['data'];
      }));
  }
}
