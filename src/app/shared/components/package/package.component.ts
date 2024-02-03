import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss',
})
export class PackageComponent {
  @Input() package: any;
  MAP_URL = '';
  basePath = environment.IMAGE_URL;
  ngAfterViewInit(): void {
    this.MAP_URL = `https://www.google.com/maps/search/?api=1&query=${this.package.packageResponse.longitude},${this.package.packageResponse.latitude}`;
  }

  getMapUrl(longitude: number, latitude: number): string {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
    const encodedLongitude = encodeURIComponent(longitude.toString());
    const encodedLatitude = encodeURIComponent(latitude.toString());
    return `${baseUrl}${encodedLongitude},${encodedLatitude}`;
  }
}
