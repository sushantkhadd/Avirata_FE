import { Component, OnInit } from '@angular/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { environment } from 'src/environments/environment';
import { Module5Service } from './module5.service';

@Component({
  selector: "app-module5-20",
  templateUrl: "./module5-20.component.html"
})
export class Module520Component implements OnInit {
  constructor(
    public FullLayoutService: FullLayoutService,
    public LanguageService: LanguageService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    public translate: TranslateService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService
  ) {}

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
  finishJSONBody = {};
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

    if (this.mainFlagModule5 > 20) {
      this.showCFU = false;
      this.download = false;
      this.link = "";
      this.apiUrl = "/assets/jsonfile/module4_6.json";
      this.finalCount = 22;
      this.passValues["download"] = this.download;
      this.passValues["link"] = this.link;
      this.passValues["finalcount"] = this.finalCount;
      this.passValues["showcfu"] = this.showCFU;
      this.passValues["apiurl"] = this.apiUrl;
      this.passValues["unlockView"] = "static";
      var unlockJson = {};
      unlockJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      if (unlockJson["children"].length > 0) {
        var index = unlockJson["children"].findIndex(
          item => item.source == "module 5.20"
        );

        if (unlockJson["children"][index].url != null) {
          this.passValues["url"] = unlockJson["children"][index].url;
        }
      }
    }
  }
  finishPDF(e) {
    if (e == true)
    {
      this.finishJSONBody["submoduleid"] = window.localStorage.getItem("uuid");
      this.finishJSONBody["event"] = "finish";
      this.Module5Service.apiCall(
        this.finishJSONBody,
        "modulefivesingleurl/"
      ).subscribe(
        data => {
          if (
            data["message"] == "submodule finish" ||
            data["message"] == "submodule finish next uuid is"
          ) {
            this.mainFlagModule5 = 21;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule5", "21");
            window.localStorage.setItem("subFlagModule5", "1");
            window.localStorage.setItem("source", "module 5.21.1");
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant(
                "L2Module5.subMenu5-20"
              ),
              next: this.translate.instant("L2Module5Finish.subMenu5-21"),
              nextRoute: "/modules/module5/Module5.21"
            };
            this.LocalstoragedetailsService.setModuleStatus(
              JSON.stringify(obj)
            );
            this.Module5Service.setLocalStorage5(21);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        })
    }
  }

  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.20', window.localStorage.getItem('username'), 10);
    this.finishJSONBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.finishJSONBody["event"] = "start";

    this.Module5Service.apiCall(
      this.finishJSONBody,
      "modulefivesingleurl/"
    ).subscribe(
      data => {
        if (data["message"] == "ok" || data["message"] == "submodule started") {
          this.passValues["url"] = data["data"].url;
          this.startPdf = true;
          var current5 = [];
          current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
          var index = current5["children"].findIndex(
            item => item.source == "module 5.20"
          );
          current5["children"][index].url = data["data"].url;
          window.localStorage.setItem("currentJson5", JSON.stringify(current5));
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
}
