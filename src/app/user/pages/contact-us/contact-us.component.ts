import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { ContactRequest } from '../../../models/contact';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
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
