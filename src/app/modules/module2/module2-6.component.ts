import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { ToastsManager } from 'ng6-toastr';
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module2Service } from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-module2-6',
  templateUrl: './module2-6.component.html'
})
export class Module26Component implements OnInit {
  @ViewChild("instructionModal") public instructionModal: ModalDirective;
  public data;
  public mainFlagModule2 = parseInt(
    window.localStorage.getItem("mainFlagModule2")
  );
  public subFlagModule2 = parseInt(
    window.localStorage.getItem("subFlagModule2")
  );

  counter;
  public startFlag;
  options = [];
  questionStatement;
  answerData = [];
  sendYesNoType;
  description;
  ansSelectCount;

  public currentSource = window.localStorage.getItem("source");

  constructor(
    public FullLayoutService: FullLayoutService,
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module2Service: Module2Service,
    public translate: TranslateService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.currentSource = window.localStorage.getItem("source");
    this.ansSelectCount = 10;
    this.counter = 0;
  }

  start() {
    this.startFlag = true;

    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";

    var apiUrl = "mcqwithoption/";

    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["message"] == "submodule started") {
          this.data = data["data"];
          // console.log('mcq',this.data);

          this.description = this.data.description;
          // console.log('descri', this.description);

          this.questionStatement = data["data"].question;

          this.options = data["data"].statementlist;
          // console.log('list',this.options)
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  // onValueChanged($event,id){
  //   this.answerData.push(id);
  //   console.log('iddd', this.answerData);
  // }

  onValueChanged(e, i, statementId) {

    if (e.target.checked) {
      this.counter++;

      if (this.counter < this.ansSelectCount) {
        this.answerData.push(statementId);
      } else {
        this.counter--;
        var t = <HTMLInputElement>document.getElementById(i);
        t.checked = false;
      }
    } else {
      console.log("else", this.answerData.indexOf(statementId));
      this.counter--;
      this.answerData.splice(this.answerData.indexOf(statementId), 1);
    }
    console.log("Select", this.answerData, this.counter);
  }

  sendAnswer() {
    this.startFlag = true;
    var jsonBody = {};
    if (this.answerData.length == 0)
    {
      this.toastr.error(this.translate.instant("Errors.requiredOneOpt"));
    } else
    {
      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      jsonBody["useranswer"] = this.answerData;
      jsonBody["event"] = "answer";

      var apiUrl = "mcqwithoption/";
      this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
        data => {
          if (data["message"] == "submodule finish")
          {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.instructionModal.show();
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
    }
  }

  finish(){
    this.instructionModal.hide();
    window.localStorage.setItem("mainFlagModule2", "7");
    window.localStorage.setItem("subFlagModule2", "1");
    window.localStorage.setItem('source', 'module 2.7.1');
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module2.subMenu2-6"),
      next: this.translate.instant("L2Module2.subMenu2-7"),
      nextRoute: "/modules/module2/Module2.7"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    this.Module2Service.setLocalStorage2(8);
  }
}
