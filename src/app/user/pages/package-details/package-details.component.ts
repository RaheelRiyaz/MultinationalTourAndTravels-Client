import { Component, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BaseService } from '../../../services/base.service';
import {
  CompactPackage,
  PackageCostingResponse,
} from '../../../models/package';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
  basePath: string = environment.IMAGE_URL;
  packageDetails!: CompactPackage
  costings: PackageCostingResponse[] = [];
  id!: string;
  ngOnInit(): void {
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
}
