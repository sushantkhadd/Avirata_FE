import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
    } 
  }

}
