import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginRQ } from '../models/Request/LoginRQ';
import { UserRS } from '../models/Response/UserRS';
import { RegisterUserRQ } from '../models/Request/RegisterUserRQ';
import { environment } from 'src/environments/environment';
import { ProfileRS } from '../models/Response/ProfileRS';
import { UserRQ } from '../models/Request/UserRQ';


const USER_URL = environment.URL_API + '/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // private user$$ = new BehaviorSubject<User | null>(null);
  // user$ = this.user$$.asObservable();

  // private profileUserRS$$ = new BehaviorSubject<ProfileRS | null>(null);
  // profileUserRS$ = this.profileUserRS$$.asObservable();

  constructor(private http: HttpClient) { }

  // public setUser(user:User) {
  //   this.user$$.next(user);
  // }

  // public setProfileUserRS(profileUserRS:ProfileRS) {
  //   this.profileUserRS$$.next(profileUserRS);
  // }

  IsLoggedin(){
    return localStorage.getItem('user');
  }

  login(loginRQ: LoginRQ){
    return this.http.post<UserRS>(`${USER_URL}/login`,loginRQ);
  }

  registerUser(userRQ:RegisterUserRQ){
    return this.http.post<UserRS>(`${USER_URL}/register`,userRQ);
  }

  updateUser(userRQ:UserRQ){
    return this.http.put<UserRS>(`${USER_URL}/updateUser`,userRQ);
  }

  getProfilesUser(idUser: number) {
    return this.http.get<ProfileRS[]>(`${USER_URL}/listProfilesUser/${idUser}`);
  }

  associateProfileUser(profileRQ: ProfileRS) {
    return this.http.post<ProfileRS>(`${USER_URL}/associateProfile`,profileRQ);

  }

  // updateInformationUser(user:any) {
  //   return this.http.put<any>(`${USER_URL}/saveDataUser`,user);
  // }

  // getAllUsers(){
  //   return this.http.get<User[]>(`${USER_URL}/getAllUsers`);
  // }

  // deleteUser(user:User){
  //   return this.http.get(`${USER_URL}/changeState/${user.id}`);
  // }
}
