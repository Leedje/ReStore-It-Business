import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services/userService/user.service';
import { UserDTO } from '../../../../../dtos/userDTO';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  registerForm: FormGroup;
  emailExists: boolean = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService)
  {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=\\S+$).{8,}$')
      ]]
    });
  }

  signUpAndRegister() {
    if (this.registerForm.invalid) return;

    const user: UserDTO = this.registerForm.value;

    this.userService.CreateUser(user).subscribe(response => {
      if (response.status === 200 || response.status === 201) {
        this.router.navigate(['/business/login'],
          {state: { success: 'Account successfully created. Please log in.' }
          });
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 409){
        this.emailExists = true;
      } else{
        console.error("An internal error occured: ", error.message);
      }
    });
  }

  required(field: string): boolean {
    const inputField = this.registerForm.get(field);
    return inputField?.touched && inputField?.hasError('required') || false;
  }
}
