import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryRQ } from 'src/app/models/Request/CategoryRQ';
import { CategoryRS } from 'src/app/models/Response/CategoryRS';
import { UserRS } from 'src/app/models/Response/UserRS';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  myForm!: FormGroup;
  categoryRQ: CategoryRQ={};
  userRs: UserRS = {};

  comboOptions: any = [
    {
      name: 'SI',
      value: true,
    },
    {
      name: 'NO',
      value: false,
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryRs: CategoryRS
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nameCategory: ['', Validators.required],
      isSuitableForAdults: ['', Validators.required],
      urlEndpoint: ['', Validators.required],
      userCreate: [this.userRs.email, Validators.required],
      userModified: ['']
    });
    if(this.categoryRs){
      this.myForm.patchValue({
        nameCategory: this.categoryRs.nameCategory,
        isSuitableForAdults: this.categoryRs.isSuitableForAdults,
        urlEndpoint: this.categoryRs.urlEndpoint,
        userModified: this.userRs.email
      });
    }
  }

  submitForm(){
    this.categoryRQ = this.myForm.value;
    this.dialogRef.close(this.categoryRQ);
  }

  closeModal(){
    this.dialogRef.close();
  }

}
