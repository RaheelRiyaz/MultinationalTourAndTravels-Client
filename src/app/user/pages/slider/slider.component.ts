import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';
import { SliderResponse } from '../../../models/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  constructor(private service: BaseService) {}
  slides: SliderResponse[] = [];
  basePath: string = environment.IMAGE_URL;

  ngOnInit(): void {
    this.getActiveSlides();
  }

  getActiveSlides(): void {
    this.service.Fetch<SliderResponse>('Slider/active-slides').subscribe({
      next: (response) => {
        if (response.isSuccess) this.slides = response.result;
      },
      error: (err: Error) => {},
    });
  }
}
