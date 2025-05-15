import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  imports: [CommonModule],
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.css'
})
export class ErrorNotificationComponent {

  @Input() title: String = 'An error occured.';
  @Input() message: String = '';
  @Input() isVisible: boolean = false;

  onCancel(): void {
    this.isVisible = false;
  }
}
