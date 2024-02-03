import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss',
})
export class HotelComponent {
  @Input() hotel: any;
  basePath: string = environment.IMAGE_URL;
  starsArray: any[] = []; 

  ngAfterViewInit() {
    this.starsArray = Array(this.hotel.stars).fill(0);
  }
}
