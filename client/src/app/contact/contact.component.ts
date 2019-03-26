import { Component, OnInit } from '@angular/core';
import { IContact } from './contact';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    contacts: IContact[];
    currentUser: any;

    constructor(private _contactService: ContactService) {
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
        this._contactService.addUser({host: host, friend: user.email, friendId: user.userId}).subscribe(res => {
            console.log(res);
        });
    }
}
