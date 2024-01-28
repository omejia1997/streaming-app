import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanRS } from '../models/Response/PlanRS';
import { PlanCategoryRS } from '../models/Response/PlanCategoryRS';
import { BehaviorSubject } from 'rxjs';
import { CategoryRQ } from '../models/Request/CategoryRQ';
import { CategoryRS } from '../models/Response/CategoryRS';
import { PlanRQ } from '../models/Request/PlanRQ';

const URL_ENDPOINT = environment.URL_API + '/plancategory';

@Injectable({
  providedIn: 'root'
})

export class PlanCategoryService {

  private planCategory$$ = new BehaviorSubject<PlanCategoryRS | null>(null);
  planCategory$ = this.planCategory$$.asObservable();

  constructor(private http: HttpClient) { }

  public setPlanCategory(planCategory:PlanCategoryRS) {
    this.planCategory$$.next(planCategory);
  }

  getPlanCategoriesByIdPlan(idPlan:number){
    return this.http.get<PlanCategoryRS[]>(`${URL_ENDPOINT}/getCategoriesByIdPlan/${idPlan}`);
  }

  getPlans(){
    return this.http.get<PlanRS[]>(`${URL_ENDPOINT}/getAllPlans`);
  }

  getCategories(){
    return this.http.get<CategoryRS[]>(`${URL_ENDPOINT}/getAllCategory`);
  }

  createPlan(planRQ: PlanRQ){
    return this.http.post<PlanRS>(`${URL_ENDPOINT}/createPlan`, planRQ);
  }

  updatePlan(planRQ: PlanRQ){
    return this.http.put<PlanRS>(`${URL_ENDPOINT}/updatePlan`, planRQ);
  }

  createCategory(categoryRQ: CategoryRQ){
    return this.http.post<CategoryRS>(`${URL_ENDPOINT}/createCategory`, categoryRQ);
  }

  updateCategory(categoryRQ: CategoryRQ){
    return this.http.put<CategoryRS>(`${URL_ENDPOINT}/updateCategory`, categoryRQ);
  }

  // getPlans(){
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options = { headers, withCredentials: true };
  //   return this.http.get<PlanRS[]>(`${URL_ENDPOINT}/getAllPlans`,options);
  // }


}
