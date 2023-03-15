import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBrand, ICustomMedia, IPayload } from '../app-starter.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**NOTE - requete http de recuperation des donnees de brand */
  getBrands(){
    return this.http.get<IBrand[]>('/assets/brands.json')
  }

  /**NOTE - requete http de recuperation des donnees de playload */
  getPayloads(){
    return this.http.get<IPayload>('/assets/payload-rmp.json')
  }

  /**NOTE - requete http de recuperation des donnees de media */
  getMedias(){
    return this.http.get<ICustomMedia[]>('/assets/media.json')
  }
}
