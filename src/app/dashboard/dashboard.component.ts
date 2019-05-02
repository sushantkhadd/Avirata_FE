import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { DashboardService } from './dashboard.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(public translate: TranslateService, public toastr: ToastsManager) {}

  ngOnInit() {}

  showSuccess() {
    this.toastr.success(
      this.translate.instant("Login.Login")
    );
  }
}
