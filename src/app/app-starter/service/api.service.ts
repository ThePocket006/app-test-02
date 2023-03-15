import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBrand, ICustomMedia, IPayload } from '../app-starter.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBrands(){
    return this.http.get<IBrand[]>('/assets/brands.json')
  }

  getPayloads(){
    return this.http.get<IPayload>('/assets/payload-rmp.json')
  }

  getMedias(){
    return this.http.get<ICustomMedia[]>('/assets/media.json')
  }
}
