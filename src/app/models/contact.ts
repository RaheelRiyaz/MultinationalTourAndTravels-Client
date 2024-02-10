export class ContactRequest {
  email!: string;
  subject!: string;
  message!: string;
}

export class ContactResponse extends ContactRequest {
  id!: string;
  createdOn!: Date;
  updatedOn!: Date;
}
