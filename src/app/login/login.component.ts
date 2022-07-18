import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
import { CommonServiceService } from '../shared/services/common-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly BASE_URL = 'http://localhost:3000';
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  // logIn() {
  //   this.commonService.loginUser(this.loginForm.value).subscribe(data =>({})
  //   // this.httpClient.get<any>("")
  // }
  loginUser() {
    //  return this.httpClient.post(`${this.BASE_URL}/restaurants/signup`,this.signupForm.value)
    this.commonService.loginUser(this.loginForm.value).subscribe((data: IUser[]) => {
      console.log(data);
      if (data.length) {
        alert('You Login Succesfully!!🥰🤩');
        const lsItem = {id: data[0].id, name: data[0].name, email: data[0].email};
        localStorage.setItem('userInfo', JSON.stringify(lsItem));
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      } else {
        alert('User Not Found!!😪');
      }
    });
  }
}
