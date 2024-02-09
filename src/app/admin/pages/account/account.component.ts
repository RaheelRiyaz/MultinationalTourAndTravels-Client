import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { ChangePasswordRequest } from '../../../models/account';
import { ToastSwal } from '../../../utilis/swal';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  constructor(private service: BaseService) {}

  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  changePassword(): void {
    this.service
      .Update<ChangePasswordRequest, number>(
        this.changePasswordRequest,
        'users/change-password'
      )
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            ToastSwal.fireSwal(response.message);
          }
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
