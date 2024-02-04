import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { environment } from '../../../../environments/environment';
import { CabResponse } from '../../../models/cab';

@Component({
  selector: 'app-cabs',
  templateUrl: './cabs.component.html',
  styleUrl: './cabs.component.scss',
})
export class CabsComponent {
  cabs: CabResponse[] = [];
  basePath = environment.IMAGE_URL;
  constructor(private service: BaseService) {}

  ngOnInit(): void {
    this.service.Fetch<CabResponse>('cabs/all-cabs').subscribe({
      next: (response) => {
        if (response.isSuccess) this.cabs = response.result;
      },
      error: (err: Error) => {},
    });
  }
}
