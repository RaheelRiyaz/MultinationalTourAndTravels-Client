import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { ContactResponse } from '../../../models/contact';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(private service: BaseService) {}
  contacts: ContactResponse[] = [];

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.service.Fetch<ContactResponse>('contacts').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.contacts = response.result;
        }
      },
      error: (err: Error) => {
        ToastSwal.fireSwal(err.message, false);
      },
    });
  }

  deleteContact(id: string): void {
    ToastSwal.fireConfirmSwal().then((res) => {
      if (res.isConfirmed) {
        this.service.Delete<number>(`contacts/${id}`).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.getContacts();
              ToastSwal.fireSwal(response.message);
            } else ToastSwal.fireSwal(response.message, false);
          },
          error: (err: Error) => {
            ToastSwal.fireSwal(err.message, false);
          },
        });
      }
    });
  }
}
