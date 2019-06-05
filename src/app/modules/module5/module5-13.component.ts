import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module5Service} from './module5.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module5-13',
  templateUrl: './module5-13.component.html'
})
export class Module513Component implements OnInit {

  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  );
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data;
  questionType;
  passFlags = {};
  showAnswer;count;
  saveData;
  answer;
  sumbitButton;
  startFlag;
  public inst =
    "खालील विधान पूर्ण करा.";
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "checkBoxOption";
    this.passFlags["questionType"] = this.questionType;

    if (this.mainFlagModule5 == 13)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "modulefivecmcqselection/";

    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true)
        {
          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
          console.log("data ", data["data"]);
          this.data = data["data"];
          // console.log('mcq data', this.data);
          this.startFlag = true;
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  saveAnswer(e) {
    console.log("ff ", e);
    this.sumbitButton = true;
    this.answer = e;
    this.submit();
  }
  submit() {
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    var apiUrl = "modulefivecmcqselection/";
    console.log("dasd ", jsonBody);

    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (
          data["status"] == true &&
          data["message"] == "submodule finish"
        )
        {
          this.startFlag = false;
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.mainFlagModule5 = 14;
          window.localStorage.setItem("mainFlagModule5", "14");
          window.localStorage.setItem("subFlagModule5", "1");
          window.localStorage.setItem('source', 'module 5.14.1');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module5.subMenu5-13"),
            "next": this.translate.instant("L2Module5.subMenu5-14"),
            "nextRoute": "/modules/module5/Module5.14"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module5Service.setLocalStorage5(14);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }


}
