import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/Movie';
import { BehaviorSubject } from 'rxjs';

const URL_ENDPOINT = environment.URL_API + '/plancategory';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(urlEndpointMovie:string){
    return this.http.get<Movie[]>(urlEndpointMovie);
  }
}
