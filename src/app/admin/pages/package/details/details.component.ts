import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { HotelResponse } from '../../../../models/hotel';
import { ToastSwal } from '../../../../utilis/swal';
import { ActivatedRoute } from '@angular/router';
import { DestinationDetailsRequest } from '../../../../models/destination';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  destinationId!: string;
  hotels: HotelResponse[] = [];
  destinationDetailsRequest: DestinationDetailsRequest =
    new DestinationDetailsRequest();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.destinationId = response['id'];
      },
    });
  }
  getHotels(input: any): void {
    this.service
      .Fetch<HotelResponse>(`hotels/packagetype/${+input.value}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.hotels = response.result;
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  addDetails(): void {
    this.destinationDetailsRequest.packageType =
      +this.destinationDetailsRequest.packageType;
    this.destinationDetailsRequest.destinationId = this.destinationId;

    this.service
      .Post<DestinationDetailsRequest, number>(
        this.destinationDetailsRequest,
        'packagedestination/details'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message,false);
        },
      });
  }
}
