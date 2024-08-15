import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  courseDetails!:any;
  router:Router = inject(Router);

  ngOnInit(): void {

    // ***********passing the static data using state directive and how to get that data******************

    // this.courseDetails = this.router.getCurrentNavigation().extras.state;
    this.courseDetails = history.state;
  }

}
