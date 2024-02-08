import { Component, Input } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';
import { HotelResponse } from '../../../models/hotel';
import { ToastSwal } from '../../../utilis/swal';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent {
  constructor(private service: BaseService) {}
  basePath = environment.IMAGE_URL;
  hotels: HotelResponse[] = [];
  @Input() hotel!: HotelResponse;

  // ngAfterViewInit() {
  //   this.starsArray = Array(this.hotel.stars).fill(0);
  // }
  
  ngOnInit(): void {
    initFlowbite();
    this.getHotels();
  }

  getHotels(): void {
    this.service.Fetch<HotelResponse>('hotels').subscribe({
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

  addHotel(form: any): void {
    const formData = new FormData(form);

    this.service.Post<FormData, number>(formData, 'hotels').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getHotels();
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteHotel(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<HotelResponse>(`hotels/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getHotels();
            }
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  }
}
