import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { LinkTreeResponse } from '../../../models/linktree';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-linktree',
  templateUrl: './linktree.component.html',
  styleUrl: './linktree.component.scss',
})
export class LinktreeComponent {
  constructor(private service: BaseService) {}
  linkTree: LinkTreeResponse = new LinkTreeResponse();

  ngOnInit(): void {
    this.getLinks();
  }

  getLinks(): void {
    this.service.Find<LinkTreeResponse>('linktrees').subscribe({
      next: (response) => {
        if (response.isSuccess) this.linkTree = response.result;
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  updateLinks(): void {
    this.service
      .Update<LinkTreeResponse, number>(this.linkTree, 'linktrees')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getLinks();
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
