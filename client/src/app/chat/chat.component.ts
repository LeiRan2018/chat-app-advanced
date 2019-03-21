import { Component, OnInit } from '@angular/core';
import { faCog, faPaperclip, faCommentAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
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

  ngOnInit() {

  }


}
