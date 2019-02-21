import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  one: Object;
  chats: Array<Chats>;
  chatForm = new FormGroup({
    chat: new FormControl('', Validators.required),
  });
  roomID: string;
  broadcast: boolean = true;
  contact: Object;
  oneonetag: string;
  messages: Array<any>;
  constructor(

    private chat: ChatService,
  ) {
    this.messages = new Array<any>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.contact = this.currentUser.contacts.find(el => el.userName === this.currentUser.username);
    this.currentUser.contacts.splice(this.currentUser.contacts.indexOf(this.contact), 1);
    this.roomID = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).chatid : '';

  }
  ngOnInit() {
    this.receive();
  }

  oneone(user: Object) {
    this.chat.one(user['userName'] + ',' + this.currentUser.username).subscribe(value => {
      this.one = JSON.parse(localStorage.getItem(value.roomID));
      this.roomID = value.roomID;
      console.log(this.roomID);
      this.chat.joinroom(this.roomID);
    });
    this.broadcast = false;
    this.oneonetag = user['userName'] + ',' + this.currentUser.username;
    this.messages = new Array<any>();
  }
  broadcasted() {
    this.broadcast = true;
    this.one = null;
    this.roomID = JSON.parse(localStorage.getItem('currentUser')).chatid;
    this.chat.joinroom(this.roomID);
    this.oneonetag = '';
    this.messages = new Array<any>();
  }

  send(mess: string) {
    this.chat.sendMessage({ room: this.roomID, mess: mess });
    this.chat.postchat({ msg: mess + ' from ' + this.currentUser.username, chatid: this.roomID }).subscribe();
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }

  receive() {
    this.chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
    })
  }

}
