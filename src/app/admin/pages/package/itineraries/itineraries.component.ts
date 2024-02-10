import { Component } from '@angular/core';
import { BaseService } from '../../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { ItineraryResponse } from '../../../../models/package';
import { ToastSwal } from '../../../../utilis/swal';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrl: './itineraries.component.scss',
})
export class ItinerariesComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  id!: string;
  itineraries: ItineraryResponse[] = [];

  ngOnInit(): void {
    initFlowbite();
    this.activatedRoute.params.subscribe({
      next: (res) => (this.id = res['id']),
    });

    this.getItineraries();
  }

  getItineraries(): void {
    this.service
      .Fetch<ItineraryResponse>(`itinerary/package/${this.id}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) this.itineraries = response.result;
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  submitItinerary(e: any): void {
    let formData = new FormData(e.target);
    formData.append('packageId', this.id);

    this.service
      .Post<FormData, ItineraryResponse>(formData, 'itinerary')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getItineraries();
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
