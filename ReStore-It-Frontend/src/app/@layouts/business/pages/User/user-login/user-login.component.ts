import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../../services/loginService/login.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { UserDTO } from '../../../../../dtos/userDTO';
import { LoginDTO } from '../../../../../dtos/loginDTO';
import { SuccessNotificationComponent } from "../../../../../components/success-notification/success-notification.component";
import { delay } from 'rxjs';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, FormsModule, SuccessNotificationComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  showPassword: boolean = false;

  loginCredentials: LoginDTO = new LoginDTO();

  failedLoginAttempts: number = 0;

  isTimeoutActive: boolean = false;
  timeoutDuration: number = 0;
  countDown: any;

  message: string = '';

  constructor(private router: Router, private loginService: LoginService, private session: SessionManagementService) {
  }

  navigateToRegistration(): void {
    this.router.navigate(['/business/register']);
  }
  navigateToGuest() {
    window.location.href = "http://localhost:4200";
  }

  public validateLogin() {
    this.loginService.ValidateLogin(this.loginCredentials).subscribe((response: HttpResponse<any>) => {

      if (response.status == 200 && response.body?.token) {
        const userToken = response.body?.token;
        this.session.setSession(userToken);
        this.router.navigate(['/business']);
      } else {
        console.log("Login failed: Token missing or unexpected response.");
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.failedLoginAttempts++;
          this.activateTimeout();
          console.log("Unauthorized: Incorrect credentials.");
        } else {
          console.log("Login error:", error.message);
        }
      }
    );
  }

  activateTimeout() {
    let timeout: number;
    let timeoutMessage: string;

    switch (this.failedLoginAttempts) {
      case 1:
        timeout = 3000
        timeoutMessage = "Your email or password is incorrect";
        break;
      case 2:
        timeout = 30000;
        timeoutMessage = "Please try again in 30s."
        break;
      case 3:
        timeout = 60000;
        timeoutMessage = "Please try again in 1 min."
        break;
      case 4:
        timeout = 300000;
        timeoutMessage = "Please try again in 5 mins."
        break;
      case 5:
        timeout = 1800000;
        timeoutMessage = "Please try again in 30 mins."
        break;
      case 6:
        default:
        timeout = 7200000;
        timeoutMessage = "Please try again in 2 hrs."
        break;
    }

    this.isTimeoutActive = true;
    this.timeoutDuration = timeout;
    this.message = timeoutMessage;

    this.countDown = setInterval(() => {
      this.timeoutDuration -= 1000;

      if (this.timeoutDuration <= 0) {
        clearInterval(this.countDown);
        this.isTimeoutActive = false;
        this.message = '';
      }
    }, 1000)
  }

}
