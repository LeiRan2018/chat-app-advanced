import { Component, OnInit } from '@angular/core';
import { faCog, faPaperclip, faCommentAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  faSetting = faCog;
  faPaperClip = faPaperclip;
  faCommentDots = faCommentAlt;
  faUser = faUser;
  faSearch = faSearch;

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

  receive() {
    this.chat.getMessages().subscribe(msg => {
      console.log(msg)
      this.messages.push(msg);
      console.log(this.messages);
    })
  }

}
