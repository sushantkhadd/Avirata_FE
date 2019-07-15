import { Component, OnInit, ViewChild } from '@angular/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';
import { Module5Service } from './module5.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-module5-17",
  templateUrl: "./module5-17.component.html"
})
export class Module517Component implements OnInit {
  constructor(
    public FullLayoutService: FullLayoutService,
    public LanguageService: LanguageService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    public translate: TranslateService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService
  ) {}
  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public finalCount;
  public imgUrl;
  passValues = {};
  public download;
  link;
  showCFU;
  apiUrl;
  public cfuQuestion = {};
  public startPdf;
  mainFlagModule5;
  subFlagModule5;
  playVideo; flag;
  jsonBody = {}; thumb_title;
  passData = {};
  urlObject = {};
  private pdfUrl = environment.pdfUrl;
  pdf1;

  ngOnInit() {
    this.pdf1 =
      "https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf";
    this.startPdf = false;
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    this.subFlagModule5 = parseInt(
      window.localStorage.getItem("subFlagModule5")
    );

    if (this.mainFlagModule5 == 17) {
      if (this.subFlagModule5 == 1) {
        this.startPdf = false;
      } else if (this.subFlagModule5 == 2) {
        this.startEvent2();
      }
    } else if (this.mainFlagModule5 > 17) {
      // this.showCFU = false;
      // this.download = false;
      // this.link = "";
      // this.apiUrl = "/assets/jsonfile/module4_6.json";
      // this.finalCount = 22;
      // this.passValues["download"] = this.download;
      // this.passValues["link"] = this.link;
      // this.passValues["finalcount"] = this.finalCount;
      // this.passValues["showcfu"] = this.showCFU;
      // this.passValues["apiurl"] = this.apiUrl;
      // this.passValues["unlockView"] = "static";
      var unlockJson = {};
      this.flag = 0;
      unlockJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      if (unlockJson["children"].length > 0) {
        var index = unlockJson["children"].findIndex(
          item => item.source == "module 5.17"
        );
        var mainJson;
        mainJson = JSON.parse(unlockJson["children"][index].url);
        console.log("hjbhjb", mainJson["5.17.1"])
        if (mainJson != null)
        {
          this.urlObject["src1"] = mainJson["5.17.1"];
          this.urlObject["src2"] = mainJson["5.17.2"];
        }
        // if (unlockJson["children"][index].url != null) {
        //   this.passValues["url"] = unlockJson["children"][index].url;
        // }
      }
    }
  }
  finishPDF(e) {
    if (e) {
      this.jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      this.jsonBody["event"] = "finish";
      var apiUrl = "modulefivesingleurl/";
      this.apiCall(this.jsonBody, apiUrl, "finish1");
    }
  }

  finish2() {
    this.jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.jsonBody["event"] = "finish";
    var apiUrl = "modulefivesingleurl/";
    this.apiCall(this.jsonBody, apiUrl, "finish2");
  }

  finishVideo(e) {
    if (e) {
      this.instructionModal.show();
      this.LanguageService.toShow();
    }
  }

  startEvent1() {
    this.jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.jsonBody["event"] = "start";
    var apiUrl = "modulefivesingleurl/";
    this.apiCall(this.jsonBody, apiUrl, "start1");
  }

  startEvent2() {
    this.jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.jsonBody["event"] = "start";
    var apiUrl = "modulefivesingleurl/";
    this.apiCall(this.jsonBody, apiUrl, "start2");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1")
          {
            this.startPdf = true;
            this.passValues["url"] = data["data"].url;
            this.urlObject["5.17.1"] = data["data"].url;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.17"
            );
            current5["children"][index].url = JSON.stringify(this.urlObject);
            window.localStorage.setItem(
              "currentJson5",
              JSON.stringify(current5)
            );
          } else if (fun == "finish1") {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.subFlagModule5 = 2;
            window.localStorage.setItem("subFlagModule5", "2");
            this.startEvent2();
            console.log('finish1')
          } else if (fun == "start2")
          {
            this.playVideo = true;
            this.passData["videoUrl"] = data["data"].url;
            console.log("start2",this.passData);
            this.urlObject["5.17.2"] = data["data"].url;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.17"
            );
            current5["children"][index].url = JSON.stringify(this.urlObject);
            window.localStorage.setItem(
              "currentJson5",
              JSON.stringify(current5)
            );
          } else if (fun == "finish2")
          {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.mainFlagModule5 = 18;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule5", "18");
            window.localStorage.setItem("subFlagModule5", "1");
            window.localStorage.setItem("source", "module 5.18.1");
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module5.subMenu5-17"),
              next: this.translate.instant("L2Module5Finish.subMenu5-18"),
              nextRoute: "/modules/module5/Module5.18"
            };
            this.LocalstoragedetailsService.setModuleStatus(
              JSON.stringify(obj)
            );
            this.Module5Service.setLocalStorage5(18);
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  showVideo(src, title, value) {
    if (value == 1)
    {
      console.log(src)
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      this.passValues["unlockView"] = "static";
    } else if (value == 2)
    {
      console.log(src)
      this.passData["videoUrl"] = src;
      this.thumb_title = title;
      this.flag = value;
    }
  }

  // start() {
  //   // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.9', window.localStorage.getItem('username'), 10);
  //   this.jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
  //   this.jsonBody["event"] = "start";

  //   this.Module5Service.apiCall(
  //     this.jsonBody,
  //     "modulefivesingleurl/"
  //   ).subscribe(
  //     data => {
  //       if (data["message"] == "ok" || data["message"] == "submodule started") {
  //         this.passValues["url"] = data["data"].url;
  //         this.startPdf = true;
  //         var current5 = [];
  //         current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
  //         var index = current5["children"].findIndex(
  //           item => item.source == "module 5.17"
  //         );
  //         current5["children"][index].url = data["data"].url;
  //         window.localStorage.setItem("currentJson5", JSON.stringify(current5));
  //       }
  //     },
  //     error => {
  //       this.LanguageService.handleError(error.error.message);
  //     }
  //   );
  // }
}
