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
  pageSize: number = 6;
  showLoader: boolean = false;
  hotelLoader: Loader = Loader.Hotel;
  errorMessage: string = '';
  hotels: HotelResponse[] = [];

  ngOnInit(): void {
    this.errorMessage = '';
    this.getHotels();
    EmitterService.hotelEmitter.subscribe({
      next: (res: any) => {
        this.showLoader = true;
        this.pageNo++;
        this.getHotels();
      },
    });
  }

  getHotels(): void {
    this.service
      .Fetch<HotelResponse>(
        `hotels/hotels-pagewize/${this.pageNo}/${this.pageSize}`
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            if (response.result.length === 0)
              this.errorMessage = 'No more hotel found';
            this.hotels = [...this.hotels, ...response.result];
          }
        },
        error: (err: Error) => {},
        complete: () => {
          this.showLoader = false;
        },
      });
  }
}
