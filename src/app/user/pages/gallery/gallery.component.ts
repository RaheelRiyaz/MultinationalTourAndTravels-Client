import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';
import { EmitterService } from '../../../services/emiiter.service';
import { Loader } from '../../../enums/enums';
import { GalleryResponse } from '../../../models/gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private service: BaseService) {}
  pageNo: number = 1;
  pageSize: number = 6;
  images: GalleryResponse[] = [];
  imageSrc: string = '';
  errorMessage: string = '';
  value = Loader.Gallery;
  isDisabled: boolean = false;
  basePath: string = environment.IMAGE_URL;
  ngOnInit(): void {
    this.getGalleryImages();
    EmitterService.galleryEmitter.subscribe({
      next: (res: any) => {
        this.pageNo++;
        this.getGalleryImages();
      },
    });
  }

  getGalleryImages(): void {
    this.service
      .Fetch<GalleryResponse>(
        `gallery/pagewize/${this.pageNo}/${this.pageSize}`
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            if (response.result.length === 0) {
              this.isDisabled = true;
              this.errorMessage = 'No more images found';
            }
            this.images = [...this.images, ...response.result];
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
