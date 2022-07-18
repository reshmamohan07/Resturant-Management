import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
import { IRestaurant } from '../models/resturant.model';
import { HomeService } from './home.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, map, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { CommonServiceService } from '../shared/services/common-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  formValue!: FormGroup;
  showAdd!: boolean;
  showbtn!: boolean;
  restaurants$!: Observable<IRestaurant[]>;
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  editRestaurantId!: number;
  loading!: boolean;

  @ViewChild('restModal') restaurantModal: any;
  openedModal: any;
  constructor(
    // private activeModal : NgbActiveModal,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private modalService: NgbModal,
    private commonService: CommonServiceService
  ) {}

  ngOnInit(): void {

    this.myControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      //map(value => value ? this.homeService.getRestaurantNames(value) : of([]))
      // this.=this.homeService.getSearchResult();
      // this.(value => value ? this.homeService.getSearchResult(value) : of([])),
      // return this.http.get('url').get<any[]>(url);
    ).subscribe(val => {
      this.loading = true;
      setTimeout(() => this.homeService.getRestaurantNames(val), 100);
    });


    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    });

    this.homeService.getRestaurants();

    this.restaurants$ = this.homeService.getCurrentRestaurants().pipe(
      tap(() => this.loading = false)
    );

    this.commonService.addRestaurant$.subscribe(() => {
        this.clickAddResturant();
    })


  }

  //Now subscribing our data which is mapped via services......

  addRestaurant() {
    console.log(this.formValue.value);

    this.homeService.saveRestaurant(this.formValue.value).subscribe(
      () => {
        this.homeService.getRestaurants();
        alert('Resturant Records Added Successfully.....😎😊❤');

        this.formValue.reset();
        this.openedModal.close();

        // this.restaurants$;
      },
      (err) => {
        alert('Somethimg Went Wrong.....');
      }
    );
  }
  deleteResturant(data: any) {
    this.homeService.deleteResturant(data.id).subscribe(() => {
      this.homeService.getRestaurants();
    });
  }

  clickAddResturant() {
    this.modalService.open(this.restaurantModal, {});
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  editResturant(data: IRestaurant, restModal: any) {
    this.modalService.open(restModal, {});
    this.showAdd = false;
    this.showbtn = true;
    // this.restaurants$.id=data.id;
    this.editRestaurantId = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }
// search for resturant
getResturant(){

}



  updateResturant1() {
    // console.log(this.formValue.value);
    // this.restaurants$.name = this.formValue.value.name;
    // this.restaurants$.email = this.formValue.value.email;
    // this.restaurants$.mobile = this.formValue.value.mobile;
    // this.restaurants$.address = this.formValue.value.address;
    // this.restaurants$.services = this.formValue.value.services;
    this.homeService
      .updateResturant(this.formValue.value, this.editRestaurantId)
      .subscribe(() => {
        this.homeService.getRestaurants();
        alert('Resturant Records Updated.....😉✌');
        // let ref = document.getElementById('clear');
        // ref?.click();

        this.formValue.reset();
        // this.addRestaurant();
      });
  }

  // closeModal() {
  //   // this.restaurantModal.close();
  //   this.restaurantModal.close();
  // }
}
function value(value: any): any {
  throw new Error('Function not implemented.');
}

