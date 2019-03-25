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
    // filteredContacts: IContact[];

    // _contactFilter: string;
    // get contactFilter() {
    //     return this._contactFilter;
    // }

    // set contactFilter(newValue: string) {
    //     this._contactFilter = newValue;
    //     this.filteredContacts = this.contactFilter ? this.performFilter(this.contactFilter) : this.contacts;
    // }

    constructor(private _contactService: ContactService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.contactFilter = '';
    }

    // performFilter(filterBy: string): IContact[] {
    //     filterBy = filterBy.toLocaleLowerCase();
    //     return this.contacts.filter(
    //         (contact: IContact) => contact.name.toLocaleLowerCase().indexOf(filterBy) > -1
    //     );
    // }

    ngOnInit(): void {
        // this.contacts = this._contactService.getContacts().subscribe();
        // this.filteredContacts = this.contacts;
        this.getContacts();
    }

    getContacts() {
        this._contactService.getContacts().subscribe(data => {
            this.contacts = data;
            console.log(data);
        })
    }

    selectUser(user: IContact) {
        let users = [user.userId, this.currentUser.userId];
        this._contactService.selectUser(users).subscribe(res => {
            console.log(res);
            this._contactService.subject.next(res['roomID']);
        });
    }
}
