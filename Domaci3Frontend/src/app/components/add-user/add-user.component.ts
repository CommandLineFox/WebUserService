import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser: any = {
    firstName: '',
    lastName: '',
    mail: '',
    readUserPermission: 0,
    createUserPermission: 0,
    updateUserPermission: 0,
    deleteUserPermission: 0
  };

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    // Convert boolean states to 1 or 0
    this.convertCheckboxValues();
    this.userService.addUser(this.newUser).subscribe(() => {
      this.userService.notifyUserListRefresh();
      this.router.navigate(['/list']);
    });
  }

  private convertCheckboxValues() {
    for (const key of Object.keys(this.newUser)) {
      if (typeof this.newUser[key] === 'boolean') {
        this.newUser[key] = this.newUser[key] ? 1 : 0;
      }
    }
  }
}
