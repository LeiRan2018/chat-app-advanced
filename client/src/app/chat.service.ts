import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Login } from './models/login.model';
import { Router } from '@angular/router';
import { IContact } from './contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  // Our constructor calls our wsService connect method
  constructor(
    // private wsService: WebsocketService,
    private http: HttpClient,
    private route: Router
  ) {
    //connecting to server with socket.io
    this.socket = io(this.url);
  }

  //sign up user and send to backend
  signuser(user: Login) {
    return this.http.post(`${this.url}/api/sign`, { 'data': user }).pipe(
      map(res => { return res['data'] })
    );
  }
  //send user message to backend and save to mysql
  postchat(msg: any) {
    return this.http.post(`${this.url}/api/chat/postchat`, { 'data': msg });
  }

  //login use with user name and get user info and chat history from broadcast room by default
  loginuser(user: Login) {
    return this.http.post(`${this.url}/api/login`, { 'data': user }).pipe(
      map(res => {
        //save logged in user in localstorage
        localStorage.setItem('currentUser', JSON.stringify(res['data']['user']));
        localStorage.setItem('token', JSON.stringify(res['data']['user']['token']));
        this.joinroom(res['data']['user']['userId']);
        return res['data']
      })
    );
  }

  //switch to one-one chat mode with these two user name as parameter
  one(name: string) {
    return this.http.post(`${this.url}/api/one`, { data: name }).pipe(
      map(res => {
        localStorage.setItem(res['data'].roomID, JSON.stringify(res['data']));
        return res['data']
      })
    );
  }
  //logout user and clean localstorage 
  async logout() {
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    await this.route.navigate(['/login']).then(() => {
      location.reload();
    })
  }
  //send real message to backend with socket.io
  sendMessage(message) {

    this.socket.emit('add-message', message);
  }
  //join chat room with room id
  joinroom(room) {
    this.socket.emit('room', room);
  }
  //receive real-time message with socket.io
  getMessages() {
    let observable = new Observable(observer => {

      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

}