import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ListProfilesUserComponent } from './pages/profile/list-profiles-user/list-profiles-user.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ListPlansComponent } from './pages/plan/list-plans/list-plans.component';
import { ListMovieComponent } from './pages/movie/list-movie/list-movie.component';
import { ListCategoryComponent } from './pages/category/list-category/list-category.component';
import { ListPlanComponent } from './pages/plan/list-plan/list-plan.component';
import { CreatePlanComponent } from './pages/plan/create-plan/create-plan.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'edit-user', component:EditUserComponent},
  {path: 'list-profiles-user', component:ListProfilesUserComponent},
  {path: 'view-plans-by-profile', component:ListPlansComponent},
  {path: 'list-movies', component:ListMovieComponent},
  {path: 'list-categoys', component:ListCategoryComponent},
  {path: 'list-plans', component:ListPlanComponent},
  {path: 'create-plan', component:CreatePlanComponent},
  // {path: 'list-users', component:ListUserComponent,canActivate:[AuthGuard]},
  // {path: 'edit-information-user', component:EditInformationUserComponent,canActivate:[AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
