import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";

@Component({
  selector: "app-module1-15",
  templateUrl: "./module1-15.component.html"
})
export class Module115Component implements OnInit {

  public mainFlagModule1 = parseInt(
    window.localStorage.getItem("mainFlagModule1")
  );
  public subFlagModule1 = parseInt(
    window.localStorage.getItem("subFlagModule1")
  )
  passUrl: any;
  passValues={};
  startPdf: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module1Service: Module1Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public passData = {};

  ngOnInit() {
    this.startPdf=false
    this.start();
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.15', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 1.15");
            current1["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson1", JSON.stringify(current1));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule2', '1');
            window.localStorage.setItem('subFlagModule2', '1');
            window.localStorage.setItem('source', 'module 2.1');
            this.Module1Service.setLocalStorage1(3);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-15'), "next": this.translate.instant('L2Module1Finish.subMenu0-10'), "nextRoute": "/modules/module0/Module0.10" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'finish1');
  }

  // constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService) { }

  // public finalCount;
  // public imgUrl; passValues = {};
  // public download; link; showCFU; apiUrl;
  // public cfuQuestion = {};
  // public startPdf; mainFlagModule1; subFlagModule1; finishJSONBody = {};
  // private pdfUrl = environment.pdfUrl; pdf1;

  // ngOnInit() {
  //   this.pdf1 = 'https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf'
  //   this.startPdf = false
  //   this.mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  //   this.subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));

  //   if (this.mainFlagModule1 > 12)
  //   {
  //     this.showCFU = false;
  //     this.download = false;
  //     this.link = '';
  //     this.apiUrl = '/assets/jsonfile/module4_6.json'
  //     this.finalCount = 22;
  //     this.passValues['download'] = this.download;
  //     this.passValues['link'] = this.link;
  //     this.passValues['finalcount'] = this.finalCount;
  //     this.passValues['showcfu'] = this.showCFU;
  //     this.passValues['apiurl'] = this.apiUrl;
  //     this.passValues["unlockView"] = "static";
  //     var unlockJson = {}
  //     unlockJson = JSON.parse(window.localStorage.getItem('currentJson1'))
  //     if (unlockJson['children'].length > 0)
  //     {
  //       var index = unlockJson['children'].findIndex(item =>
  //         item.source == "module 1.12");

  //       if (unlockJson['children'][index].url != null)
  //       {
  //         this.passValues['url'] = unlockJson['children'][index].url
  //       }
  //     }
  //   }

  // }
  // finishPDF(e) {
  //   this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
  //   this.finishJSONBody['useroption'] = "";
  //   this.finishJSONBody['event'] = "finish";
  //   if (e == true)
  //   {
  //     this.Module1Service.finishModuleCall(this.finishJSONBody, 12, '/modules/module2', '/modules/module2')
  //   }
  // }

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
