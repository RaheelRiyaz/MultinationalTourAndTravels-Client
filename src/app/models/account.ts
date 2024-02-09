export class ChangePasswordRequest {
  oldPassword!: string;
  newPassword!: string;
}

export class LoginRequest {
  email!: string;
  password!: string;
}

export class LoginResponse {
  token!: string;
}
