import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 767) this.closeSidebar();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth <= 767) this.closeSidebar();
      });
  }
  ngAfterViewInit(): void {
    // Close Sidebar
    const closeSidebarButton =
      this.elRef.nativeElement.querySelector('#close-sidebar');
    this.renderer.listen(closeSidebarButton, 'click', () =>
      this.closeSidebar()
    );

    // Show Sidebar
    const showSidebarButton =
      this.elRef.nativeElement.querySelector('#show-sidebar');
    this.renderer.listen(showSidebarButton, 'click', () => this.showSidebar());
  }

  closeSidebar(): void {
    const pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
    pageWrapper.classList.remove('toggled');
  }
  toggleSidebarDropdown(link: any): void {
    const parent = link.parentElement;
    const isActive = parent.classList.contains('active');

    const sidebarDropdowns =
      this.elRef.nativeElement.querySelectorAll('.sidebar-dropdown');
    sidebarDropdowns.forEach((dropdown: any) =>
      dropdown.classList.remove('active')
    );

    if (isActive) {
      parent.classList.remove('active');
    } else {
      const submenu = parent.querySelector('.sidebar-submenu');
      this.renderer.setStyle(submenu, 'display', 'none');
      this.renderer.setStyle(submenu, 'display', 'block');
      parent.classList.add('active');
    }
  }
  showSidebar(): void {
    const pageWrapper = this.elRef.nativeElement.querySelector('.page-wrapper');
    pageWrapper.classList.add('toggled');
  }

  @HostListener('window:resize')
  private handleScreenChange(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
      this.closeSidebar();
    } else {
      this.showSidebar();
    }
  }
}
