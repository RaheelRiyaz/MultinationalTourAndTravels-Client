import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { PackageCostingResponse } from '../../../../models/package';
import { ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CostingRequest } from '../../../../models/costing';
import { ToastSwal } from '../../../../utilis/swal';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrl: './costing.component.scss',
})
export class CostingComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  costings: PackageCostingResponse[] = [];
  costingRequest: CostingRequest = new CostingRequest();
  id!: string;
  ngOnInit(): void {
    initFlowbite();
    this.activatedRoute.params.subscribe({
      next: (res) => (this.id = res['id']),
    });

    this.getPackageCosting();
  }
  getPackageCosting(): void {
    this.service
      .Fetch<PackageCostingResponse>(`PackageCosting/${this.id}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.costings = response.result;
        },
        error: (err: Error) => {},
      });
  }

  addcosting(): void {
    this.costingRequest.packageId = this.id;
    this.service
      .Post<CostingRequest, number>(this.costingRequest, 'packagecosting')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getPackageCosting();
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
