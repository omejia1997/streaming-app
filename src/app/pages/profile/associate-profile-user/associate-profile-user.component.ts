import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileRQ } from 'src/app/models/Request/ProfileRQ';
import { UserRS } from 'src/app/models/Response/UserRS';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-associate-profile-user',
  templateUrl: './associate-profile-user.component.html',
  styleUrls: ['./associate-profile-user.component.scss']
})
export class AssociateProfileUserComponent implements OnInit {
  myForm!: FormGroup;
  userRs: UserRS = {};
  profileRQ: ProfileRQ = {};
  constructor(
    public dialogRef: MatDialogRef<AssociateProfileUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      nameProfile: ['', Validators.required],
      // photoUrl: ['']
    });
  }

  submitForm(){
    this.profileRQ = this.myForm.value;
    this.profileRQ.userId = this.userRs.id;
    this.userService.associateProfileUser(this.profileRQ).subscribe({
      next: (data) => {
        confirm('Perfil registrado');
        this.dialogRef.close(this.profileRQ);
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      },
      complete: () => {
      },
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

}
