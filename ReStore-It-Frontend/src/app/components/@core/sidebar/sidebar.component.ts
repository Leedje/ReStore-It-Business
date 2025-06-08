import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManagementService } from '../../../services/sessionManagementService/session-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private readonly router = inject(Router);
  private SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
  private Default = {
    scrollbarTheme: 'os-theme-light',
    scrollbarAutoHide: 'leave',
    scrollbarClickScroll: true,
  };

  constructor(public session: SessionManagementService) { }

  ngOnInit(): void {
    this.initializeScrollbars();
  }

  navigateToManageProducts(): void {
    this.router.navigate(['/business']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  navigateToPendingOrders(): void {
    this.router.navigate(['/business/orders/pending']);
  }

  navigateToChat() {
    this.router.navigate(['/business/chats']);
    }

  signOut(): void {
    this.session.endSession();
    if (this.router.url !== '/business/login') {
      this.router.navigate(['/business/login'], { replaceUrl: true });
    }
  }

  private initializeScrollbars(): void {
    const sidebarWrapper = document.querySelector(this.SELECTOR_SIDEBAR_WRAPPER);
    if (sidebarWrapper && (window as any).OverlayScrollbars) {
      (window as any).OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: this.Default.scrollbarTheme,
          autoHide: this.Default.scrollbarAutoHide,
          clickScroll: this.Default.scrollbarClickScroll,
        },
      });
    }
  }


}
