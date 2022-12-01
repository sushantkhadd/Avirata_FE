import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module5Service} from './module5.service'

@Component({
  selector: 'app-module5-19',
  templateUrl: './module5-19.component.html'
})
export class Module519Component implements OnInit {

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

    if (this.mainFlagModule5 == 19) {

    } else if (this.mainFlagModule5 > 19) {
      this.statVideoFlag = false;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.19"
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
    if (e) {
      this.instructionModal.show();
      this.LanguageService.toShow();
    } else {
      window.localStorage.setItem("mainFlagModule5", "19");
      this.router.navigate(["/modules/module5/Module5.19"]);
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
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.19', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.19");
            current5["children"][index].url = this.vedioCompleteUrl;
            window.localStorage.setItem("currentJson5", JSON.stringify(current5));
            this.playVideo = true;
          } else if (fun == "finish") {
            if (data['message'] == "submodule finish next uuid is" || data['message'] == "submodule finish")
            {
              this.instructionModal.hide();
              this.LanguageService.toHide();
              this.statVideoFlag = true;
              window.localStorage.setItem(
                "uuid",
                data["data"].nextuuid
              );
              window.localStorage.setItem("mainFlagModule5", "20");
              window.localStorage.setItem("subFlagModule5", "1");
              window.localStorage.setItem("source", "module 5.20");
              var obj = {
                type: "submodule",
                route: true,
                current: this.translate.instant(
                  "L2Module5.subMenu5-20"
                ),
                next: this.translate.instant(
                  "L2Module5Finish.subMenu5-20"
                ),
                nextRoute: "/modules/module5/Module5.20"
              };
              this.LocalstoragedetailsService.setModuleStatus(
                JSON.stringify(obj)
              );
              this.Module5Service.setLocalStorage5(20);
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
