import { BaseClass } from './chatbot';

export class DisplayingPackageResponse {
  packageResponse!: PackageResult;
  destinations!: DestinationResponse[];
  files!: FileResponse[];
}

export class PackageResult {
  id!: string;
  name!: string;
  description!: string;
  startingPrice!: number;
  longitude!: number;
  latitude!: number;
  days!: number;
  nights!: number;
}

export class DestinationResponse {
  name!: string;
  id!: string;
}

export class FileResponse {
  id!: string;
  filePath!: string;
}

export class Package extends PackageResult {
  isActive!: boolean;
  createdOn!: Date;
  updatedOn!: Date;
}

export class CompactPackage {
  package!: PackageResult;
  inclusions!: InclusionResponse[];
  exclusions!: ExclusionsResponse[];
  itineraries!: ItineraryResponse[];
  files: FileResponse[] = [];
  destinationsWithHotels: DestinationWithHotelResponse[] = [];
}

export class InclusionResponse extends BaseClass {
  packageId!: string;
  description!: string;
}

export class ExclusionsResponse extends InclusionResponse {}

export class ItineraryResponse extends BaseClass {
  fileId!: string;
  filePath!: string;
  title!: string;
  description!: string;
  day!: number;
}

export class DestinationWithHotelResponse {
  name!: string;
  stay!: string;
  standardHotels!: HotelResponse[];
  deluxeHotels!: HotelResponse[];
  superDeluxeHotels!: HotelResponse[];
  files!: FileResponse[];
}

export class HotelResponse {
  destinationId!: string;
  hotelId!: string;
  name!: string;
  description!: string;
  address!: string;
}

export class PackageCostingResponse {
  package!: string;
  packageCostings!: CostingResponse[];
}

export class CostingResponse {
  id!: string;
  packageId!: string;
  packageCosting!: string;
  rate!: number;
}

export class UpdatePackageRequest {
  id!: string;
  name!: string;
  description!: string;
  startingPrice!: number;
  longitude!: number;
  latitude!: number;
  days!: number;
  nights!: number;
}

export class PackageResponse extends UpdatePackageRequest{

}