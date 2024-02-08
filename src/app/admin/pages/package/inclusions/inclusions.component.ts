import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { ItineraryResponse } from '../../../../models/package';
import {
  InclusionRequest,
  InclusionResponse,
} from '../../../../models/inclusion';
import { ToastSwal } from '../../../../utilis/swal';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-inclusions',
  templateUrl: './inclusions.component.html',
  styleUrl: './inclusions.component.scss',
})
export class InclusionsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  id!: string;
  inclusionRequest: InclusionRequest = new InclusionRequest();
  inclusions: InclusionResponse[] = [];
  ngOnInit(): void {
    initFlowbite()
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });

    this.getInclusions();
  }

  getInclusions(): void {
    this.service.Fetch<InclusionResponse>(`inclusions/${this.id}`).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.inclusions = response.result;
        } else ToastSwal.fireSwal(response.message, false);
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteInclusion(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`inclusion/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getInclusions();
            }
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  }

  addInclusion(): void {
    this.inclusionRequest.packageId = this.id;

    this.service
      .Post<InclusionRequest, InclusionRequest>(
        this.inclusionRequest,
        'inclusion'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getInclusions();
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
