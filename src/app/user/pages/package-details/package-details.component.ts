import { Component, ViewChild } from '@angular/core';
import { initCarousels, initFlowbite } from 'flowbite';
import { BaseService } from '../../../services/base.service';
import {
  CompactPackage,
  PackageCostingResponse,
} from '../../../models/package';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BookingRequest } from '../../../models/booking';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.scss',
})
export class PackageDetailsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {
    initFlowbite();
  }
  showSpinner: boolean = false;
  basePath: string = environment.IMAGE_URL;
  packageDetails!: CompactPackage;
  costings: PackageCostingResponse[] = [];
  bookingrequest: BookingRequest = new BookingRequest();
  id!: string;
  ngOnInit(): void {
    initCarousels();
    initFlowbite();
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.id = res['id'];
        this.getCompactPackageById();
        this.getPackageCosting();
      },
    });
    initFlowbite();
    window.scrollTo(0, 0);
  }

  getCompactPackageById(): void {
    this.service
      .Find<CompactPackage>(`packages/compactpackage/${this.id}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) this.packageDetails = response.result;
        },
        error: (err: Error) => {},
      });
  }

  toggle(div: any, icon: any) {
    div.classList.toggle('hidden');
    icon.classList.contains('fa-caret-down')
      ? icon.classList.replace('fa-caret-down', 'fa-caret-up')
      : icon.classList.replace('fa-caret-up', 'fa-caret-down');
  }

  getPackageCosting(): void {
    this.service
      .Fetch<PackageCostingResponse>(`PackageCosting/${this.id}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) this.costings = response.result;
        },
        error: (err: Error) => {},
      });
  }
  sendEnquiry(): void {
    this.showSpinner = true;
    this.bookingrequest.packageId = this.id;

    this.service
      .Post<BookingRequest, any>(this.bookingrequest, 'bookings')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
          this.showSpinner = false;
        },
        complete: () => {
          this.showSpinner = false;
        },
      });
  }
}
