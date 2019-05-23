import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-module1-12",
  templateUrl: "./module1-12.component.html"
})
export class Module112Component implements OnInit {
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService) { }

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule1; subFlagModule1; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl; pdf1;

  ngOnInit() {
    this.pdf1 = 'https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf'
    this.startPdf = false
    this.mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
    this.subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));

    if (this.mainFlagModule1 > 12)
    {
      this.showCFU = false;
      this.download = false;
      this.link = '';
      this.apiUrl = '/assets/jsonfile/module4_6.json'
      this.finalCount = 22;
      this.passValues['download'] = this.download;
      this.passValues['link'] = this.link;
      this.passValues['finalcount'] = this.finalCount;
      this.passValues['showcfu'] = this.showCFU;
      this.passValues['apiurl'] = this.apiUrl;
      this.passValues["unlockView"] = "static";
      var unlockJson = {}
      unlockJson = JSON.parse(window.localStorage.getItem('currentJson1'))
      if (unlockJson['children'].length > 0)
      {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 1.12");

        if (unlockJson['children'][index].url != null)
        {
          this.passValues['url'] = unlockJson['children'][index].url
        }
      }
    }

  }
  finishPDF(e) {
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "finish";
    if (e == true)
    {
      this.Module1Service.finishModuleCall(this.finishJSONBody, 12, '/modules/module2', '/modules/module2')
    }
  }

  start() {
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.9', window.localStorage.getItem('username'), 10);
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "start";

    this.Module1Service.apiCall(this.finishJSONBody, 'moduleonesingleurl/')
      .subscribe(
        data => {
          if (data['message'] == 'ok' || data['message'] == 'submodule started')
          {
            this.passValues['url'] = data['data'].url;
            this.startPdf = true;
            var current1 = []
            current1 = JSON.parse(window.localStorage.getItem('currentJson1'))
            var child = {}
            var index = current1['children'].findIndex(item => item.source == 'module 1.12');
            current1['children'][index].url = data['data'].url;
            window.localStorage.setItem('currentJson1', JSON.stringify(current1))
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

}
