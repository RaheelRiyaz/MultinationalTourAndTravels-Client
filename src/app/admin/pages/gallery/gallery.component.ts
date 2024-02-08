import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { GalleryResponse } from '../../../models/gallery';
import { ToastSwal } from '../../../utilis/swal';
import { environment } from '../../../../environments/environment';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private service: BaseService) {}

  galleryImages: GalleryResponse[] = [];
  basePath = environment.IMAGE_URL;
  
  ngOnInit(): void {
    initFlowbite();
    this.getImages();
  }
  getImages(): void {
    this.service.Fetch<GalleryResponse>('gallery').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.galleryImages = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  addImages(form: any): void {
    let formData = new FormData(form);

    this.service.Post<FormData, number>(formData, 'gallery').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          ToastSwal.fireSwal(response.message);
          this.getImages();
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteImage(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service
          .Post<any, number>({ ids: [id] }, `gallery/delete-images`)
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                ToastSwal.fireSwal(response.message);
                this.getImages();
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
