import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { Loader } from '../../../enums/enums';
import { EmitterService } from '../../../services/emiiter.service';
import { DisplayingPackageResponse } from '../../../models/package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {
  constructor(private service: BaseService) {}
  packages: DisplayingPackageResponse[] = [];
  pageNo: number = 1;
  pageSize: number = 2;
  component = Loader.Package;
  ngOnInit(): void {
    this.fetchPackages();
    EmitterService.packageEmitter.subscribe({
      next: (res: any) => {
        this.pageNo++;
        this.fetchPackages();
      },
    });
  }

  fetchPackages(): void {
    this.service
      .Fetch<DisplayingPackageResponse>(
        `packages/display-packages/pagewize/${this.pageNo}/${this.pageSize}`
      )
      .subscribe({
        next: (response) => {
          console.log(response);

          if (response.isSuccess)
            this.packages = [...this.packages, ...response.result];
        },
        error: (err: Error) => {},
      });
  }
}
