import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterUserRQ } from 'src/app/models/Request/RegisterUserRQ';
import { PlanRS } from 'src/app/models/Response/PlanRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  registerUserRQ: RegisterUserRQ = {};
  getPlans$: Observable<PlanRS[]>;
  plans: PlanRS[]= [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private planCategoryService: PlanCategoryService
  ) {
    this.getPlans$ = this.planCategoryService.getPlans();
  }

  ngOnInit(): void {
    this.getPlans();
    this.myForm = this.fb.group({
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      photoUrl: ['',],
      idPlan: ['', Validators.required],
    });
  }

  getPlans() {
    this.getPlans$.subscribe(data =>{
      this.plans = data;
    });
  }

  registerUser() {
    this.registerUserRQ = this.myForm.value;
    this.userService.registerUser(this.registerUserRQ).subscribe({
      next: (data) => {
        confirm('Usuario registrado');
        this.router.navigate(['./login']);
      },
      error: (err) => {
        alert('Error al registrar el usuario');
      },
      complete: () => {
      },
    });
  }
}
