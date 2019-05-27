import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { ToastsManager } from "ng6-toastr";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "CPD-L3"; loader;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
    private lBar: SlimLoadingBarService,
    private _router: Router ) {
    this.toastr.setRootViewContainerRef(vcr);
    this._router.events.subscribe((event: any) => {
      this.loadingBarInterceptor(event);
    });
  }

  ngOnInit() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart)
    {
      this.lBar.start();
    }
    if (event instanceof NavigationEnd)
    {
      this.lBar.complete();
    }
  }
}
