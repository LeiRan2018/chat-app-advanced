import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';


export const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent},
  { path: 'contact', component: ContactComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]

})
export class AppRoutingModule { }
// export const routing = RouterModule.forRoot(routes);