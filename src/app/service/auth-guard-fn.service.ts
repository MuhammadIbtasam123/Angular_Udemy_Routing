import { Router } from "@angular/router"
import { UserService } from "./userAuth.service."
import { inject } from "@angular/core"
export const CanActivate = () =>{
  const router = inject(Router);
  const userService = inject(UserService);
  if (userService.isAuthenticated()){
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }

}