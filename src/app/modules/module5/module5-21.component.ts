import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module5Service} from './module5.service'

@Component({
  selector: 'app-module5-21',
  templateUrl: './module5-21.component.html'
})
export class Module521Component implements OnInit {

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
  public passData = {};levelData;
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

    if (this.mainFlagModule5 == 21) {
     
    } else if (this.mainFlagModule5 > 21) {
      this.statVideoFlag = false;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.21"
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
      window.localStorage.setItem("mainFlagModule5", "21");
      this.router.navigate(["/modules/module5/Module5.21"]);
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
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.21', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.21");
            current5["children"][index].url = this.vedioCompleteUrl;
            window.localStorage.setItem("currentJson5", JSON.stringify(current5));
            this.playVideo = true;
          } else if (fun == "finish") {
            if (data['message'] == "module5 finish")
            {
              this.instructionModal.hide();
              this.LanguageService.toHide();
              this.statVideoFlag = true;
              window.localStorage.setItem('moduleFinishCount', JSON.stringify(data['data']));
              console.log("perc",data['data'].percentage)
              this.levelData =localStorage.getItem("levelData");
              for (let index = 0; index < this.levelData.length; index++)
              {
                if (parseInt(window.localStorage.getItem("currentstatus")) == index)
                {
                  let current5 = [];
                  current5 = JSON.parse(window.localStorage.getItem("levelData"));
                  let index1 = current5.findIndex(
                    item => item.module == index);
                    console.log("index",index,index1)
                  current5[index1].percent = JSON.stringify(data['data'].percentage);
                  window.localStorage.setItem("levelData", JSON.stringify(current5));
                  console.log(current5, "fifirty")
                }
              }
              this.subFlagModule5 = 1
              window.scroll(0,0)
              window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString())
              window.localStorage.setItem('mainFlagModule5', '25');
              this.mainFlagModule5 = 25;
              this.Module5Service.setLocalStorage5(25);
              // window.localStorage.setItem('currentstatus', '6');
              
              var obj = {
                "type": "allFinish",
                "route": true,
                "current": this.translate.instant('L2Module5.subMenu5-21'),
                "next": this.translate.instant('otherMessages.7-Next'),
                "nextRoute": "/dashboard", "finishHead": this.translate.instant('L2Module5.title'),
                "moduleNo": this.translate.instant('number.5')
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
              // window.localStorage.setItem('currentstatus', '6');
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