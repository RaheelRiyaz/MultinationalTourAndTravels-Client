import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { LinkTreeResponse } from '../../../models/linktree';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent {
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
