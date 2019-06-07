import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { ToastsManager } from "ng6-toastr";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { SharedDataService } from "./services/shared-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: {
    "(document:keydown)": "disableInspect($event)"
  }
})
export class AppComponent implements OnInit {
  title = "CPD-L3";
  loader;_loaderBar;
  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private lBar: SlimLoadingBarService,
    private _router: Router,
    public _sharedService :SharedDataService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._router.events.subscribe((event: any) => {
      this.loadingBarInterceptor(event);
      window.scroll(0, 0);
    });
  }

  ngOnInit() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 2000);

    this._sharedService.getData().subscribe(
      data=>{
        console.log("dta",data)
        this._loaderBar = data;
      }
    )
  }

  disableInspect(e) {
    if (e.keyCode === 17) {
      e.preventDefault();
    }
    if (e.keyCode === 16) {
      e.preventDefault();
    }
    if (e.keyCode === 123) {
      e.preventDefault();
    }
  }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.lBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.lBar.complete();
    }
  }
}
