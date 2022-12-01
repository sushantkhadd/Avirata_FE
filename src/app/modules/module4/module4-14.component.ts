import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module4Service } from "./module4.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-module4-14',
  templateUrl: './module4-14.component.html'
})
export class Module414Component implements OnInit {
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module4Service: Module4Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService) { }

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule4; subFlagModule4; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl; pdf1;

  ngOnInit() {
    this.pdf1 = 'https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf'
    this.startPdf = false
    this.mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
    this.subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));

    if (this.mainFlagModule4 > 14)
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
      unlockJson = JSON.parse(window.localStorage.getItem('currentJson4'))
      if (unlockJson['children'].length > 0)
      {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 4.14");

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
      this.Module4Service.finishModuleCall(this.finishJSONBody, 14, '/modules/module5', '/modules/module5')
    }
  }

  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.14', window.localStorage.getItem('username'), 10);
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "start";

    this.Module4Service.apiCall(this.finishJSONBody, 'modulefoursingleurl/')
      .subscribe(
        data => {
          if (data['message'] == 'ok' || data['message'] == 'submodule started')
          {
            this.passValues['url'] = data['data'].url;
            this.startPdf = true;
            var current4 = []
            current4 = JSON.parse(window.localStorage.getItem('currentJson4'))
            var child = {}
            var index = current4['children'].findIndex(item => item.source == 'module 4.14');
            current4['children'][index].url = data['data'].url;
            window.localStorage.setItem('currentJson4', JSON.stringify(current4))
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

}
