import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidators } from './Validators/passwordMatch.validator';
import { UserService } from '../service/userAuth.service.';
import { UserInterface } from '../interface/user.interface.ts';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ToastModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'], 
  providers:[MessageService]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isFormSubmitted: boolean = false;
  passwordMismatch: boolean = false;
  userObj!:UserInterface;
  userExist:boolean = false;
  router:Router = inject(Router);

  constructor(private userService: UserService, private msgSrvc:MessageService) {}


  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: FormValidators.passwordMatch('password', 'confirmPassword')
    });
  }

  get f(){
    return this.signupForm.controls;
  }

  onFormSubmission() {
    this.isFormSubmitted = true;    
    if (this.signupForm.invalid) {
      return;
    }
  
    this.userObj = {
      username: this.signupForm.value.userName,
      password: this.signupForm.value.password
    };
  
    this.userService.checkUser(this.userObj).subscribe(
      (userExists) => {
        if (userExists) {
          this.userExist = true;
          return;  // Exit the function if the user already exists
        }
  
        // If user does not exist, proceed with creating the user
        this.userService.createNewUser(this.userObj).subscribe(
          () => {
            console.log('User created successfully');
            this.signupForm.reset();

            // if not reset, voilation occur.
            this.isFormSubmitted = false;  
            this.userExist = false; 
            this.passwordMismatch = false;
            this.msgSrvc.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User created successfully',
              life: 5000  // Show for 5 seconds
            });
            
            // navigating the user to login page after succesfull login 
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 5100);
            
            
          },
          (error) => {
            console.error('Error creating user', error);
            this.msgSrvc.add({
              severity:'danger',
              summary:'error',
              detail:'User already exist',
              life:5000
            })
          }
        );
      },
      (error) => {
        console.error('Error checking user', error);
      }
    );
  }
}  