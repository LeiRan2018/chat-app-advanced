import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Chats } from '../models/chats.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  currentUser: any;
  chats: Array<Chats>;
  hindex: boolean;
  chatForm = new FormGroup({
    chat: new FormControl('', Validators.required),
  });
  constructor(

    private chat: ChatService,
  ) {
    this.chats = new Array<Chats>();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // this.hindex = (this.currentUser.message.length + 1) % 2 == 0 ? true : false;
    // this.hindex = true;

  }
  ngOnInit() {
    this.getChat();
  }

  sendMessage(meg: string) {
    let time = new Date().toLocaleString();
    this.chat.sendMsg({ meg: meg, username: this.currentUser.username, userid: this.currentUser.userid, time: time });
    this.chat.postchat({ msg: meg, userid: this.currentUser.userid, chatid: this.currentUser.chatid }).subscribe();
    if (this.chatForm.valid) {
      this.chatForm.reset();
    }
  }
  getChat() {
    this.chat.messages.subscribe(msg => {
      this.chats.push(msg);
      console.log(msg.meg);
      // this.chat.postchat({ msg: msg.meg, userid: this.currentUser.userid, chatid: this.currentUser.chatid }).subscribe();
    });

  }
}