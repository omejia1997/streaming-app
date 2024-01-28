import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProfileRS } from 'src/app/models/Response/ProfileRS';
import { PlanCategoryService } from 'src/app/services/plan-category.service';
import { UserService } from 'src/app/services/user.service';
import { AssociateProfileUserComponent } from '../associate-profile-user/associate-profile-user.component';
import { UserRS } from 'src/app/models/Response/UserRS';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-profiles-user',
  templateUrl: './list-profiles-user.component.html',
  styleUrls: ['./list-profiles-user.component.scss']
})
export class ListProfilesUserComponent implements OnInit {

  getProfilesUser$: Observable<ProfileRS[]>;
  profilesUser: ProfileRS[]= [];
  userRs: UserRS = {};

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
    this.getProfilesUser$ =this.userService.getProfilesUser(this.userRs.id!);
  }

  ngOnInit() {
    this.getProfilesUser();
  }

  getProfilesUser(){
    this.getProfilesUser$.subscribe(data => {
      this.profilesUser = data;
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(AssociateProfileUserComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      this.getProfilesUser();
      // if (formValue) this.getUsers();
    });
  }

  viewPlansByProfile(profileRS: ProfileRS) {
    this.router.navigate(['./view-plans-by-profile']);
  }
}
