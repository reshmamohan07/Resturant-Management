import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { IMenu } from 'src/app/models/menu.model';
import { IRating, IRatingResponse } from 'src/app/models/rating.model';
import { IUser } from 'src/app/models/user.model';

interface ILoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  // deleteMenu(id: any) {
  //   throw new Error('Method not implemented.');
  // }
  deleteMenu(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.BASE_URL}/menus/` + id);
  }
  // getRestMenus() {
  //   throw new Error('Method not implemented.');
  // }
  getRestMenus(restaurantId: number): Observable<IMenu[]> {
    return this.httpClient.get<IMenu[]>(`${this.BASE_URL}/restaurant/${restaurantId}/menus`);
  }
  readonly BASE_URL = 'http://localhost:3000';
  public addRestaurant$ = new EventEmitter();
  constructor(private httpClient: HttpClient) {}

  signUp(payload: any) {
    return this.httpClient.post(`${this.BASE_URL}/users`, payload);
  }

  loginUser(payload: ILoginPayload): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(
      `${this.BASE_URL}/users?email=${payload.email}&password=${payload.password}`
    );
  }

  isEmailExist(emailId: string): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(
      `${this.BASE_URL}/users?email=${emailId}`
    );
  }

  // getAddRestaurantEmitter() {
  //   return this.addRestaurant$;
  // }

  emitAddRestaurant() {
    this.addRestaurant$.emit();
  }

  addMenu(payload: IMenu, restaurantId: number) {
    return this.httpClient.post(`${this.BASE_URL}/restaurants/${restaurantId}/menus`, payload);
  }

  getMenus(restaurantId: number): Observable<IMenu[]> {
    return this.httpClient.get<IMenu[]>(`${this.BASE_URL}/restaurant/${restaurantId}/menus`);
  }

  addRating(menuId: number, payload: IRating): Observable<IRatingResponse> {
    return this.httpClient.post<IRatingResponse>(`${this.BASE_URL}/menus/${menuId}/rating`, payload);
  }

  findRating(menuId: number, userId: number): Observable<IRatingResponse | null> {
    return this.httpClient.
      get<IRatingResponse[]>(`${this.BASE_URL}/rating?menuId=${menuId}&userId=${userId}`)
      .pipe(map(data => data.length ? data[0] : null));
  }

  updateRating(ratingId: number, payload: IRatingResponse): Observable<IRatingResponse> {
    return this.httpClient.put<IRatingResponse>(`${this.BASE_URL}/rating/${ratingId}`, payload);
  }
  updateMenu(payload: IMenu, menuId: number): Observable<IMenu> {
    return this.httpClient.put<IMenu>(`${this.BASE_URL}/menus/${menuId}`, payload);
  }
}
