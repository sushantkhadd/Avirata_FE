import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from './../language.service';
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  public moduleTimelineFlag;
  public completedModule={};

  constructor(private router: Router,public toastr: ToastsManager, vcr: ViewContainerRef,public lang : LanguageService,public LocalstoragedetailsService:LocalstoragedetailsService,public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
      // window.location.reload();
    }
    // moduleTimelineFlag
    console.log("Timeline=>this.LocalstoragedetailsService.timelineState"+ this.LocalstoragedetailsService.timelineState);
    if(parseInt(window.localStorage.getItem('flag'))==5)
      {
         this.LocalstoragedetailsService.timelineState=1;
      }
        this.completedModule=JSON.parse(window.localStorage.getItem('completeModule'))
   }

  ngDoCheck(){
    if(window.localStorage.getItem('completeModule') != null){
    this.completedModule=JSON.parse(window.localStorage.getItem('completeModule'));
    }
  }

  showAlert(){
     this.toastr.warning(this.translate.instant('otherMessages.timelineMsg'));
  }

}
