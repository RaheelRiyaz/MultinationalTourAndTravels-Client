export class BookingRequest {
  packageId!: string;
  name!: string;
  email!: string;
  contact!: string;
  noOfAdults!: number;
  noOfChildrens!: number;
  travelDate!: Date;
}

export class BookingResponse extends BookingRequest {
  id!: string;
  isVerified!: boolean;
}

export class BookingWithPackageName {
  bookingId!: string;
  customer!: string;
  contact!: string;
  email!: string;
  package!: string;
  noOfAdults!: number;
  noOfChildrens!: number;
  isVerified!: boolean;
  travelDate!: Date;
}
