import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from '../chat.service';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:3000';
  subject: BehaviorSubject<string>;
  constructor(
    private http: HttpClient,
    private chat: ChatService) {
    this.subject = new BehaviorSubject("");
  }

  getContacts(email: string): Observable<IContact[]> {
    return this.http.post<IContact[]>(`${this.url}/api/contacts`, { data: email }).pipe(
      map(res => { return res['data']['contacts'] })
    );
  }

  // selectUser(users: any): Observable<string> {
  //   return this.http.post(`${this.url}/api/one`, { data: users }).pipe(
  //     map(res => {
  //       this.chat.joinroom(res['data']['roomID']);
  //       return res['data'];
  //     }));
  // }

  addUser(user: any): Observable<string> {
    return this.http.post(`${this.url}/api/one/adduser`, { data: user }).pipe(
      map(res => {
        // this.chat.joinroom(res['data']['roomID']);
        return res['message'];
      }));
  }

}
