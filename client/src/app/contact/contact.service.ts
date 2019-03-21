import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {

  }
  getContacts(): IContact[] {
    return [
      {
        'name': 'John Doe',
        'time': '10:20 PM',
        'status': 'online'
      },
      {
        'name': 'Mark Doe',
        'time': '10:10 PM',
        'status': 'offline'
      },
      {
        'name': 'Jean Doe',
        'time': '10:00 PM',
        'status': 'online'
      }
    ];
  }
}
