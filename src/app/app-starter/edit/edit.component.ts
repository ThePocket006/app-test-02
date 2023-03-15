import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Placement, PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { IBrand, ICustomMedia, IMedia, IRequest, Payload } from '../app-starter.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [NgbInputDatepickerConfig],
})
export class EditComponent implements OnInit {
  private Toast
  form: FormGroup
  brands: IBrand[]
  request: IRequest
  medias: ICustomMedia[]
  ddDate: string
  // ddDate: NgbDateStruct

  preSelectedMedias: Array<any> = []
  selectedMedias: Array<any> = []
  constructor(
    private route: ActivatedRoute,
    config: NgbInputDatepickerConfig,
    fb: FormBuilder
  ) {
    this.brands = <Array<IBrand>>this.route.snapshot.data['brands']
    this.medias = <Array<ICustomMedia>>this.route.snapshot.data['medias']
    this.request = <IRequest>_.find((<Payload>this.route.snapshot.data['requests']).requests, (v:IRequest) => {
      return v.requestId === 1;
    });

    // const date = new Date();
    this.ddDate = dayjs().format('YYYY-MM-DD')
    // this.ddDate = {
    //   year: date.getFullYear(),
    //   month: date.getMonth(),
    //   day: date.getDay(),
    // };

    // customize default values of datepickers used by this component tree
		config.minDate = { year: 1900, month: 1, day: 1 };
		config.maxDate = { year: 2099, month: 12, day: 31 };

		// days that don't belong to current month are not visible
		config.outsideDays = 'hidden';

		// weekends are disabled
		// config.markDisabled = ((date: NgbDate) => calendar.getWeekday(date) >= 6);

		// setting datepicker popup to close only on click outside
		config.autoClose = 'outside';

		// setting datepicker popup to open above the input
		config.placement = <PlacementArray>[<Placement>'top-start', <Placement>'top-end'];

    const test:FormControl[] = _.reduce(this.request.media, (data:Array<any>, v:IMedia)=>{
      if(! _.isEmpty(v) ){
        this.preSelectedMedias.push(v.mediaId)
        const t = new FormControl(v.mediaId.toString());
        //console.log('COMSO::', t)
        data.push(t);
      }

      return data;
    }, []);

    this.form = fb.group({
      selectedMedias:  new FormArray(test),
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
    // const date = new Date(dayjs(this.request.decisionDeadline).format('YYYY-MM-DD'));
    this.ddDate = dayjs(this.request.decisionDeadline).format('YYYY-MM-DD')
    // this.ddDate = {
    //   year: date.getFullYear(),
    //   month: date.getMonth(),
    //   day: date.getDay(),
    // };
  }

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

  isPreSelectedMedias(e:IMedia|number){
    const id = _.isNumber(e) ? e : e.mediaId
    return this.preSelectedMedias.indexOf(id) !== -1
  }
}
