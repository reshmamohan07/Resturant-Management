import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonServiceService } from './shared/services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ResturantProject';
  requireAddRestaurant = false;

  constructor(private router: Router, private commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.requireAddRestaurant = event.url.includes('dashboard');
      }
    });
  }

  addResturant() {
    this.commonService.emitAddRestaurant();
  }
}
