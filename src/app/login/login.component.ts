import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UserService } from '../service/userAuth.service.';
import { UserInterface } from '../interface/user.interface.ts';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  isSubmitted: boolean = false;
  userObj!: UserInterface;
  router:Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);

  constructor(private userService:UserService, private msgSrvc:MessageService){}

  ngOnInit(): void {
    

    // Handling logout based on query params
    this.activatedRoute.queryParams.subscribe(params => {
      let paramsValue:boolean = Boolean(params['logout']);
      if (paramsValue){
        this.userService.logout();
        console.log(this.userService.isAuthenticated());
      }

    });

    //form Creation
    this.loginForm = new FormGroup({
      userName: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })
  }



  onFormSubmission(){
    this.isSubmitted = true;

    //creating a user with data of login form
    this.userObj = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    this.userService.LoginUserCheck(this.userObj).subscribe((user) => {
      if (user.length != 0) { // means User exists
        this.msgSrvc.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged in successfully',
          life: 3000 // Show for 5 seconds
        });
        // Navigate to all courses list 
        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 3001);

      } else { //when no user exist
        this.msgSrvc.add({
          severity: 'error', // Corrected severity to 'error'
          summary: 'Error',
          detail: 'Incorrect User Credentials',
          life: 3000
        });
      }
    });

  }

}
