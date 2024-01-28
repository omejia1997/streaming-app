import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlanRS } from 'src/app/models/Response/PlanRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';
import { CreatePlanComponent } from '../create-plan/create-plan.component';

@Component({
  selector: 'app-list-plan',
  templateUrl: './list-plan.component.html',
  styleUrls: ['./list-plan.component.scss']
})
export class ListPlanComponent implements OnInit {
  getPlan$: Observable<PlanRS[]>;
  plans: PlanRS[] = [];

  constructor(
    private planCategoryService: PlanCategoryService,
    private dialog: MatDialog
  ) {
    this.getPlan$ = this.planCategoryService.getPlans();
  }

  ngOnInit() {
   this.getPlans();
  }

  getPlans(){
    this.getPlan$.subscribe(data => {
      this.plans = data;
    })
  }

  createPlan(){
    const dialogRef = this.dialog.open(CreatePlanComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if(formValue){
        this.planCategoryService.createPlan(formValue).subscribe({
          next: (data) => {
            confirm('Plan registrado');
            this.getPlans();
          },
          error: (err) => {
            console.log(err);
            alert(err.error);
          },
          complete: () => {
          },
        })
      }
    });
  }
  editPlan(planRS: PlanRS){
    const dialogRef = this.dialog.open(CreatePlanComponent, {
      width: '450px',
      data: planRS
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if(formValue){
        console.log(formValue);
        this.planCategoryService.updatePlan(formValue).subscribe({
          next: (data) => {
            confirm('Plan modificado');
            this.getPlans();
          },
          error: (err) => {
            console.log(err);
            alert("Error al modificar el plan " +err.error);
          },
          complete: () => {
          },
        })
      }
    });
  }

}
