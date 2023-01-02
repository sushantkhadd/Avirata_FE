import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";
import { environment } from "src/environments/environment";
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-module1-12",
  templateUrl: "./module1-12.component.html"
})
export class Module112Component implements OnInit {
  @ViewChild("ratingModal") public ratingModal: ModalDirective;

  startFlag=false;
  senAns: {};
  tasks: any[];
  question3: any;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService) { }

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule1; subFlagModule1; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl; pdf1;

  ngOnInit() {  
    this.mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
    this.subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  }

  finishPDF(e) {
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "finish";
    if (e == true)
    {
      this.Module1Service.finishModuleCall(this.finishJSONBody, 12, '/modules/module1', '/modules/module1')
    }
  }

  start(){
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, 'moduleonemcqratings/', 'start4')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          console.log("data apiCall 1", data["status"], fun);

          if (data["status"] == true) {
            console.log("data apiCall", data["status"], fun);

            if (fun == "start4") {
              console.log("data ???", data["data"]);
              this.question3 = data['data'].question;
              var newArr =[]
              newArr = data["data"].statementlist;
              this.startFlag = true;
              this.senAns = {}
              this.senAns[newArr[0].statementid] = ''
              this.senAns[newArr[1].statementid] = ''
              this.senAns[newArr[2].statementid] = ''
              this.senAns[newArr[3].statementid] = ''
              this.senAns[newArr[4].statementid] = ''
              this.senAns[newArr[5].statementid] = ''
              this.senAns[newArr[6].statementid] = ''
              this.senAns[newArr[7].statementid] = ''
              this.senAns[newArr[8].statementid] = ''
              this.senAns[newArr[9].statementid] = ''
              this.tasks=[];
              for(let i=0; i<newArr.length;i++){
              this.tasks.push ({
              id: i + 1,
              statement :newArr[i].statement,
              statementid : newArr[i].statementid
              })
              }
              console.log("new obj",this.tasks);

              // this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.9', window.localStorage.getItem('username'), 10);
  
              // this.passValues["url"] = data["data"].url;
              // this.startPdf = true;
              // this.passUrl = data['data'].url;
              // var current0 = [];
              // current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
              // var index = current0["children"].findIndex(
              //   item => item.source == "module 0.9");
              // current0["children"][index].url = this.passUrl;
  
              // window.localStorage.setItem("currentJson0", JSON.stringify(current0));
            } else if (fun == "finish4") {
              console.log("data apiCall 1", data["status"], fun);
              this.LanguageService.toHide();
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem('mainFlagModule1', '13');
              window.localStorage.setItem('subFlagModule1', '1');
              window.localStorage.setItem('source', 'module 1.13');
              this.Module1Service.setLocalStorage1(13);
              var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-12'), "next": this.translate.instant('L2Module1Finish.subMenu1-13'), "nextRoute": "/modules/module1/Module1.13" }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            }
          }
  

              // console.log("data ", data["data"]);
              // this.question3 = data['data'].question;
              // var newArr =[]
              // newArr = data["data"].statementlist;
              // this.startFlag = true;
              // this.senAns = {}
              // this.senAns[newArr[0].statementid] = ''
              // this.senAns[newArr[1].statementid] = ''
              // this.senAns[newArr[2].statementid] = ''
              // this.senAns[newArr[3].statementid] = ''
              // this.senAns[newArr[4].statementid] = ''
              // this.senAns[newArr[5].statementid] = ''
              // this.senAns[newArr[6].statementid] = ''
              // this.senAns[newArr[7].statementid] = ''
              // this.senAns[newArr[8].statementid] = ''
              // this.senAns[newArr[9].statementid] = ''
              // this.tasks=[];
              // for(let i=0; i<newArr.length;i++){
              //   this.tasks.push ({
              //     id: i + 1,
              //     statement :newArr[i].statement,
              //     statementid : newArr[i].statementid
              // })
              // }
              // console.log("new obj",this.tasks);

              // this.mainFlagModule1 = 12;
              // window.localStorage.setItem("mainFlagModule1", "12");
              // window.localStorage.setItem("subFlagModule1", "1");

              // window.localStorage.setItem("uuid", data["data"].nextuuid);
              // this.mainFlagModule1 = 13;
              // window.localStorage.setItem('mainFlagModule1', '13');
              // window.localStorage.setItem('subFlagModule1', '1');
              // window.localStorage.setItem('source', 'module 1.13');
              // var obj = {
              // "type": "submodule",
              // "route": true,
              // "current": this.translate.instant('L2Module1.subMenu1-13'),
              // "next": this.translate.instant('L2Module1Finish.subMenu1-13'),
              // "nextRoute": "/modules/module1/Module1.13"
              // }
              // this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
              // this.Module1Service.setLocalStorage1(13);
          }
      //   )
      // },
      //   error => {
      //     this.LanguageService.handleError(error.error.message);
      //   }
      );
  }

  up(index) {
    if (index <= 0 || index >= this.tasks.length) {
      return
    }
    var t = this.tasks[index];
    this.tasks[index] = this.tasks[index - 1];
    this.tasks[index - 1] = t;
  }

  down(index) {
    if (index < 0 || index >= this.tasks.length - 1) {
      return
    }
    var t = this.tasks[index];
    this.tasks[index] = this.tasks[index + 1];
    this.tasks[index + 1] = t;
  }

  mcqTasks() {

    console.log("dta",this.tasks)
    var passArray = []
    for (let item in this.tasks) {
      // console.log("ssss ",this.sortedTasks[item].id)
      passArray.push(this.tasks[item].id)
    }


    var index = 0
    for (let i in this.senAns) {
      // console.log("aa ",i)
      this.senAns[i] = passArray[index]
      index++
    }
    //   var str=JSON.stringify(this.sortedTasks)
    //  str=str.substring(1, str.length-1);
    console.log("FInal: ", this.senAns)
    this.ratingModal.show();
    this.LanguageService.toShow()
    // var jsonBody = {}
    // jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    // jsonBody['event'] = 'finish'
    // jsonBody['answer'] = senAns
    // this.apiCall(jsonBody, 'stmtpriorty/', 'finish1')
  }

  ratingModalHide(){
    this.ratingModal.hide();
    this.LanguageService.toHide()
  }

  finish4(){
    this.ratingModal.hide();
    this.LanguageService.toHide()
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.senAns;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'moduleonemcqratings/', 'finish4');
  }

  // start() {
  //   this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.12', window.localStorage.getItem('username'), 10);
  //   this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
  //   this.finishJSONBody['useroption'] = "";
  //   this.finishJSONBody['event'] = "start";

  //   this.Module1Service.apiCall(this.finishJSONBody, 'moduleonesingleurl/')
  //     .subscribe(
  //       data => {
  //         if (data['message'] == 'ok' || data['message'] == 'submodule started')
  //         {
  //           this.passValues['url'] = data['data'].url;
  //           this.startPdf = true;
  //           var current1 = []
  //           current1 = JSON.parse(window.localStorage.getItem('currentJson1'))
  //           var child = {}
  //           var index = current1['children'].findIndex(item => item.source == 'module 1.12');
  //           current1['children'][index].url = data['data'].url;
  //           window.localStorage.setItem('currentJson1', JSON.stringify(current1))
  //         }
  //       },
  //       error => {
  //         this.LanguageService.handleError(error.error.message);
  //       });
  // }

}
