import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { UserDataService } from '../shared/dataService/user-data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  // Firebase Auth Elements
  email: string = ' ';
  password: string = ' ';
  newUser: User;

  constructor(
    private auth: AuthService,
    private dataService: UserDataService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      billingSystem: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    console.log(this.signupForm);

    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid) {
      alert('Please Submit Valid Data');
    }

    this.newUser = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      name: this.signupForm.get('fullName').value,
      phoneNumber: this.signupForm.get('phone').value,
      paymentType: this.signupForm.get('billingSystem').value,
    };
    console.log(this.newUser);
    this.dataService.addUser(this.newUser);
    this.auth.register(
      this.signupForm.get('email')?.value,
      this.signupForm.get('password')?.value
    );
  }
  // Firebase Functions
  register() {
    console.log('clicked');
    this.auth.register(this.email, this.password);
  }
}
