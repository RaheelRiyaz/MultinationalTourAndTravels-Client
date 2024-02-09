import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isUserAuthenticated(): boolean {
    const token = localStorage.getItem(environment.TOKEN_Name);
    return token ? true : false;
  }

  static token(): string {
    const token = localStorage.getItem(environment.TOKEN_Name);
    return token ? token : '';
  }
}
