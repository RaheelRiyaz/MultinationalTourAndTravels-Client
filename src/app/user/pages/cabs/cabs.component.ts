import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrl: './cabs.component.scss',
})
export class CabsComponent {
  cabs: any[] = [];
  basePath = environment.IMAGE_URL;
  constructor(private service: BaseService) {}

  ngOnInit(): void {
    this.service.Fetch<any>('cabs/all-cabs').subscribe({
      next: (response) => {
        if (response.isSuccess) this.cabs = response.result;
      },
      error: (err: Error) => {},
    });
  }
}
