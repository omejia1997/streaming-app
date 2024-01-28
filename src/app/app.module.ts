import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar.component';
import { ListProfilesUserComponent } from './pages/profile/list-profiles-user/list-profiles-user.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AssociateProfileUserComponent } from './pages/profile/associate-profile-user/associate-profile-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListPlansComponent } from './pages/plan/list-plans/list-plans.component';
import { ListMovieComponent } from './pages/movie/list-movie/list-movie.component';
import { CreateCategoryComponent } from './pages/category/create-category/create-category.component';
import { ListCategoryComponent } from './pages/category/list-category/list-category.component';
import { ListPlanComponent } from './pages/plan/list-plan/list-plan.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { CreatePlanComponent } from './pages/plan/create-plan/create-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EditUserComponent,
    ListProfilesUserComponent,
    AssociateProfileUserComponent,
    ListPlansComponent,
    ListMovieComponent,
    CreateCategoryComponent,
    ListCategoryComponent,
    CreatePlanComponent,
    ListPlanComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    MatDialogModule,
    // MatFormFieldModule,
    ReactiveFormsModule,
    // MatSelectModule,
    // MatIconModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
