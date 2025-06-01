import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services/userService/user.service';
import { UserDTO } from '../../../../../dtos/userDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  user: UserDTO = new UserDTO();

  constructor(private router: Router, private userService: UserService){}

   async signInAndRegister(user: UserDTO){

     this.userService.CreateUser(user).subscribe((response: HttpResponse<any>) =>{
      if (response.status == 200 || response.status == 201){
        this.router.navigate(['/business/login']);
      }
      else{
        console.error("An internal error occured.")
      }
    })
  }
}
