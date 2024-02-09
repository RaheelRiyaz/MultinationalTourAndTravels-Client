import { Component } from '@angular/core';
import {
  DestinationRequest,
  PackageDestination,
} from '../../../../models/destination';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { ToastSwal } from '../../../../utilis/swal';
import { initFlowbite } from 'flowbite';
import { HotelResponse } from '../../../../models/hotel';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss',
})
export class DestinationsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  destinationRequest: DestinationRequest = new DestinationRequest();
  id!: string;
  hotels: HotelResponse[] = [];
  destinations: PackageDestination[] = [];
 

  ngOnInit(): void {
    initFlowbite();
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id = response['id'];
      },
    });
    this.getDestinations();
  }
  addDestination() {
    this.destinationRequest.packageId = this.id;

    this.service
      .Post<DestinationRequest, number>(
        this.destinationRequest,
        'packageDestination'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getDestinations();
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  getDestinations(): void {
    this.service
      .Fetch<PackageDestination>(`packagedestination/packageid/${this.id}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.destinations = response.result;
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  deleteDestination(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`packagedestination/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getDestinations();
            } else ToastSwal.fireSwal(response.message, false);
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  } 
}
