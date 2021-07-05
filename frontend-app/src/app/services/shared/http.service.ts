import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly API_URL = 'https://splautz.com/backend/';

  constructor(private http: HttpClient) { }

  get(resource: string) {
    return this.http.get(this.API_URL + resource)
  }
  
  post(resource: string, data: JSON) {
    return this.http.post(this.API_URL + resource, data)
  }

}
