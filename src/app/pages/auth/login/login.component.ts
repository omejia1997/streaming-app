import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRQ } from 'src/app/models/Request/LoginRQ';
import { UserService } from 'src/app/services/user.service';

  @Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
  viewPassword: boolean = true;
  changetypePassword: boolean = true;
  flag: boolean = true;
  loginRQ: LoginRQ = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }

  onInput() {
    if(!this.flag)  this.flag = true
  }

  consult() {
    this.loginRQ = this.myForm.value;
    this.userService.login(this.loginRQ).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['./list-profiles-user']);
      },
      error: (err) => {
        this.flag = false;
      },
      complete: () => {
      },
    });
  }

  viewPasswordInput() {
    this.viewPassword = !this.viewPassword;
    this.changetypePassword = !this.changetypePassword;
  }
}
