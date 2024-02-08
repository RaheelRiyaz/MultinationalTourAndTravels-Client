export class InclusionRequest {
  packageId!: string;
  description!: string;
}

export class Exclusionrequest extends InclusionRequest {}
export class InclusionResponse extends InclusionRequest {
  id!: string;
}
