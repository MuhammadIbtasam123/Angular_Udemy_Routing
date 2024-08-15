import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ICourse } from '../../interface/course';
import { CommonModule } from '@angular/common';
import { CoursePipe } from '../../pipe/course.pipe';
import { NavigationStart, Params, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule,CoursePipe,RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  CourseList: ICourse[] = []
  course:CourseService = inject(CourseService);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  queryVal:string;
  showLoader:boolean = true;

  ngOnInit(): void {
    debugger
      this.showLoader = true;
      this.activatedRoute.queryParams.subscribe((queryValue)=>{
        if (queryValue['search']){
          this.queryVal = queryValue['search'];
          setTimeout(() => {
            this.loadCourseByQueryParams();
            this.showLoader = false;

          }, 2000);
        }
        else{
          setTimeout(() => {
            this.loadCourses();
            this.showLoader = false;
          }, 2000);
        }
      })

      
  }

  loadCourseByQueryParams(){
    
    this.course.getCourseByQueryParams(this.queryVal).subscribe((data)=>{
      this.CourseList = data
    })

  }

  loadCourses(){
    this.course.getAllCourses().subscribe((data)=>{
      this.CourseList = data
    })

  }

}
