import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICustomMedia } from '../app-starter.component';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class MediaResolver implements Resolve<ICustomMedia[]> {

  constructor(
    private api: ApiService
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomMedia[]> {
    return this.api.getMedias();
  }
}
