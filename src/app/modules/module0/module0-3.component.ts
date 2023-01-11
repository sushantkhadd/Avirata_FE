import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module0-3',
  templateUrl: './module0-3.component.html'
})
export class Module03Component implements OnInit {

  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(window.localStorage.getItem('mainFlagModule0'));
  public subFlagModule0 = parseInt(window.localStorage.getItem('subFlagModule0'));

  constructor(
    public FullLayoutService: FullLayoutService, 
    public LanguageService: LanguageService, 
    public Module0Service: Module0Service, 
    public router: Router, 
    public LocalstoragedetailsService: LocalstoragedetailsService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef, 
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public download: boolean; passValues = {}; finishJSONBody: any; startVideoEvent = true;
  showpdfFlag: boolean; showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; 
  urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}; statVideoFlag; thumb_title; 
  vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = "en-ytDYRRvg";
    this.lnk2 = "https://maacpd.s3.ap-southeast-1.amazonaws.com/L4_mr/Base+Module/0.3+-+%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%A6%E0%A5%82%E0%A4%9A%E0%A5%87+%E0%A4%AD%E0%A4%BE%E0%A4%97%2C+%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF+%E0%A4%B5+%E0%A4%B5%E0%A5%88%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%95+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE.pdf";

    this.urlArray["src1"] = "en-ytDYRRvg";
    this.urlArray["src2"] = "https://maacpd.s3.ap-southeast-1.amazonaws.com/L4_mr/Base+Module/0.3+-+%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%A6%E0%A5%82%E0%A4%9A%E0%A5%87+%E0%A4%AD%E0%A4%BE%E0%A4%97%2C+%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF+%E0%A4%B5+%E0%A4%B5%E0%A5%88%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%95+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE.pdf";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';

    this.showVideoFlag = false;
    this.nextBtnFlag = false;

