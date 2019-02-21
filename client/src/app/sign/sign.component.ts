import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Sign } from '../models/sign.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {
  model = new Sign('', '');
  returnUrl = '/login';
  constructor(
    private chat: ChatService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }
  //sign up user with chat service
  signuser() {
    this.chat.signuser(this.model)
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
  }

}

