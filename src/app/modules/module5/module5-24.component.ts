import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module5Service} from './module5.service'

@Component({
  selector: 'app-module5-24',
  templateUrl: './module5-24.component.html'
})
export class Module524Component implements OnInit {

  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  )
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public vedioCompleteUrl;token;
  public passData = {};
  public playVideo = false;statVideoFlag = false;

  ngOnInit() {
    this.vedioCompleteUrl = "79vHVVtmIoQ";
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    this.subFlagModule5 = parseInt(
      window.localStorage.getItem("subFlagModule5")
    );
    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }

    if (this.mainFlagModule5 == 24) {
     
    } else if (this.mainFlagModule5 > 24) {
      this.statVideoFlag = false;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.24"
        );
        console.log("qWSS", index);
        // var mainJson;
        // mainJson = JSON.parse(urlJson["children"][index].url);
        // console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          // this.urlArray["src1"] = mainJson["4.1.1"];
          this.passData["videoUrl"] = urlJson["children"][index].url;
        }
      }
    }
  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    var apiUrl = "modulefivesingleurl/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  finishVideo(e) {
    console.log("aaaaaaa");
    if (e) {
      console.log(e);
      this.instructionModal.show();
      this.LanguageService.toShow();
    } else {
      window.localStorage.setItem("mainFlagModule5", "24");
      this.router.navigate(["/modules/module5/Module5.24"]);
    }
  }

  next() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "modulefivesingleurl/", "finish");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.24");
            current5["children"][index].url = this.vedioCompleteUrl;
            window.localStorage.setItem("currentJson5", JSON.stringify(current5));
            this.playVideo = true;
          } else if (fun == "finish") {
            if (data['message'] == "module5 finish")
            {
              this.instructionModal.hide();
              this.LanguageService.toHide();
              this.statVideoFlag = true;
              window.localStorage.setItem('overAllPercent', data['data'].percentage);
              this.subFlagModule5 = 1
              window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString())
              window.localStorage.setItem('mainFlagModule5', '25');
              this.mainFlagModule5 = 25;
              this.Module5Service.setLocalStorage5(25);
              window.localStorage.setItem('currentstatus', '6');
              var obj = {
                "type": "moduleFinish",
                "route": true,
                "current": this.translate.instant('L2Module5.subMenu5-24'),
                "next": this.translate.instant('otherMessages.7-Next'),
                "nextRoute": "/dashboard", "finishHead": this.translate.instant('L2Module5.title')
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            }
          
            
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
}
