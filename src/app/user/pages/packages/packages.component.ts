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
  pageSize: number = 6;
  showLoader: boolean = false;
  component = Loader.Package;
  errorMessage: string = '';
  ngOnInit(): void {
    this.errorMessage = '';
    this.fetchPackages();
    EmitterService.packageEmitter.subscribe({
      next: (res: any) => {
        this.showLoader = true;
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
          if (response.isSuccess)
            if (response.result.length === 0)
              this.errorMessage = 'No more package found';
          this.packages = [...this.packages, ...response.result];
        },
        error: (err: Error) => {},
        complete: () => {
          this.showLoader = false;
        },
      });
  }
}
