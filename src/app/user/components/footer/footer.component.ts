import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { LinkTreeResponse } from '../../../models/linktree';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private service: BaseService) {}
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
}
