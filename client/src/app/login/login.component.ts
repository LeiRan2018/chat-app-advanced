import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model = new Login('');
  error: string;
  constructor(
    private chat: ChatService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    //remove localstorage once routing to login page
    this.chat.logout();
  }
  //send user name to backend with chat service, success routing to root else show error message
  loginuser() {
    this.chat.loginuser(this.model).subscribe(
      (res) => { 
        //join to broadcast room
        this.chat.joinroom(res['chatid']);
        this.router.navigate(['/']);
        console.log(res);
       },
      () => { this.error = 'user not existed, please sign up' });
  }

}
