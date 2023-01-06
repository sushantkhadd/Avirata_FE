import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'

@Component({
  selector: 'app-module0-16',
  templateUrl: './module0-16.component.html'
})
export class Module016Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  )
  showVideoFlag: boolean;
  passUrl: any;
  videoflag = 0;
  passValues = {};
  showCFU: boolean;
  urlArray={};lnk1;lnk2;thumb_title;
  flag: number;
  pdfUrl;
  lnk3;
  lnk4;
  lnk5;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public passData = {};
  ngOnInit() {
    this.lnk1 = '';
    this.lnk2 = '';
    this.lnk3 = '';
    this.lnk4 = '';
    this.lnk5 = '';
    this.urlArray["src1"] = "https://s3-ap-southeast-1.amazonaws.com/maacpd/Level2/Module1/1.10/RM-+1.pdf";
    this.urlArray["src2"] = "lTTajzrSkCw";
    this.urlArray["src3"] = "lTTajzrSkCw";
    this.urlArray["src4"] = "https://s3-ap-southeast-1.amazonaws.com/maacpd/Level2/Module1/1.10/RM-+1.pdf";
    this.urlArray["src5"] = "lTTajzrSkCw";

    if (this.mainFlagModule0 == 16) {
      this.showVideoFlag = false; 
      if (this.subFlagModule0 == 4 ) {
        this.showVideoFlag = false;
          this.start();
        // this.startPdf = false;
      }else if (this.subFlagModule0 == 2 || 
        this.subFlagModule0 == 3 || 
        this.subFlagModule0 == 5) {
        this.start();
        this.passData['apiUrl'] = "modulefoursingleurl/";
        this.passData['videoUrl'] = "";
        this.passData['status'] = true;  //first time call
        // this.passData['currentSubmodule'] = 'Career - a process' //static msg
        // this.passData['nextSubmodule'] = 'Career magic framework' //static msg
      }      
    }else if (this.mainFlagModule0 > 16) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson0"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 0.16"
        );
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        if (mainJson != null)
        {
          console.log("hjbhjb",mainJson["1"], mainJson["2"], mainJson["3"], mainJson["4"], mainJson["5"])

          this.urlArray["src1"] = mainJson["1"];
          this.urlArray["src2"] = mainJson["2"];
          this.urlArray["src3"] = mainJson["3"];
          this.urlArray["src4"] = mainJson["4"];
          this.urlArray["src5"] = mainJson["5"];
        } else {
          this.mapJSON();
        }
      } else {
        this.mapJSON();
      }
    }
  }

  mapJSON() {
    this.urlArray['src1'] = this.lnk1;
    this.urlArray['src2'] = this.lnk2;
    this.urlArray['src3'] = this.lnk3;
    this.urlArray['src4'] = this.lnk4;
    this.urlArray['src5'] = this.lnk5;
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start', 0);
  }

  videoFinish(e, item) {
    this.videoflag = item
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      // this.nextBtnFlag = true
    }
  }

  next(item) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    if (item == 5) {
      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)
    } else {
      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)
    }

  }

  apiCall(jsonBody, apiUrl, fun, item) {
    this.passData['videoUrl']='';
    this.showVideoFlag = false;
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.16', window.localStorage.getItem('username'), 10);
            this.showCFU = false;
            this.passValues['url'] = data['data'].url;            
            this.passData['videoUrl'] = data['data'].url;
            this.passData['apiUrl'] = "modulezerosingleurl/";

            this.showVideoFlag = true
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.16");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {

            if (item == 5) {
              this.instructionModal.hide();
              this.LanguageService.toHide();
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem('mainFlagModule0', '17');
              window.localStorage.setItem('subFlagModule0', '1');
              window.localStorage.setItem('source', 'module 0.17');
              this.Module0Service.setLocalStorage0(17);
              var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-17'), "next": this.translate.instant('L2Module0Finish.subMenu0-17'), "nextRoute": "/modules/module0/Module0.17" }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            } else {
              this.instructionModal.hide();
              this.LanguageService.toHide();
            }

          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }


  nextvideo(item) {
    this.subFlagModule0 = this.subFlagModule0 + 1
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    this.instructionModal.hide();
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    if (item == 5) {
      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)

    } else {
      this.nextApiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
    }

  }

  nextApiCall(jsonBody, apiUrl, fun) {
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "finish1") {
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.start()
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e, item) {
    this.subFlagModule0 = this.subFlagModule0 + 1;
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.nextApiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }

  showVideo(src, title,value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    console.log('hello pravin',src,title,value)
    if (value == 1)
    {
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      this.passValues["unlockView"] = "static";
    } else if (value == 2)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }else if (value == 3)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }else if (value == 4)
    {
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      this.passValues["unlockView"] = "static";
    }else if (value == 5)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }  
  }
}
