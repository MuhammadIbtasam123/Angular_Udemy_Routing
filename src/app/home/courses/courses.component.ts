import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ICourse } from '../../interface/course';
import { CommonModule } from '@angular/common';
import { CoursePipe } from '../../pipe/course.pipe';
import { Params, RouterLink } from '@angular/router';
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

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((queryValue)=>{
        if (queryValue['search']){
          this.queryVal = queryValue['search'];
          this.loadCourseByQueryParams();
        }
        else{
          this.loadCourses();
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
