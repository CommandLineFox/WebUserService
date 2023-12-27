import { Component } from '@angular/core';
import { TokenRequestDto } from "../../dto/TokenRequestDto";
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CustomTokenPayload } from 'src/app/security/CustomTokenPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  mail: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    const tokenRequest: TokenRequestDto = { mail: this.mail.trim(), password: this.password.trim() };
    this.authService.login(tokenRequest).subscribe((data) => {
      console.log("Hi");
      localStorage.setItem('token', data.token);

      const decodedToken = jwtDecode<CustomTokenPayload>(data.token);

      // Store permissions
      localStorage.setItem('readUserPermission', decodedToken.ROLE_READ.toString());
      localStorage.setItem('createUserPermission', decodedToken.ROLE_ADD.toString());
      localStorage.setItem('updateUserPermission', decodedToken.ROLE_UPDATE.toString());
      localStorage.setItem('deleteUserPermission', decodedToken.ROLE_DELETE.toString());

      this.router.navigate(['/list']);
    }, (error) => {
      console.error('Login error:', error);
    });
  };
}
