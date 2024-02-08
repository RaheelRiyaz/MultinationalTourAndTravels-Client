import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import {
  SliderResponse,
  UpdateSlideStatusRequest,
} from '../../../models/slider';
import { ToastSwal } from '../../../utilis/swal';
import { environment } from '../../../../environments/environment';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  constructor(private service: BaseService) {}
  slides: SliderResponse[] = [];
  @ViewChild('checkBox') checkBox!: ElementRef;
  basePath = environment.IMAGE_URL;

  ngOnInit(): void {
    initFlowbite();
    this.getAllSlides();
  }

  getAllSlides(): void {
    this.service.Fetch<SliderResponse>('slider/all-slides').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.slides = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  toggleSlideStatus(isChecked: boolean, id: string): void {
    const model = new UpdateSlideStatusRequest(id, isChecked ? 1 : 2);
    this.service
      .Update<UpdateSlideStatusRequest, number>(model, 'slider/change-status')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
            this.getAllSlides();
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }

  addNewSlide(form: any): void {
    let formData = new FormData(form);
    console.log(this.checkBox.nativeElement.checked);

    formData.append(
      'showSlide',
      this.checkBox.nativeElement.checked ? '1' : '2'
    );

    this.service.Post<FormData, number>(formData, 'slider').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getAllSlides();
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteSlide(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`slider/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              ToastSwal.fireSwal(response.message);
              this.getAllSlides();
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
