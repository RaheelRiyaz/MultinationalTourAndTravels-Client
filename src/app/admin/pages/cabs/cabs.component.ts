import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CabResponse } from '../../../models/cab';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrl: './cabs.component.scss',
})
export class CabsComponent {
  constructor(private service: BaseService) {}

  cabs: CabResponse[] = [];
  ngOnInit(): void {
    this.getCabs();
  }

  getCabs(): void {
    this.service.Fetch<CabResponse>('cabs/all-cabs').subscribe({
      next: (response) => {
        if (response.isSuccess) this.cabs = response.result;
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }
}
