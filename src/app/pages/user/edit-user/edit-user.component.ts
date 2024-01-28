import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRQ } from 'src/app/models/Request/UserRQ';
import { PlanRS } from 'src/app/models/Response/PlanRS';
import { UserRS } from 'src/app/models/Response/UserRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  myForm!: FormGroup;
  userRQ: UserRQ = {};
  getPlans$: Observable<PlanRS[]>;
  plans: PlanRS[]= [];
  userRs: UserRS = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private planCategoryService: PlanCategoryService
  ) {
    this.getPlans$ = this.planCategoryService.getPlans();
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
  }

  ngOnInit() {
    this.getPlans();
    this.myForm = this.fb.group({
      id: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      photoUrl: ['',],
      idPlan: ['', Validators.required],
    });

    this.myForm.patchValue({
      id: this.userRs.id,
      birthdate: new Date(this.userRs.birthdate!).toISOString().split('T')[0],
      email: this.userRs.email,
      photoUrl: this.userRs.photoUrl,
      idPlan: this.userRs.plan?.id
    });
  }

  getPlans() {
    this.getPlans$.subscribe(data =>{
      this.plans = data;
    });
  }

  updateUser() {
    this.userRQ = this.myForm.value;
    this.userService.updateUser(this.userRQ).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        confirm('Campos actualizados');
      },
      error: (err) => {
        alert('Error al modificar el usuario');
      },
      complete: () => {
      },
    });
  }

}
