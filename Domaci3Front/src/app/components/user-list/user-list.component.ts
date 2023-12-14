import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from "../../services/user/user.service";
import {UserDto} from "../../dto/UserDto";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserDto[] = [];
  private userListRefreshSubscription: Subscription | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.refreshUserList();
    // Pretplaćujemo se na Subject za osvežavanje liste korisnika
    this.userListRefreshSubscription = this.userService.refreshUserList$.subscribe(() => {
      this.refreshUserList();
    });
  }

  ngOnDestroy() {
    // Unsubscribe prilikom uništavanja komponente kako bismo izbegli curenje memorije
    // @ts-ignore
    this.userListRefreshSubscription.unsubscribe();
  }

  refreshUserList() {
    this.userService.getUsers().subscribe((users: UserDto[]) => {
      this.users = users;
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Pozivamo metodu za obaveštavanje da je lista korisnika promenjena
        this.userService.notifyUserListRefresh();
      });
    }
  }
}
