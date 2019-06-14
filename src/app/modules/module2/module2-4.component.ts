import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-module2-4',
  templateUrl: './module2-4.component.html'
})
export class Module24Component implements OnInit {
  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule2 = parseInt(
    window.localStorage.getItem("mainFlagModule2")
  );
  public subFlagModule2 = parseInt(
    window.localStorage.getItem("subFlagModule2")
  );
  constructor(
    public CommonService: CommonService,
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module2Service: Module2Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public startFlag; options = []; questionStatement; answerData = []; sendYesNoType;passData={}
  selectedId;
  public currentSource = window.localStorage.getItem('source');
  public token;
  public playVideo = false;
  vedioCompleteUrl;
  statVideoFlag;nextFlag;

  urlArray = {};submitFlag;
  ngOnInit() {
    this.submitFlag = false;
    this.currentSource = window.localStorage.getItem('source');
    this.vedioCompleteUrl = "79vHVVtmIoQ";
    this.mainFlagModule2 = parseInt(
      window.localStorage.getItem("mainFlagModule2")
    );
    this.subFlagModule2 = parseInt(
      window.localStorage.getItem("subFlagModule2")
    );
    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }

    if (this.mainFlagModule2 == 4) {
      if (this.subFlagModule2 == 1) {
        this.passData["apiUrl"] = "moduletwosingleurl/";
        this.passData["videoUrl"] = "";
        this.passData["status"] = true; //first time call
        this.passData["currentSubmodule"] = "Career - a process"; //static msg
        this.passData["nextSubmodule"] = "Career magic framework"; //static msg
      } else if (this.subFlagModule2 == 2) {
        this.startEvent2();
      }
    } else if (this.mainFlagModule2 > 4) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.4"
        );
        console.log("qWSS", index);
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          this.urlArray["src1"] = mainJson["2.4.1"];
          this.passData["videoUrl"] = this.urlArray["src1"];
        }
      }
    }
  }

  //removed this method if start event not required
  startEvent1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    var apiUrl = "moduletwosingleurl/";
    this.apiCall(jsonBody, apiUrl, "start1");
  }

  startEvent2() {
    this.startFlag = true;
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';

    var apiUrl = "mcqwithoption/";

    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data['message'] == 'submodule started'){
          this.questionStatement = data['data'].question;
          this.options = data['data'].statementlist;
          console.log("id",this.selectedId)
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      })
  }

  onValueChanged($event,id){
    this.submitFlag = true;
     this.selectedId = id;
    console.log("id",this.selectedId)
  }


  finishVideo(e) {
    console.log("aaaaaaa");
    if (e == true) {
      console.log(e);
      this.nextFlag = true; 
      this.subFlagModule2 = 2;
      // this.playVideo = false;
      this.instructionModal.show();
      this.LanguageService.toShow();
      var url ={}
      url['2.4.1'] = this.vedioCompleteUrl;
      console.log("urllll",url)
      var current2 = [];
      current2 = JSON.parse(window.localStorage.getItem("currentJson2")); 
      var index = current2["children"].findIndex(
        item => item.source == "module 2.4" );
      current2["children"][index].url = JSON.stringify(url); 
      window.localStorage.setItem("currentJson2", JSON.stringify(current2));
    } else {
      window.localStorage.setItem("mainFlagModule2", "4");
      this.router.navigate(["/modules/module2/Module2.4"]);
    }
  }

  finish2() {
    this.startFlag = true;
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.answerData.push(this.selectedId);
    jsonBody['useranswer'] = this.answerData;
    jsonBody['event'] = 'answer';

    var apiUrl = "mcqwithoption/";
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data['message'] == 'submodule finish'){
         window.localStorage.setItem("uuid", data["data"].nextuuid);
          window.localStorage.setItem("mainFlagModule2", "5");
          window.localStorage.setItem("subFlagModule2", "1");
          window.localStorage.setItem('source', 'module 2.5.1');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module2.subMenu2-4"),
            "next": this.translate.instant("L2Module2.subMenu2-5"),
            "nextRoute": "/modules/module2/Module2.5"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module2Service.setLocalStorage2(5);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      });
  }
  

  finish1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduletwosingleurl/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            // this.playVideo = false;
            // this.statVideoFlag = true;
            this.mainFlagModule2 = 4;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule2 = 2;
            window.localStorage.setItem("subFlagModule2", "2");
            //this.startEvent2();
            this.nextFlag = false; 
          } 
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  ngOnChange(){
    this.submitFlag = false;
  }
}
