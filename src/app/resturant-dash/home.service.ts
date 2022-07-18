import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { IRestaurant } from '../models/resturant.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readonly BASE_URL = 'http://localhost:3000';
  private restaurants$ = new Subject<IRestaurant[]>();
  constructor(private httpClient: HttpClient) {}
  //Now here i will define the POST,GET,PUT,DELETE .
  //create Resturant using Post method.
  saveRestaurant(payload: IRestaurant): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/restaurants`, payload);
  }

  getRestaurants() {
    this.httpClient.get<IRestaurant[]>(`${this.BASE_URL}/restaurants`)
    .subscribe((data: IRestaurant[]) => {
      this.setCurrentRestaurants(data);
    });
  }
  updateResturant(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.BASE_URL}/restaurants/${id}`, data);
  }
  deleteResturant(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.BASE_URL}/restaurants/` + id);
  }
  getSearchResult() {
    // const url = `${this.WeatherAPIs.place}?key=${this.KEY}&q=${location}`;
    // return this.http.get<any[]>(url);
  }

  getCurrentRestaurants(): Observable<IRestaurant[]> {
    return this.restaurants$;
  }

  setCurrentRestaurants(restaurants: IRestaurant[]): void {
    this.restaurants$.next(restaurants);
  }

  getRestaurantNames(name: string) {
    // return this.httpClient
    //   .get<IRestaurant[]>(`${this.BASE_URL}/restaurants?name_like=${name}`)
    //   .pipe(map((item: IRestaurant[]) => item.map(rest => rest.name)));
      return this.httpClient
      .get<IRestaurant[]>(`${this.BASE_URL}/restaurants?name_like=${name}`)
      .subscribe((data: IRestaurant[]) => {
        this.setCurrentRestaurants(data);
      });
  }

}
