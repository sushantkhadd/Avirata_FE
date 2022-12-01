import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-masterstat',
  templateUrl: './masterstat.component.html'
})
export class MasterstatComponent implements OnInit {
  public activity;
  constructor() { }
  ngOnInit() {
        this.activity='notpresent';
  }
}