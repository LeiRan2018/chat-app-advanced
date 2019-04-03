import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ContactService } from '../contact/contact.service';
import { FriendService } from '../friend/friend.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  currentUser: any;
  messages: Array<any>;
  roomId: string;

  constructor(
    private chat: ChatService,
    private contact: ContactService,
    private friendService: FriendService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.messages = new Array<any>();
  }

  ngOnInit() {
    this.receive();
    this.getRoomId();
  }

  send(mess: string) {
    console.log(mess)
    this.chat.sendMessage({ room: this.roomId, mess: mess, user: this.currentUser.email });
    this.chat.postchat({ msg: mess, username: this.currentUser.email, chatid: this.roomId }).subscribe();
  }

  receive() {
    this.chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
      console.log(this.messages);
    })
  }

  getRoomId() {
    console.log(this.messages);
    this.friendService.subject.subscribe(res => {
      this.roomId = res;
      this.messages = new Array<any>();
      console.log(res)
    })
  }

}
