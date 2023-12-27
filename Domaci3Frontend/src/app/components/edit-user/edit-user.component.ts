import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EditUserDto } from 'src/app/dto/EditUserDto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editedUser: EditUserDto = {
    userId: 0,
    firstName: '',
    lastName: '',
    mail: '',
    readUserPermission: 0,
    createUserPermission: 0,
    updateUserPermission: 0,
    deleteUserPermission: 0
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.userService.getUserById(userId).subscribe(user => {
        this.editedUser = user;
      });
    });
  }

  onSubmit() {
    this.convertPermissionsToNumbers();
    this.userService.updateUser(this.editedUser).subscribe(() => {
      this.userService.notifyUserListRefresh();
      this.router.navigate(['/list']);
    });
  }

  private convertPermissionsToNumbers() {
    this.editedUser.readUserPermission = this.editedUser.readUserPermission ? 1 : 0;
    this.editedUser.createUserPermission = this.editedUser.createUserPermission ? 1 : 0;
    this.editedUser.updateUserPermission = this.editedUser.updateUserPermission ? 1 : 0;
    this.editedUser.deleteUserPermission = this.editedUser.deleteUserPermission ? 1 : 0;
  }
}
