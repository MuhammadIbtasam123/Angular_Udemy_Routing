import { Component } from '@angular/core';
import { ICourse } from '../interface/course';
import { CourseService } from '../service/course.service';
import { inject } from '@angular/core';
import { CoursePipe } from '../pipe/course.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CoursePipe, CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'] // Corrected property name to 'styleUrls'
})
export class CourseDetailComponent {
  CourseList!: ICourse; // Changed from ICourse[] to ICourse
  courseId!: number; // Ensured courseId is defined before use
  length!:number;
  router:Router = inject(Router);
  course: CourseService = inject(CourseService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadCoursesOfId();
  }

  loadCoursesOfId() {
    this.length = this.activeRoute.snapshot.queryParamMap['params'].length;
    this.activeRoute.paramMap.subscribe((data) => {
      console.log(data);
      this.courseId = +data.get('id'); // + converts the string id to a number
      this.course.getCourseById(this.courseId).subscribe((data) => {
        this.CourseList = data;
      });
    });
  }

}

