import { Component, OnInit } from '@angular/core';
import { IContact } from '../contact/contact';
import { FriendService } from './friend.service';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friends: IContact[];
  currentUser: any;
  selectedFriend: any;
  friendList: any[];

  constructor(
    private friendService: FriendService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.friendList = new Array<any>();
    this.friendService.getFriends(this.currentUser.email).subscribe(res => {
      this.friendList = res;
    });
  }

  ngOnInit() {
    this.getAddFriend();
  }

  selectUser(user: any) {
    this.selectedFriend = user;
    let users = [user.friendID, this.currentUser.userId];
    this.friendService.selectUser(users).subscribe(res => {
      console.log(res);
      this.friendService.friendSubject.next(res['roomID']);
    });
  }

  getAddFriend() {
    this.friendService.friendAddSubject.subscribe(res => {
      console.log(res)
      this.friendList.push(res);
    })
  }

  deleteFriend(friend) {
    if (confirm("really delete this friend?")) {
      let index = this.friendList.findIndex((element) => {
      return element == friend
    })
    if (index != -1) {
      this.friendList.splice(index, 1);
      this.friendService.deleteFriend(this.currentUser,friend).subscribe();
    }
    }
  }
}
