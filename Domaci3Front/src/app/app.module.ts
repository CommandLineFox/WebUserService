import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";

@NgModule({
  declarations: [
    LoginComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'users', component: UserListComponent},
      {path: 'add', component: AddUserComponent},
      {path: 'edit/:id', component: EditUserComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class AppModule {
}
