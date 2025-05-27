import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../services/loginService/login.service';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { UserDTO } from '../../../../../dtos/userDTO';

class Login {
  constructor(
    public email: string,
    public password: string
  ) { }
}

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginCredentials: Login = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private loginService: LoginService, private session: SessionManagementService) {

  }

  navigateToRegistration(): void {
    this.router.navigate(['/business/register']);
  }
//const response = await -> try make this async in a new method below
   validateLogin(login: Login) {

    this.loginService.ValidateLogin(login.email, login.password).subscribe((response: any) => {
      const userToken = response.body.token
      this.session.setSession(userToken);
      this.router.navigate(['/business'])
    }, (error) => {
      if (error.status == 401) {
        // Remain on the page (give error notification that either the email or password is incorrect) }
      }
    })
  }

}
