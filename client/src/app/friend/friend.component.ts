import { Component, OnInit } from '@angular/core';
import { IContact } from '../contact/contact';
import { FriendService } from './friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friends: IContact[];
  currentUser: any;
  selectedFriend: any;

  constructor(
    private friendService: FriendService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getFriends();
  }

  selectUser(user: any) {
    this.selectedFriend = user;
    let users = [user.friendID, this.currentUser.userId];
    this.friendService.selectUser(users).subscribe(res => {
      console.log(res);
      this.friendService.subject.next(res['roomID']);
    });
  }

  getFriends() {
    this.friendService.getFriends(this.currentUser.email).subscribe(res => {
      this.friends = res;
    });
  }
}
