import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/apiresponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient) {}

  // Common Function for posting to database
  Post<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.post<ApiResponse<ResT>>(
      environment.API_URL + url,
      model
    );
  }

  // Common Function for retrieving data from database
  Fetch<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.API_URL + url);
  }
  // Common Function for delete data from database
  Delete<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.delete<ApiResponse<ResT>>(environment.API_URL + url);
  }

  // Common Function for updating data into database
  Update<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.put<ApiResponse<ResT>>(
      environment.API_URL + url,
      model
    );
  }

  // Common Function for retrieving specific item from database
  Find<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.API_URL + url);
  }
}
