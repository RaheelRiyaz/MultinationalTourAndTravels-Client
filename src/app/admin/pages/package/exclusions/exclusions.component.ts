import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { ExclusionsResponse } from '../../../../models/package';
import { ToastSwal } from '../../../../utilis/swal';
import { Exclusionrequest } from '../../../../models/inclusion';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-exclusions',
  templateUrl: './exclusions.component.html',
  styleUrl: './exclusions.component.scss',
})
export class ExclusionsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  id!: string;
  exclusionRequest: Exclusionrequest = new Exclusionrequest();

  exclusions: ExclusionsResponse[] = [];
  ngOnInit(): void {
    initFlowbite();
    this.activatedRoute.params.subscribe({
      next: (res) => (this.id = res['id']),
    });
    this.getExclusions();
  }

  getExclusions(): void {
    this.service.Fetch<ExclusionsResponse>(`exclusions/${this.id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) this.exclusions = response.result;
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteExclusion(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`exclusion/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getExclusions();
            }
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  }

  addExclusion(): void {
    this.exclusionRequest.packageId = this.id;

    this.service
      .Post<Exclusionrequest, Exclusionrequest>(
        this.exclusionRequest,
        'exclusion'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getExclusions();
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
