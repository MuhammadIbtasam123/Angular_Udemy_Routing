import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './home/courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CanActivate } from './service/auth-guard-fn.service';
import { CheckoutComponent } from './checkout/checkout.component';
// import { AuthGuardService } from './service/auth-guard.service';


export const routes: Routes = [
    {path:'', component: HomeComponent , pathMatch:'full'},
    {path:'signup', component: SignupComponent, pathMatch:'full'},
    {path:'login', component: LoginComponent, pathMatch:'full'},
    {path:'courses', component: CoursesComponent, pathMatch:'full',canActivate:[CanActivate]},

    // using authguard interface
    // {path:'course/details/:id',component: CourseDetailComponent, pathMatch:'full', canActivate:[AuthGuardService]},

    //using authguard function approach 
    {path:'course/details/:id',component: CourseDetailComponent, pathMatch:'full', canActivate:[CanActivate]},
    {path:'course/checkout',component: CheckoutComponent,pathMatch:'full',canActivate:[CanActivate]},
    {path:'**', component: NotFoundComponent, pathMatch:'full'}, // wild care when no match

    // crating a child routes as of course deatils is extension to courses
    // {path:'courses', component: CoursesComponent, pathMatch:'full',canActivate:[CanActivate]},
    // {path:'courses', children:[
    //     {path:'courses/details/:id',component: CourseDetailComponent, pathMatch:'full', canActivate:[CanActivate]},
    // ]},


];
