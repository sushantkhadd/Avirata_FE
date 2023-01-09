import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module3Service } from './module3.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-module3-15',
  templateUrl: './module3-15.component.html'
})
export class Module315Component implements OnInit {

  public mainFlagModule3 = parseInt(
    window.localStorage.getItem("mainFlagModule3")
  );
  public subFlagModule3 = parseInt(
    window.localStorage.getItem("subFlagModule3")
  );

  public passData = {}; passUrl: any; passValues={}; startPdf: boolean;
  inst="<b>सूचना -</b> मानसिक आजारांसाठी काय प्रथमोपचार करता येतील? याविषयी अधिक जाणून घेण्यासाठी इयत्ता १२ वीच्या मानसशास्त्र विषयाच्या पुस्तकातील <b>‘प्रकरण ७ - मानसिक आरोग्यासाठी प्रथमोपचार’</b> हे प्रकरण वाचा.ई-पुस्तकाची लिंक - <a href='http://ekatmik.balbharati.in/pdfs/1201000505.pdf' target='_blank'>http://ekatmik.balbharati.in/pdfs/1201000505.pdf</a>"
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module3Service: Module3Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.startPdf=false
    if (this.mainFlagModule3 == 15) {
    }else if (this.mainFlagModule3 > 15) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.15"
        );
        if (urlJson["children"][index].url != null) {
          this.passValues["url"] = urlJson["children"][index].url;
        }
      }
    }
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.15', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current3 = [];
            current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
            var index = current3["children"].findIndex(
              item => item.source == "module 3.15");
            current3["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson3", JSON.stringify(current3));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule3', '16');
            window.localStorage.setItem('subFlagModule3', '1');
            window.localStorage.setItem('source', 'module 3.16');
            this.Module3Service.setLocalStorage3(13);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-15'), "next": this.translate.instant('L2Module3Finish.subMenu3-16'), "nextRoute": "/modules/module3/Module3.16" }
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
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1');
  }
}
