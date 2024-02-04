import { Component } from '@angular/core';
import { EmitterService } from '../../../services/emiiter.service';
import { Loader } from '../../../enums/enums';
import { BaseService } from '../../../services/base.service';
import { HotelResponse } from '../../../models/hotel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent {
  constructor(private service: BaseService) {}
  pageNo: number = 1;
  pageSize: number = 1;
  hotelLoader: Loader = Loader.Hotel;
  hotels: HotelResponse[] = [];

  ngOnInit(): void {
    this.getHotels();
    EmitterService.hotelEmitter.subscribe({
      next: (res: any) => {
        this.pageNo++;
        this.getHotels();
      },
    });
  }

  getHotels(): void {
    this.service
      .Fetch<HotelResponse>(`hotels/hotels-pagewize/${this.pageNo}/${this.pageSize}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.hotels = [...this.hotels, ...response.result];
          }
        },
        error: (err: Error) => {},
      });
  }
}
