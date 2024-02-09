import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { environment } from '../../../../../environments/environment';
import { initFlowbite } from 'flowbite';
import { ToastSwal } from '../../../../utilis/swal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {
  constructor(private service: BaseService, private router: Router) {}
  packages: any[] = [];
  basePath = environment.IMAGE_URL;
  ngOnInit(): void {
    initFlowbite();
    this.getPackages();
  }

  getPackages(): void {
    this.service.Fetch<any>('packages/all-packages').subscribe({
      next: (response) => {
        if (response.isSuccess) this.packages = response.result;
      },
      error: (err: Error) => {},
    });
  }

  toggleStatus(id: string) {
    this.service.Update<any, number>({ id }, 'packages/status').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getPackages();
        } else ToastSwal.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  navigate(route: string, id: string): void {
    this.router.navigate([route + id]);
  }

  addPackage(form: any): void {
    const formData = new FormData(form);

    this.service.Post<FormData, number>(formData, 'packages').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getPackages();
        } else ToastSwal.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }
}
