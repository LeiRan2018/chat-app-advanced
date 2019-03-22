import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  currentUser: any;
  messages: Array<any>;

  constructor(
    private chat: ChatService,

  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.messages = new Array<any>();
  }

  ngOnInit() {
    this.receive();
  }

  send(mess: string) {
    console.log(mess)
    this.chat.sendMessage({ room: this.currentUser.userId, mess: mess, user: this.currentUser.email });
    this.chat.postchat({ msg: mess, username: this.currentUser.email, chatid: this.currentUser.userId }).subscribe();
  }

  receive() {
    this.chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
      console.log(this.messages);
    })
  }

}
