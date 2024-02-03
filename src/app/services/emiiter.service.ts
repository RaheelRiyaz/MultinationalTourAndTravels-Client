import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  constructor(private http:HttpClient) { }

  static hotelEmitter:EventEmitter<any> = new EventEmitter<any>();
  static packageEmitter:EventEmitter<any> = new EventEmitter<any>();
  static galleryEmitter:EventEmitter<any> = new EventEmitter<any>();
}
