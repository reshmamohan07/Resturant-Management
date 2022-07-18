import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FoodService } from '../shared/services/food.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from '../shared/services/common-service.service';
import { IMenu } from '../models/menu.model';
import { IUser } from '../models/user.model';
import { Observable, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  foods: string[] = [];
  menuValue!: FormGroup;
  restaurantId!: number | null;

  menuControl = new FormControl();
  openedModal: any;
  restMenus!: IMenu[];
  favorite: boolean = false;
  userInfo!: IUser;
  editmenus$!: Observable<IMenu[]>;

  @ViewChild('addMenuTemplate') addMenuTemplate!: any;
  @ViewChild('deleteModal') deleteModalMenu!: any;
  deleteModal: any;
  deleteMenuId: number | undefined;
  editMenuId: number | undefined;
  mtype: any;
  result: any;
  showEdit: boolean | undefined;
  editRestaurantId: number | undefined;
  formValue: any;
  httpClient: any;
  BASE_URL: any;

  // readonly controlValue = 'HELLO WORLD';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fs: FoodService,
    private modalService: NgbModal,
    private commonService: CommonServiceService,
    private _snackBar: MatSnackBar
  ) {}
  currentRate: number = 3;

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
    this.foods = this.fs.getAllFood();
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params) {
        const id = params?.get('id');
        this.restaurantId = id ? +id : null;
      }
    });

    this.menuValue = this.formBuilder.group({
      menu: ['', [Validators.required]],
      menutype: ['', [Validators.required]],
      menuPrice: ['', [Validators.required]],
      menuImageUrl: ['', [Validators.required]],
      description: [''],
    });

    this.getRestMenus();
  }

  ngAfterViewInit(): void {}
  addMenu() {
    this.commonService
      .addMenu(this.menuValue.value, <number>this.restaurantId)
      .subscribe((data) => {
        this.openedModal.close();
        console.log(data);
        this.getRestMenus();
        this.menuValue.reset();
      });
  }

  triggerAddMenu() {
    this.showEdit = false;
    this.openedModal = this.modalService.open(this.addMenuTemplate, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  getRestMenus() {
    this.commonService
      .getMenus(this.restaurantId as number)
      .subscribe((data: IMenu[]) => {
        this.restMenus = data;
      });
  }

  changeRating(value: number, menuId: number | undefined) {
    if (!menuId || !value) {
      return;
    }
    this.commonService
      .findRating(menuId, this.userInfo.id as number)
      .pipe(
        switchMap((data) => {
          if (data) {
            return this.commonService.updateRating(data.id, {
              ...data,
              star: value,
            });
          } else {
            const payload = {
              star: value,
              userId: this.userInfo.id as number,
              menuId,
              restaurantId: this.restaurantId as number,
            };
            return this.commonService.addRating(menuId, payload);
          }
        })
      )
      .subscribe((data) => {
        // console.log(data);
        // this.showSuccess();
        this.getRestMenus();
        this._snackBar.open('Rating Added!', undefined, { duration: 1000 });
      });
  }

  editMenu(menuId: number | undefined) {
    this.openedModal = this.modalService.open(this.addMenuTemplate, {
      // ariaLabelledBy: 'modal-basic-title',

    });
    this.showEdit = true;

    const data = this.restMenus.find(item => item.id === menuId);
    if (data) {
      this.editMenuId = menuId;
      this.menuValue.get('menu')?.setValue(data.menu);
      this.menuValue.get('menutype')?.setValue(data.menutype);
      this.menuValue.get('menuPrice')?.setValue(data.menuPrice);
      this.menuValue.get('menuImageUrl')?.setValue(data.menuImageUrl);
      this.menuValue.get('description')?.setValue(data.description);

    }

    this.getRestMenus();
  }
  deleteMenu(menuId: any) {
    this.deleteModal = this.modalService.open(this.deleteModalMenu, {});
    this.deleteMenuId = menuId;
  }

  confirmDelete() {
    this.commonService.deleteMenu(this.deleteMenuId as number).subscribe(() => {
      // return this.commonService.getRestMenus(this.restaurantId);
      this.deleteModal.close();
    });
  }

  cancelDelete() {
    this.deleteModal.close();
  }

  // updateMenu(updateId: any | undefined): Observable<any> {
  //   return this.httpClient.put<any>(`${this.BASE_URL}/menus/${id}`, data);
  // }
  // updateMenu(){
  //   return this.
  // }

  closeModal(){
    this.editMenuId = undefined;
    this.openedModal.close();
  }

  updateMenu() {
    const payload = {
      ...this.menuValue.value,
      restaurantId: this.restaurantId,
      id: this.editMenuId
    };

    this.commonService.updateMenu(payload, this.editMenuId as number).subscribe(data => {
      this.openedModal.close();
      this.getRestMenus();
    });
  }
}
function data<T>(arg0: string, data: any): Observable<any> {
  throw new Error('Function not implemented.');
}

