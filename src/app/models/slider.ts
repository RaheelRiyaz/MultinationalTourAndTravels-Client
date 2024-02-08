export class SliderResponse {
  filePath!: string;
  description!: string;
  slideStatus!: string;
  id!: string;
}

export class UpdateSlideStatusRequest {
  constructor(private id: string, private status: number) {}
}
