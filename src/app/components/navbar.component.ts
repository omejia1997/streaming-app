import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRS } from '../models/Response/UserRS';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  userRs: UserRS = {};

  constructor(
    private router: Router
  ) {
    this.userRs = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {};
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  editUser(){
    this.router.navigate(['./edit-user']);
  }

}
