import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlanRQ } from 'src/app/models/Request/PlanRQ';
import { CategoryRS } from 'src/app/models/Response/CategoryRS';
import { PlanCategoryRS } from 'src/app/models/Response/PlanCategoryRS';
import { PlanRS } from 'src/app/models/Response/PlanRS';
import { UserRS } from 'src/app/models/Response/UserRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss']
})
export class CreatePlanComponent implements OnInit {
  myForm!: FormGroup;
  planRQ: PlanRQ={};
  userRs: UserRS = {};
  categoriesRs: CategoryRS[] = [];
  getCateogories$: Observable<CategoryRS[]>;
  idCategoriesAdd: number[]=[];
  categoriesByPlan: PlanCategoryRS[] = [];
  getCateogoriesByPlan$: Observable<PlanCategoryRS[]>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePlanComponent>,
    private planCategoryService: PlanCategoryService,
    @Inject(MAT_DIALOG_DATA) public planRs: PlanRS
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    this.getCateogories$ = this.planCategoryService.getCategories();
    this.getCateogoriesByPlan$ = new Observable();
  }

  ngOnInit() {

    this.getCategories();
    this.myForm = this.formBuilder.group({
      namePlan: ['', Validators.required],
      numberMaxProfile: ['', Validators.required],
      description: ['', Validators.required],
      userCreate: [this.userRs.email, Validators.required],
      userModified: ['']
    });
    if(this.planRs){
      this.myForm.patchValue({
        namePlan: this.planRs.namePlan,
        numberMaxProfile: this.planRs.numberMaxProfile,
        description: this.planRs.description,
        userModified: this.userRs.email
      });
      this.getCateogoriesByPlan$ = this.planCategoryService.getPlanCategoriesByIdPlan(this.planRs.id!);
      this.getCateogoriesByPlan$.subscribe(data => {
        data.forEach(element => {
          this.idCategoriesAdd.push(element.category?.id!);
        })
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          if (checkbox instanceof HTMLInputElement) {
            if (this.idCategoriesAdd.includes(parseInt(checkbox.value, 10))) {
              checkbox.checked = true;
            }
          }
        });
      })
    }
  }

  getCategories(){
    this.getCateogories$.subscribe(data => {
      this.categoriesRs = data;
    })
  }

  obtenerCheckboxesSeleccionados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    // Filtrar los checkboxes seleccionados
    const checkboxesSeleccionados = Array.from(checkboxes)
      .filter((element) => (element instanceof HTMLInputElement) && element.checked)
      .map((checkbox) => (parseInt((checkbox as HTMLInputElement).value, 10)));
      const checkboxesOrdenados = checkboxesSeleccionados.sort((a, b) => a - b)
    return checkboxesOrdenados;
  }

  submitForm(){
    const checkboxesSeleccionados = this.obtenerCheckboxesSeleccionados();
    if(checkboxesSeleccionados.length === 0){
      alert('Debe seleccionar al menos una categoria');
      return;
    }
    this.planRQ = this.myForm.value;
    if(this.planRs){
      this.planRQ.id = this.planRs.id;
    }
    this.planRQ.categories = checkboxesSeleccionados;
    this.dialogRef.close(this.planRQ);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
