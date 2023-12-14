import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDto} from "../../dto/UserDto";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editedUser: UserDto = {
    userId: 0,
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    readUserPermission: 0,
    createUserPermission: 0,
    updateUserPermission: 0,
    deleteUserPermission: 0
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id']; // Konvertujemo parametar u broj

      // Pozivamo metodu servisa za dohvatanje informacija o korisniku
      this.userService.getUserById(userId).subscribe(user => {
        this.editedUser = user;
      });
    });
  }

  onSubmit() {
    // Pozivamo metodu servisa za editovanje korisnika
    this.userService.updateUser(this.editedUser).subscribe(() => {
      // Navigiramo nazad na listu korisnika nakon uspešnog editovanja
      this.router.navigate(['/users']);
    });
  }
}
