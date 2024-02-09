export class DestinationRequest {
  packageId!: string;
  name!: string;
  stay!: string;
}

export class PackageDestination {
  id!: string;
  createdOn!: Date;
  updatedOn!: Date;
  packageId!: string;
  name!: string;
  stay!: string;
}

export class DestinationDetailsRequest {
  destinationId!: string;
  packageType: number = 0;
  hotelId: string = '';
}
