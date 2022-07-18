import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAllFood():string[]{
    return[
      '/assets/food1.png',
      '/assets/food2.png',
      '/assets/food3.png',
      '/assets/food4.png',
      '/assets/food5.png',
      '/assets/food6.png',
      '/assets/food7.png',
      '/assets/food8.jpg',
      '/assets/food9.jpg',
      '/assets/food10.jpg',
      '/assets/food11.jpg',
      '/assets/food12.jpg',
      '/assets/food13.jpg',
      '/assets/food14.jpg'
    ]
  }
}

