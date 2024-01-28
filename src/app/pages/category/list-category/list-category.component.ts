import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryRS } from 'src/app/models/Response/CategoryRS';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { PlanCategoryService } from 'src/app/services/plan-category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories: CategoryRS[]=[];
  getCategories$: Observable<CategoryRS[]>;

  constructor(
    private dialog: MatDialog,
    private planCategoryService: PlanCategoryService,
  ) {
    this.getCategories$ = this.planCategoryService.getCategories();
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.getCategories$.subscribe(data => {
      this.categories = data;
    })
  }


  createCategory(){
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if(formValue){
        this.planCategoryService.createCategory(formValue).subscribe({
          next: (data) => {
            confirm('Categoria registrada');
            this.getCategories();
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

  edit(category: CategoryRS){
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '450px',
      data: category
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if(formValue){;
        this.planCategoryService.updateCategory(formValue).subscribe({
          next: (data) => {
            confirm('Categoria modificada');
            this.getCategories();
          },
          error: (err) => {
            console.log(err);
            alert(err.error);
          },
          complete: () => {
          },
        })
        this.getCategories();
      }
    });

  }

}
