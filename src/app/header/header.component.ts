import { Component, ValueEqualityFn } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ToastModule],
  providers:[MessageService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Ensure 'styleUrls' is correct
})
export class HeaderComponent {

  logoutValue:boolean = true;

  constructor(private router: Router, private msgSrvc:MessageService) {}

  // LogoutUser() {
  //   this.router.navigate(['login'], {queryParams:{logout:this.logoutValue}}); // Navigate to login if not authenticated
  // }

  logout(){
    this.msgSrvc.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User logging out...',
      life: 3000
    });
  }
}
