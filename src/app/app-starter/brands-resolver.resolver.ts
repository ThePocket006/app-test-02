import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import axios from 'axios';
import { Observable, of } from 'rxjs';
import { IBrand } from './app-starter.component';
import { ApiService } from './service/api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsResolverResolver implements Resolve<IBrand[]> {

  constructor(
    private api: ApiService
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBrand[]> {
    return this.api.getBrands();
  }
}
