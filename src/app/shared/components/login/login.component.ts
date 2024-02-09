import { Component } from '@angular/core';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../../models/account';
import { ToastSwal } from '../../../utilis/swal';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private service: BaseService, private router: Router) {}
  loginRequest: LoginRequest = new LoginRequest();
  login(): void {
    this.service
      .Post<LoginRequest, LoginResponse>(this.loginRequest, 'users/login')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            console.log(response);
            if (response.result) {
              localStorage.setItem(
                environment.TOKEN_Name,
                response.result.token
              );
              this.router.navigate(['/admin']);
            }
          } else ToastSwal.fireSwal(response.message, false);
        },
        error: (err: Error) => {
          ToastSwal.fireSwal(err.message, false);
        },
      });
  }
}
