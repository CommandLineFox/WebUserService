import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDto } from 'src/app/dto/UserDto';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { CustomTokenPayload } from 'src/app/security/CustomTokenPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  users: UserDto[] = [];
  permissions: CustomTokenPayload = {} as CustomTokenPayload;
  private userListRefreshSubscription: Subscription | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.checkPermissions();
    this.refreshUserList();
    this.userListRefreshSubscription = this.userService.refreshUserList$.subscribe(() => {
      this.refreshUserList();
    });
  }

  ngOnDestroy() {
    if (this.userListRefreshSubscription) {
      this.userListRefreshSubscription.unsubscribe();
    }
  }

  refreshUserList() {
    if (this.permissions.ROLE_READ) {
      this.userService.getUsers().subscribe((users: UserDto[]) => {
        this.users = users;
      });
    }
  }

  deleteUser(userId: number) {
    if (this.permissions.ROLE_DELETE && confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.userService.notifyUserListRefresh();
      });
    }
  }

  navigateToAddUser() {
    if (this.permissions.ROLE_ADD) {
      this.router.navigate(['/add-user']);
    }
  }

  navigateToEditUser(userId: number) {
    if (this.permissions.ROLE_UPDATE) {
      this.router.navigate(['/edit-user', userId]);
    }
  }

  private checkPermissions() {
    const token = localStorage.getItem('token');
    if (token) {
      this.permissions = jwtDecode<CustomTokenPayload>(token);
    }
  }
}
