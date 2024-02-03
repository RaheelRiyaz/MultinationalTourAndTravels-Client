import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';
import { EmitterService } from '../../../services/emiiter.service';
import { Loader } from '../../../enums/enums';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private service: BaseService) {}
  pageNo: number = 1;
  pageSize: number = 1;
  images: any[] = [];
  value = Loader.Gallery;
  basePath: string = environment.IMAGE_URL;
  ngOnInit(): void {
    this.getGalleryImages();
    EmitterService.galleryEmitter.subscribe({
      next: (res: any) => {
        console.log(res);

        this.pageNo++;
        this.getGalleryImages();
      },
    });
  }

  getGalleryImages(): void {
    this.service
      .Fetch<any>(`gallery/pagewize/${this.pageNo}/${this.pageSize}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess)
            this.images = [...this.images, ...response.result];
        },
        error: (err: Error) => {
          console.log(err);
        },
      });
  }
}
