import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import Swal from 'sweetalert2';


export interface IBrand {
  brandId: number,
  name: string
}

export interface IMedia {
  mediaId: number,
  name: string,
  value: string
}

export interface ICustomMedia {
  mediaId: number,
  name: string,
  value: string,
  order: number,
}

export interface ICountrie {
  countryId: number,
  name: string,
  value: string
}

  /**NOTE - interface de la requete de campagne */
export interface IRequest {
  requestId: number,
  advice: boolean,
  campaignName: string,
  campaignDescription: string,
  decisionDeadline: string,
  decisionDescription: string,
  key: string,
  numberOfAssets: number,
  createdDate: string,
  updatedDate: string,
  submittedDate: null,
  validatedDate: null,
  affiliate: {
      affiliateId: number,
      name: string
  },
  brand: IBrand,
  requestStatus: {
      requestStatusId: number,
      name: string,
      value: string,
      step: number
  },
  createdBy: {
      userInfoId: number,
      name: string,
      email: string
  },
  updatedBy: {
      userInfoId: number,
      name: string,
      email: string
  },
  submittedBy: string|null,
  validatedBy: string|null,
  countries: Array<ICountrie>,
  media: Array<IMedia>
}

export interface IPayload {
  totalVolume: number,
  requests: Array<IRequest>
}

export interface IFilter {
  brandId: number,
  search: string,
}

export class Payload implements IPayload {
  requests: Array<IRequest> = []

  public get totalVolume() : number {
    return this.requests.length
  }
  
}

@Component({
  selector: 'app-app-starter',
  templateUrl: './app-starter.component.html',
  styleUrls: ['./app-starter.component.css']
})
export class AppStarterComponent implements OnInit {
  requestsSrc: Payload = <Payload>{
    totalVolume: 0,
    requests: []
  };

  requests: Payload = <Payload>{
    totalVolume: 0,
    requests: []
  };

  brands: Array<IBrand> = [];

  filter: IFilter = {brandId:-1, search:""};

  initLenght: number = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.initialze()
    //console.log(this.requests, this.requestsSrc)
  }

  ngOnInit(){

  }

  /**NOTE - function d'initialisation des donnees */
  private initialze(){
    this.brands = <Array<IBrand>>this.route.snapshot.data['brands']
    this.requests = <Payload>this.route.snapshot.data['requests']
    this.requestsSrc = <Payload>this.route.snapshot.data['requests']

    this.initLenght = this.requests.totalVolume

    this.filter = {
      brandId:-1,
      search: ""
    }

    //console.log('brands::init', this.brands)
    //console.log('requests::init', this.requests)
  }

  onClick(e: Event){
    const search = this.filter.search.trim();
    const brandId = <number>this.filter.brandId;
    Swal.showLoading();
    if(brandId === -1 && search.length === 0){
      (this.requests.totalVolume !== this.initLenght) && (this.requests = _.clone(this.requestsSrc))
      Swal.close()
      //console.log('E::1')
    }else{
      this.requests = _.clone(this.requestsSrc);
      (this.requests.requests = this.searchFilter(search))
      && (this.requests.requests = this.brandFilter(brandId))
      && (Swal.close())
      //console.log('E::2')
    }
    //console.log('E::3', this.filter, <IFilter>this.filter, search, brandId)
  }

  /**NOTE - function de redirection vers la page de modification */
  onClickEdit(e: Event, id:number){
    //console.log(e, id)
    this.router.navigate([`edit/${id}`])
  }

  /**NOTE - function de filtre des requetes sur le nom de la campagne */
  searchFilter(search:string):Array<IRequest> {
    if(search){
      return <Array<IRequest>>_.filter(this.requests.requests, (v:IRequest) => {
        //console.log('indexOf::log', _.indexOf(v.campaignName, search), v.campaignName, search)
        return v.campaignName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
    }else{
      return this.requests.requests;
    }
  }

  /**NOTE - function de filtre des requetes sur le brand */
  brandFilter(id:number):Array<IRequest> {
    if(id > -1 ){
      return <Array<IRequest>>_.filter(this.requests.requests, (v:IRequest) => {
        return v.brand.brandId == id;
      });
    }else{
      return this.requests.requests;
    }
  }
}
