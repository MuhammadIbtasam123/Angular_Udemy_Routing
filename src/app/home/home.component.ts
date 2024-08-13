import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CoursesComponent } from './courses/courses.component';
import { SearchCourseComponent } from './search-course/search-course.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,TestimonialsComponent,CoursesComponent,SearchCourseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
