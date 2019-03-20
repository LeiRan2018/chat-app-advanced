import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  constructor(
    private chat: ChatService,
    private route: Router
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.chat.logout();
  };

}
