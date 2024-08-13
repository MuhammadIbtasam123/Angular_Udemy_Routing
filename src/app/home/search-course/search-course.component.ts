import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-course',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search-course.component.html',
  styleUrl: './search-course.component.css'
})
export class SearchCourseComponent {

  router:Router=inject(Router);

  SearchCourse(value:string){
    this.router.navigate(['/courses'], {queryParams:{ search:value}}) // navigate ( [ 'Link' , {queryParams: {key:value} } ] ) 1st argument as link 2nd argument as object - QueryParams
    // console.log(value)
  }

}
