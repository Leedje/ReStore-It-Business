import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-notification',
  imports: [CommonModule],
  templateUrl: './success-notification.component.html',
  styleUrl: './success-notification.component.css'
})
export class SuccessNotificationComponent implements OnInit {

  message: String = '';
  isVisible: boolean = false;

  ngOnInit(): void {
    this.message = window.history.state?.success || null;

    if(this.message){
      this.isVisible = true;
    }

    setTimeout(() => {
      this.isVisible = false;
      this.message == '';
    }, 3000);

  }

}
