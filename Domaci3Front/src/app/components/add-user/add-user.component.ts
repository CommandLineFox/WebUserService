import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../services/user/user.service";

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

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit() {
    // Pozovi metodu servisa za dodavanje korisnika
    this.userService.addUser(this.newUser).subscribe(() => {
      // Navigiraj nazad na listu korisnika nakon uspešnog dodavanja
      this.router.navigate(['/users']);
    });
  }
}
