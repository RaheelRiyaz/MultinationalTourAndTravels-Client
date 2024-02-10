import { Component } from '@angular/core';
import {
  PackageResponse,
  UpdatePackageRequest,
} from '../../../../models/package';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastSwal } from '../../../../utilis/swal';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrl: './edit-package.component.scss',
})
export class EditPackageComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  id!: string;
  updatePackageRequest: UpdatePackageRequest = new UpdatePackageRequest();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
    this.getPackageById();
  }

  getPackageById(): void {
    this.service.Find<PackageResponse>(`packages/${this.id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.updatePackageRequest = <UpdatePackageRequest>response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }
  updatePackage(): void {
    console.log(this.updatePackageRequest);
    this.service
      .Update<UpdatePackageRequest, number>(
        this.updatePackageRequest,
        'packages'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.router.navigate(['/admin']);
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
