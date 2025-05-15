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
    this.initializeTreeview();
  }

  //Navigation (Sidebar Routing)
  navigateToManageProducts(): void{
    this.router.navigate(['/business']);
  }

  navigateToHome(): void{
    this.router.navigate(['']);
  }

  //End Navigation

  signOut(): void{
    //session end
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

  private initializeTreeview(): void {
    const treeviewItems = document.querySelectorAll('[data-lte-toggle="treeview"]');

    treeviewItems.forEach(item => {
      item.addEventListener('click', function (event) {
        const target = event.target as HTMLElement;

        // Prevent default link behavior (e.g., page reload)
        if (target.tagName === 'A' && target.getAttribute('href') === '#') {
          event.preventDefault();
        }

        const parent = target.closest('.nav-item');
        const submenu = parent?.querySelector('.nav-treeview') as HTMLElement;

        // Prevent toggle if a child menu item is clicked
        if (target.closest('.nav-treeview')) {
          event.stopPropagation();
          return;
        }

        // Toggle submenu
        if (submenu) {
          submenu.classList.toggle('menu-open');
          submenu.style.display = submenu.classList.contains('menu-open') ? 'block' : 'none';
        }
      });
    });
  }
}
