// import { Component } from '@angular/core';
// import { ICourse } from '../interface/course';
// import { CourseService } from '../service/course.service';
// import { inject } from '@angular/core';
// import { CoursePipe } from '../pipe/course.pipe';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-course-detail',
//   standalone: true,
//   imports: [CoursePipe,CommonModule,RouterLink],
//   templateUrl: './course-detail.component.html',
//   styleUrl: './course-detail.component.css'
// })
// export class CourseDetailComponent {
//   CourseList!: ICourse[];
//   courseId: number;


//   course:CourseService = inject(CourseService);
//   activeRoute:ActivatedRoute = inject(ActivatedRoute)

//   ngOnInit(): void {
//       this.loadCoursesOfId();
//   }

//   loadCoursesOfId(){
//     // console.log(this.activeRoute.snapshot.paramMap['params'].id)

//     // getting the id from URL
//     // this.courseId = +this.activeRoute.snapshot.paramMap['params'].id // when next and previous button it wont work

//     this.activeRoute.paramMap.subscribe((data)=>{
//       // console.log(data.get('id'))
//       this.courseId = +data.get('id'); // + converting to number
//       // getting th course dataiis from api
//       this.course.getCourseById(this.courseId).subscribe((data)=>{
//         this.CourseList = data;
//       })
//     })


//   }
// }

import { Component } from '@angular/core';
import { ICourse } from '../interface/course';
import { CourseService } from '../service/course.service';
import { inject } from '@angular/core';
import { CoursePipe } from '../pipe/course.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getHeapSnapshot } from 'v8';

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

