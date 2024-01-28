import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlanCategoryRS } from 'src/app/models/Response/PlanCategoryRS';
import { UserRS } from 'src/app/models/Response/UserRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';

@Component({
  selector: 'app-list-plans',
  templateUrl: './list-plans.component.html',
  styleUrls: ['./list-plans.component.scss']
})
export class ListPlansComponent implements OnInit {
  getPlanCategories$: Observable<PlanCategoryRS[]>;
  planCategoryRS: PlanCategoryRS[]= [];
  userRs: UserRS = {};


  constructor(
    private planCategoryService: PlanCategoryService,
    private router: Router
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    this.getPlanCategories$ =this.planCategoryService.getPlanCategoriesByIdPlan(this.userRs.plan?.id!);
   }

  ngOnInit() {
    this.getPlanCategories();
  }

  getPlanCategories(){
    this.getPlanCategories$.subscribe(data => {
      this.planCategoryRS = data;
    })
  }

  viewMovies(plancategory: PlanCategoryRS) {
    this.planCategoryService.setPlanCategory(plancategory);
    this.router.navigate(['./list-movies']);
  }
}
