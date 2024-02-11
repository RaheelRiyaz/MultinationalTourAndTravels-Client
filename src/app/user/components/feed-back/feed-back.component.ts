import { Component } from '@angular/core';
import { ContactRequest } from '../../../models/contact';
import { BaseService } from '../../../services/base.service';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrl: './feed-back.component.scss'
})
export class FeedBackComponent {
  constructor(private service: BaseService) {}

  contactRequest: ContactRequest = new ContactRequest();
  showSpinner: boolean = false;

  contactUs(): void {
    console.log("hiited");
    
    this.showSpinner = true;
    this.service
      .Post<ContactRequest, number>(this.contactRequest, 'contacts')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.showSpinner = false;
            ToastSwal.fireSwal(response.message);
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
          this.showSpinner = false;
        },
      });
  }
}
