import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { IRestaurant } from '../models/resturant.model';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { CommonServiceService } from '../shared/services/common-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  readonly BASE_URL = 'http://localhost:3000';
  signupForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    });

    (<FormGroup>this?.signupForm.get('email')!)?.valueChanges.subscribe(
      (emailId) => {
        console.log(emailId);
        this.commonService.isEmailExist(emailId).subscribe((res: IUser[]) => {
          if (res.length) {
            this.signupForm.get('email')?.setErrors({ 'invalid-email': true });
          } else {
            this.signupForm.get('email')?.setErrors(null);
          }
        });
      }
    );
  }

  //method to create user
  // signUp(payload: IRestaurant): Observable<any>{
  //   return this.httpClient.post(`${this.BASE_URL}/restaurants/signup`,this.signupForm.value)

  //   }

  signUp() {
    //  return this.httpClient.post(`${this.BASE_URL}/restaurants/signup`,this.signupForm.value)
    this.commonService.signUp(this.signupForm.value).subscribe((data) => {
      console.log(data);
      this.signupForm.reset();
      this.router.navigate(['login']);
    });
    // alert("Registered SuccessFull!.....🤩🤗");
  }

  isValidEmailId(emailId: string) {
    this.commonService.isEmailExist(emailId).subscribe((data) => {
      console.log("Email id exists: ", data);
      console.log("Email id exists1: ", data);
    });
  }
  // err=>{
  //   alert("Something went wrong");
  // })
}
