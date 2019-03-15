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

  user: Login;
  error: string;
  constructor(
    private chat: ChatService,
    private router: Router,
  ) {
    this.user = new Login();
  }

  ngOnInit() {
    //remove localstorage once routing to login page
    this.chat.logout();
  }
  //send user name to backend with chat service, success routing to root else show error message
  loginuser() {
    this.chat.loginuser(this.user).subscribe(
      (res) => {
        //join to broadcast room
        // this.chat.joinroom(res['chatid']);
        this.router.navigate(['/chat']);
        // console.log(res);
      },
      () => { 
        alert('user not existed');
        this.user = new Login();
       });
  }

  signuser() {
    this.chat.signuser(this.user)
      .subscribe(() => {
        alert('user registerd');
        this.router.navigate(['/login']);
      });
  }
}
