import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent},
  {path: 'add', component: AddUserComponent},
  {path: 'edit/:id', component: EditUserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouter {
}
