import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../interface/course';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private BASE_URL = 'http://localhost:3000' // base url
  // popularCourseEndpoint = 'popular'
  AllCoursesEndpoint:string = 'courses';
  getCourseBySpecificId:string = 'courses';


  constructor( private http: HttpClient) { }

  getAllCourses(): Observable <ICourse[]>{
      return this.http.get<ICourse[]>(`${this.BASE_URL}/${this.AllCoursesEndpoint}`)
  }

  getCourseById( id:number): Observable <ICourse>{
    return this.http.get<ICourse>(`${this.BASE_URL}/${this.getCourseBySpecificId}/${id}`)
  }

  getCourseByQueryParams(value: string): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${this.BASE_URL}/${this.AllCoursesEndpoint}`).pipe(
      map(courses => courses.filter(course =>{
        return course?.title.toLowerCase().includes(value?.toLowerCase())
        // console.log(course.title.toLowerCase().includes(value.toLowerCase())) 
      } ))
    );
  }
}
