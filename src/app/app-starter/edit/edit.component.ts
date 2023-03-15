import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { IBrand, ICustomMedia, IMedia, IRequest, Payload } from '../app-starter.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  private Toast
  form: FormGroup
  brands: IBrand[]
  request: IRequest
  medias: ICustomMedia[]
  ddDate: string

  preSelectedMedias: Array<any> = []
  selectedMedias: Array<any> = []
  constructor(
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {

    /**
     * NOTE - recuperation des donnees retourne par les resolvers
     * Ne s'execute qu'apres avoir recupere les donnees via api ou autre traitement
     */
    this.brands = <Array<IBrand>>this.route.snapshot.data['brands']
    this.medias = <Array<ICustomMedia>>this.route.snapshot.data['medias']
    this.request = <IRequest>_.find((<Payload>this.route.snapshot.data['requests']).requests, (v:IRequest) => {
      return v.requestId === 1;
    });

    this.ddDate = dayjs().format('YYYY-MM-DD')

    const formMediaControl:FormControl[] = _.reduce(this.request.media, (data:Array<any>, v:IMedia)=>{
      if(! _.isEmpty(v) ){
        this.preSelectedMedias.push(v.mediaId)
        const t = new FormControl(v.mediaId.toString());
        data.push(t);
      }

      return data;
    }, []);

    /**NOTE - FormGroup pour le control du formulaire */
    this.form = fb.group({
      selectedMedias:  new FormArray(formMediaControl),
      brands: new FormControl(),
      campaignName: new FormControl(),
      ddDate: new FormControl(),
    });

    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  ngOnInit(){
    this.ddDate = dayjs(this.request.decisionDeadline).format('YYYY-MM-DD')
  }

  /**NOTE - function de mise a jour du liste des medias selectionnes */
  onCheckboxChange(event: any) {
    const selectedMedias = (this.form.controls['selectedMedias'] as FormArray);
    if (event.target.checked) {
      selectedMedias.push(new FormControl(event.target.value));
    } else {
      const index = selectedMedias.controls
      .findIndex(x => x.value === event.target.value);
      selectedMedias.removeAt(index);
    }
  }

  onClick(){
    
    let timerInterval:any;
    Swal.fire({
      title: 'Simulation of a sending!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b:any = Swal.getHtmlContainer()?.querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      // if (result.dismiss === Swal.DismissReason.timer) {
      //   //console.log('I was closed by the timer')
      // }
      this.Toast.fire({
        icon: 'success',
        title: 'Envoie reusie.'
      })
    })
  }

  /**NOTE - function de verification de la presence du media dans la requete */
  isPreSelectedMedias(e:IMedia|number){
    const id = _.isNumber(e) ? e : e.mediaId
    return this.preSelectedMedias.indexOf(id) !== -1
  }
}