    if (this.mainFlagModule0 == 3) {
      if (this.subFlagModule0 == 1) {
        this.start();
      } else if (this.subFlagModule0 == 2) {
        this.start1();
      }
    } else if (this.mainFlagModule0 > 3) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson0"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 0.3"
        );
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("mainJson",mainJson);
        if (mainJson != null) {
          this.urlArray["src1"] = mainJson["0.3.1"];
          this.urlArray["src2"] = mainJson["0.3.2"];
          this.passValues["url"] = mainJson["0.3.2"];
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
    this.passValues["url"] = this.lnk2;
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start');
  }

  videoFinish(e) {
    console.log("videoFinish", e);
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true;
    }
  }

  next() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1');
  }

  start1() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start2');
  }

  finishPDF(e) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish2')
  } 

  apiCall(jsonBody, apiUrl, fun) {
    this.Module0Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start') {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.3', window.localStorage.getItem('username'), 10);
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true;
            this.passUrl = data['data'].url;

            this.parentUrlJson["0.3.1"] = this.passUrl;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.3");
            current0["children"][index].url = JSON.stringify(this.parentUrlJson);
            console.log("JSON.stringify(current0) 1",JSON.stringify(current0));
            window.localStorage.setItem("currentJson1", JSON.stringify(current0));

          } else if (fun == 'start2') {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.3', window.localStorage.getItem('username'), 10);
            this.passValues["url"] = data["data"].url;
            this.passUrl = data['data'].url;
            this.showVideoFlag = true
            this.parentUrlJson["0.3.2"] = this.passUrl;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.3");
            current0["children"][index].url = JSON.stringify(this.parentUrlJson);
            console.log("JSON.stringify(current0) 2",JSON.stringify(current0));

            window.localStorage.setItem("currentJson1", JSON.stringify(current0));

          } else if (fun == 'finish1') {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.showVideoFlag = false;
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.subFlagModule0 = this.subFlagModule0 + 1
            window.localStorage.setItem('subFlagModule1', this.subFlagModule0.toString());

          } else if (fun == "finish2") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0', '4');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.4');
            this.Module0Service.setLocalStorage0(4);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-3'), "next": this.translate.instant('L2Module0Finish.subMenu0-4'), "nextRoute": "/modules/module0/Module0.4" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

  showVideo(src, title, value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    if (value == 1) {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2) {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }

  }

  // ngOnInit() {
  //   this.lnk1 = ''
  //   this.lnk2 = ''
  //   this.urlArray["src1"] = "en-ytDYRRvg";
  //   this.urlArray["src2"] = "https://maacpd.s3.ap-southeast-1.amazonaws.com/L4_mr/Base+Module/0.3+-+%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%A6%E0%A5%82%E0%A4%9A%E0%A5%87+%E0%A4%AD%E0%A4%BE%E0%A4%97%2C+%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF+%E0%A4%B5+%E0%A4%B5%E0%A5%88%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%95+%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE.pdf";
  //   this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
  //   this.showVideoFlag=false
  //   if (this.mainFlagModule0 == 3) {
  //     this.start();
  //   }else if (this.mainFlagModule0 > 3) {
  //     this.flag = 0;
  //     var urlJson = {};
  //     urlJson = JSON.parse(window.localStorage.getItem("currentJson0"));
  //     console.log("vcxxxx",urlJson)
  //     if (urlJson["children"].length > 0) {
  //       var index = urlJson["children"].findIndex(
  //         item => item.source == "module 0.3"
  //       );
  //       console.log("qWSS",index)
  //       var mainJson;
  //       mainJson = JSON.parse(urlJson["children"][index].url);
  //       console.log("hjbhjb",mainJson['0.3.1'])
  //       if (mainJson != null)
  //       {
  //         this.urlArray["src1"] = mainJson["0.3.1"];
  //         this.urlArray["src2"] = mainJson["0.3.2"];
  //       } else {
  //         this.mapJSON();
  //       }
  //     } else {
  //       this.mapJSON();
  //     }
  //   }
  // }

  // mapJSON() {
  //   this.urlArray['src1'] = this.lnk1
  //   this.urlArray['src2'] = this.lnk2
  // }

  // start() {
  //   var jsonBody = {}
  //   jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
  //   jsonBody['event'] = 'start'
  //   this.apiCall(jsonBody, 'modulezerosingleurl/', 'start')
  // }

  // videoFinish(e) {
  //   if (e == true) {
  //     this.instructionModal.show()
  //     this.LanguageService.toShow();
  //     this.nextBtnFlag = true
  //   }
  // }

  // nextvideo() {
  //   this.subFlagModule0 = this.subFlagModule0 + 1
  //   window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
  //   this.instructionModal.hide(); 
  //   this.showVideoFlag=false  
  // }

  // next() {
  //   var jsonBody = {}
  //   jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
  //   jsonBody['event'] = 'finish'
  //   this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  // }

  // apiCall(jsonBody, apiUrl, fun) {
  //   if (fun == "finish1"){
  //     this.showVideoFlag = true
  //   }else{
  //     this.showVideoFlag = false
  //   }

  //   this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
  //     data => {
  //       if (data["status"] == true) {
  //         if (fun == "start") {
  //           this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.3', window.localStorage.getItem('username'), 10);            
  //           this.passData['apiUrl'] = "modulezerosingleurl/";
  //           this.passData['videoUrl'] = data['data'].url;  
  //           if (this.subFlagModule0 == 2) {
  //             this.passValues['url'] = data['data'].url;
  //             this.showVideoFlag = true
  //           } else {

  //           }
  //           this.showVideoFlag = true
  //           var current0 = [];
  //           current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
  //           var index = current0["children"].findIndex(
  //             item => item.source == "module 0.3");
  //           current0["children"][index].url = this.passUrl;

  //           window.localStorage.setItem("currentJson0", JSON.stringify(current0));

  //         } else if (fun == "finish1") {
  //           this.LanguageService.toHide();
  //           window.localStorage.setItem('uuid', data['data'].nextuuid)
  //           window.localStorage.setItem('mainFlagModule0', '4');
  //           window.localStorage.setItem('subFlagModule0', '1');
  //           window.localStorage.setItem('source', 'module 0.4');
  //           this.Module0Service.setLocalStorage0(3);
  //           var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-2'), "next": this.translate.instant('L2Module0Finish.subMenu0-4'), "nextRoute": "/modules/module0/Module0.4" }
  //           this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
  //         }
  //       }
  //     },
  //     error => {
  //       this.LanguageService.handleError(error.error.message);
  //     }
  //   );
  // }

  // nextApiCall(){
  //   var jsonBody = {}
  //   jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
  //   jsonBody['event'] = 'finish'
  //   this.Module0Service.apiCall(jsonBody, 'modulezerosingleurl/').subscribe(
  //     data => {
  //       if (data["status"] == true) {          
  //           window.localStorage.setItem('uuid', data['data'].nextuuid)
  //           this.start()
  //       }
  //     },
  //     error => {
  //       this.LanguageService.handleError(error.error.message);
  //     }
  //   );
  // }

  // finishPDF(e) {
  //   var jsonBody = {}
  //   jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
  //   jsonBody['event'] = 'finish'
  //   this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  // } 


  // showVideo(src, title,value) {    
  //   if (value == 1)
  //   {
  //     this.passData['videoUrl'] = src;
  //     this.thumb_title = title;
  //     this.flag = value;
  //   } else if (value == 2)
  //   {
  //     this.passValues["url"] = src;
  //     this.thumb_title = title;
  //     this.flag = value;
  //     this.passValues["unlockView"] = "static";
  //   }

  // }
}
