import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpdateInformationComponent } from '../modal-update-information/modal-update-information.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {

  getUsers$: Observable<User[]>;
  users: User[] = [];
  usersAux: User[] = [];
  filterData!: String;
  checkInputFilter: Boolean = false;
  comboBoxCivilStatus = ['SOLTERO', 'CASADO'];
  filterMaritalStatus!: string | undefined;
  filterAge!:number | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.getUsers$ = this.userService.getAllUsers();
  }

  ngOnInit(): void {
    this.getUsers();
    console.log(this.filterData)
  }

  getUsers() {
    this.getUsers$.subscribe(data => {
      this.users = data;
      this.usersAux = data;
    });
  }

  viewInputFilter(){
    this.filterMaritalStatus = undefined;
    this.filterAge = undefined;
    this.users = this.usersAux;
  }

  applyFilters() {
    this.users = this.usersAux;
    if(this.filterMaritalStatus){
      this.users = this.users.filter(user =>{
        if(this.filterMaritalStatus){
          return (user.maritalStatus?.includes(this.filterMaritalStatus))
        }else return [];
      });
      return;
    }

    if(this.filterAge){
      this.users = this.users.filter(user =>{
        if(this.filterAge && user.age){
          return (user.age>this.filterAge)
        }else return [];
      });
      return;
    }


  }

  deleteUser(user:User) {
    var option = confirm("¿Esta seguro de eliminar este Usuario?");
    if (option) {
      this.userService.deleteUser(user).subscribe({
        next: (data) => {
          this.getUsers();
        },
        error: (err) => {
          alert("Error al eliminar el usuario")
        },
        complete: () => {
        },
      });
    }
  }

  openModalEditInformation(user:User) {
    this.userService.setUser(user);
    console.log(user);
    const dialogRef = this.dialog.open(ModalUpdateInformationComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((formValue) => {
      if (formValue) this.getUsers();
    });
  }

  editInformationUser(user:User){
    this.userService.setUser(user);
    this.router.navigate(['./edit-information-user']);
  }
}
