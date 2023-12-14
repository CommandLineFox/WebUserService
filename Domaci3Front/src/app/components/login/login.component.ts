import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {TokenRequestDto} from "../../dto/TokenRequestDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
  }

  login() {
    const tokenRequest: TokenRequestDto = {email: this.email, password: this.password};

    this.authService.login(tokenRequest).subscribe((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('readUserPermission', data.permissions.readUser.toString());
      localStorage.setItem('createUserPermission', data.permissions.createUser.toString());
      localStorage.setItem('updateUserPermission', data.permissions.updateUser.toString());
      localStorage.setItem('deleteUserPermission', data.permissions.deleteUser.toString());

      // Redirect or handle success as needed
    });
  }
}
