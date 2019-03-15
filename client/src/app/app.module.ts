import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChatService } from './chat.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ContactComponent } from './contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ChatComponent,
    ChatroomComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    ChatService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
