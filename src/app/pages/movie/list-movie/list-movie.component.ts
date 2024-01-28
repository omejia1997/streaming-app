import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/Movie';
import { PlanCategoryRS } from 'src/app/models/Response/PlanCategoryRS';
import { MovieService } from 'src/app/services/movie.service';
import { PlanCategoryService } from 'src/app/services/plan-category.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {
  planCategoryRS: PlanCategoryRS ={};
  movies: Movie[]= [];

  constructor(
    private router:Router,
    private movieService: MovieService,
    private planCategoryService: PlanCategoryService
  ) {
    this.planCategoryService.planCategory$.subscribe(data => {
      this.planCategoryRS = data!;
      if(this.planCategoryRS){
        this.movieService.getMovies(this.planCategoryRS.category?.urlEndpoint!).subscribe(data => {
          this.movies = data;
        });
      }else{
        this.back();
      }
    })

   }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['./view-plans-by-profile']);
  }

  handleImageError(event: any) {
    event.target.src ="https://thumbs.dreamstime.com/z/fondo-de-la-plantilla-dise%C3%B1o-afiches-pel%C3%ADculas-y-con-papel-para-taza-caf%C3%A9-tiras-pel%C3%ADcula-se-puede-utilizar-publicaci%C3%B3n-200359118.jpg";
   }

}
