import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { CabResponse } from '../../../models/cab';
import { ToastSwal } from '../../../utilis/swal';
import { environment } from '../../../../environments/environment';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrl: './cabs.component.scss',
})
export class CabsComponent {
  constructor(private service: BaseService) {}

  cabs: CabResponse[] = [];
  basePath = environment.IMAGE_URL;
  ngOnInit(): void {
    initFlowbite();
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

  deleteCab(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`cabs/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getCabs();
            }
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  }

  addcab(form: any): void {
    let formData = new FormData(form);
    this.service.Post<FormData, number>(formData, 'cabs').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getCabs();
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }
}
