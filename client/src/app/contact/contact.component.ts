import { Component, OnInit } from '@angular/core';
import { IContact } from './contact';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { FriendService } from '../friend/friend.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    contacts: IContact[];
    currentUser: any;

    constructor(
        private _contactService: ContactService,
        private friendService: FriendService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(): void {
        this.getContacts();
    }

    getContacts() {
        console.log(this.currentUser);
        this._contactService.getContacts(this.currentUser.email).subscribe(data => {
            this.contacts = data;
            console.log(data);
        })
    }

    addUser(user: IContact) {
        let host = this.currentUser.email;
        let hostId = this.currentUser.userId;
        console.log({ host: host, hostId: hostId, friend: user.email, friendId: user.userId });
        this._contactService.addUser({ host: host, hostId: hostId, friend: user.email, friendId: user.userId }).subscribe(res => {
            console.log(res);
            this.friendService.friendAddSubject.next({friendID: user.userId,friendEmail: user.email});
            alert("friend added!");
        });
    }
}
