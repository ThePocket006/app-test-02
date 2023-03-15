import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPayload, IRequest } from './app-starter.component';
import { ApiService } from './service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PayloadResolverResolver implements Resolve<IPayload> {

  constructor(
    private api: ApiService
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPayload> {
    return this.api.getPayloads();
  }
}
