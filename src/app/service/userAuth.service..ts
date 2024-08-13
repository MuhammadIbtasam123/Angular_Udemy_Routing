import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserInterface } from '../interface/user.interface.ts.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000' // base url
  private userEndpoint = 'users'  // create new user url
  isLoggedIn: boolean = false;

  constructor(private http:HttpClient) { }

  //login to check user exist in db
  LoginUserCheck(user: UserInterface): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.BASE_URL}/${this.userEndpoint}`).pipe(
      map((users: UserInterface[]) => {
        let extractedUser = users.filter(u => u.username === user.username && u.password === user.password);
        if(extractedUser === undefined)
          this.isLoggedIn = false;
        else
          this.isLoggedIn = true;
        
        return extractedUser;
      })
    );
  }
  
  logout(){
    this.isLoggedIn = false;
  }

  isAuthenticated():boolean{
    return this.isLoggedIn;
  }

  createNewUser(user:UserInterface): Observable<any>{
    return this.http.post(`${this.BASE_URL}/${this.userEndpoint}`,user)
  }

  // check user that if user with the username already exist during signup
  checkUser(user: UserInterface): Observable<boolean> {
    return this.http.get<UserInterface[]>(`${this.BASE_URL}/${this.userEndpoint}`).pipe(
      map(users => {
        return users.some(u => u.username === user.username);
      })
    );
  }
}
