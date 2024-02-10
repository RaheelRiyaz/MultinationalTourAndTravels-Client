import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { LinkTreeResponse } from '../../../models/linktree';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private service: BaseService, private router: Router) {}
  links: LinkTreeResponse = new LinkTreeResponse();
  ngOnInit(): void {
    this.getlinks();
  }

  getlinks(): void {
    this.service.Find<LinkTreeResponse>('linkTrees').subscribe({
      next: (response) => {
        if (response.isSuccess) this.links = response.result;
      },
      error: (err: Error) => {},
    });
  }
  gotToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  navigateTo(route: string): void {
    this.gotToTop();
    this.router.navigate([route]);
  }
}
