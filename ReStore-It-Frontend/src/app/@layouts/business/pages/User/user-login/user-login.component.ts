import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../services/loginService/login.service';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { UserDTO } from '../../../../../dtos/userDTO';
import { LoginDTO } from '../../../../../dtos/loginDTO';
import { SuccessNotificationComponent } from "../../../../../components/success-notification/success-notification.component";

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, FormsModule, SuccessNotificationComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {


  loginCredentials: LoginDTO = new LoginDTO();

  constructor(private router: Router, private loginService: LoginService, private session: SessionManagementService) {
  }

  navigateToRegistration(): void {
    this.router.navigate(['/business/register']);
  }
  navigateToGuest() {
    window.location.href = "http://localhost:4200";
  }
  //const response = await -> try make this async in a new method below
  public validateLogin(login: LoginDTO) {
    this.loginService.ValidateLogin(login).subscribe((response: HttpResponse<any>) => {

      if (response.status == 200 && response.body?.token) {
        const userToken = response.body?.token;
        this.session.setSession(userToken);
        this.router.navigate(['/business']);
      } else {
        console.log("Login failed: Token missing or unexpected response.");
      }
    },
      (error) => {
        // eventually give visual display for error occured
        if (error.status == 401) {
          console.log("Unauthorized: Incorrect credentials.");
        } else {
          console.log("Login error:", error);
        }
      }
    );
  }

}
