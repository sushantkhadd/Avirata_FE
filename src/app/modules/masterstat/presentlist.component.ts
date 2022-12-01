import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentlist',
  templateUrl: './presentlist.component.html'
})
export class PresentlistComponent implements OnInit {

  constructor() { }

  public activity;

  ngOnInit() {
    this.activity='present';
  }
}