import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module3Service} from './module3.service'
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module3-16',
  templateUrl: './module3-16.component.html'
})
export class Module316Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;
  public startEvent = false;public playVideo = false; vedioCompleteUrl;docData = {};
  public mainFlagModule3; token; jsonBody = {}; imgUrl; pdfUrl; subFlagModule3; passData = {};
  mainJson;thumb_title;urlArray = {};
  flag; passValues = {};lnk1;lnk2
  constructor(public FullLayoutService:FullLayoutService, public translate: TranslateService,public LanguageService:LanguageService, public router: Router, public Module3Service: Module3Service, public LocalstoragedetailsService: LocalstoragedetailsService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  public startPdf = false
  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.pdfUrl='https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module1/1.7_A.pdf'
    this.startEvent = false;
    this.mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
    this.subFlagModule3 = window.localStorage.getItem('subFlagModule3');
    this.token = window.localStorage.getItem('token');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    if (this.mainFlagModule3 < 16) {

    }
    else if (this.mainFlagModule3 == 16) {
      this.startEvent = false;
      if (this.subFlagModule3 == 1 ) {
        // this.start()
      }
      if (this.subFlagModule3 == 2) {
        this.passData['apiUrl'] = "modulethreesingleurl/";
        this.passData['videoUrl'] = "";
        this.passData['status'] = true;  //first time call
        this.passData['currentSubmodule'] = 'Career - a process' //static msg
        this.passData['nextSubmodule'] = 'Career magic framework' //static msg
      }
    }
    else if (this.mainFlagModule3 > 16) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.16"
        );
        console.log("qWSS",index)
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb",mainJson["1"])
        if (mainJson != null)
        {
          this.urlArray["src1"] = mainJson["1"];
          this.urlArray["src2"] = mainJson["2"];
          this.urlArray["src3"] = mainJson["3"];
          this.urlArray["src4"] = mainJson["4"];
          this.urlArray["src5"] = mainJson["5"];
          this.urlArray["src6"] = mainJson["6"];
        } else {
          this.mapJSON();
        }
      } else {
        this.mapJSON();
      }
    }
  }

  mapJSON() {
    this.urlArray['src1'] = this.lnk1
    this.urlArray['src2'] = this.lnk2
    }
  // playNext(val) {
  //   if (val == 1) {
  //     this.flag = 1;
  //     this.passData["videoUrl"] = this.mainJson["2"];
  //   } else if (val == 2) {
  //     this.flag = 2;
  //     this.passData["videoUrl"] = this.mainJson["3"];
  //   }else if (val == 3) {
  //     this.flag = 3;
  //     this.passValues["url"] = this.mainJson["4"];
  //   } else if (val == 4) {
  //     this.flag = 4;
  //     this.passData["videoUrl"] = this.mainJson["5"];
  //   } else if (val == 5) {
  //     this.flag = 5;
  //     this.passData["videoUrl"] = this.mainJson["6"];
  //   }else if (val == 6)
  //   {
  //     this.router.navigate(["/modules/module3/Module3.17"]);
  //   }

  // }

  start() {
    if(window.localStorage.getItem("subFlagModule3") == "4"){
      console.log("pdf")
      this.startPdf = true;
      this.docData['state'] = 'dyanamic';
      this.docData['download'] = false;
      this.docData['link'] = '';

      this.docData['finalcount'] = 4;
      this.docData['showcfu'] = true;
      this.docData['apiurl'] = 'modulethreecfustart/';
      this.docData['apiurlResult'] = 'modulethreecfustart/';
    }
    else{
      var apiUrl = 'modulethreesingleurl/';
      this.jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
      this.jsonBody['event'] = "start";


    this.Module3Service.apiCall(this.jsonBody, apiUrl)
      .subscribe(
      data => {
        if (data['message'] = "submodule started") {
          if(window.localStorage.getItem("subFlagModule3")== "1"){
            this.imgUrl = data['data'].url;
          }
         else if(window.localStorage.getItem("subFlagModule3")== "2" || window.localStorage.getItem("subFlagModule3")== "3" || window.localStorage.getItem("subFlagModule3")== "5" || window.localStorage.getItem("subFlagModule3")== "6"){
          this.passData['videoUrl'] = data['data'].url;
          this.vedioCompleteUrl = data['data'].url;
          this.playVideo = true;
         }
         else if(window.localStorage.getItem("subFlagModule3")== "4"){
          this.passData['url'] = data['data'].url;
          this.startPdf = true;
         }
          // var current3=[]
          // current3=JSON.parse(window.localStorage.getItem('currentJson3'))
          // var child={}
          //  var index=current3['children'].findIndex(item => item.source=='module 3.16');
          // current3['children'][index].url= this.imgUrl
          // console.log("FINISH ",current3)
          // window.localStorage.setItem('currentJson3',JSON.stringify(current3))

          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 2.15', window.localStorage.getItem('username'), 10);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      });
    }
  }


  checkAnswer(e) {
    // var current2=[]
    // current2=JSON.parse(window.localStorage.getItem('currentJson2'))
    //  var index=current2['children'].findIndex(item => item.source=='module 2.19.4');
    // current2['children'][index].url=e['url']
    // console.log("urlllllllll",e['url'])
    // window.localStorage.setItem('currentJson2',JSON.stringify(current2))

    this.mainFlagModule3 = 16;
    this.subFlagModule3 = 5;
    window.localStorage.setItem("mainFlagModule3", "16");
    window.localStorage.setItem("subFlagModule3", "5");
    this.start();
  }

  finishVideo(e) {
    console.log("aaaaaaa")
    if (e == true) {
      console.log(e)
      this.playVideo = false;
      this.instructionModal.show()
      this.LanguageService.toShow();
    }
    else {
      window.localStorage.setItem('mainFlagModule3', '16');
      this.router.navigate(['/modules/Module3.16']);
    }
  }

  finish() {
    if(window.localStorage.getItem("subFlagModule3")== "4"){
      var apiUrl = 'modulethreecfustart/';
      var jsonFinish = {};
      jsonFinish['currentsubmoduleid'] = window.localStorage.getItem('uuid');
      jsonFinish['useroption'] = "";
      jsonFinish['event'] = "answer";
    }
    else{
      var apiUrl = 'modulethreesingleurl/';
      var jsonFinish = {};
      jsonFinish['submoduleid'] = window.localStorage.getItem('uuid');
      jsonFinish['event'] = "finish";
    }

    this.Module3Service.apiCall(jsonFinish, apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "submodule finish next uuid is") {
          window.localStorage.setItem('uuid', data['data'].nextuuid);
          this.subFlagModule3++;
          window.localStorage.setItem('subFlagModule3', JSON.stringify(this.subFlagModule3));
          this.instructionModal.hide()
          this.LanguageService.toHide();
          this.start();
        }
       else if (data['message'] == "submodule finish") {
        this.instructionModal.hide()
        this.LanguageService.toHide();
          var url = (data["data"].parenturl); 
          var current3 = [];
          current3 = JSON.parse(window.localStorage.getItem("currentJson3")); 
          var index = current3["children"].findIndex(
            item => item.source == "module 3.16" );
          current3["children"][index].url = url; 
          window.localStorage.setItem("currentJson3", JSON.stringify(current3));

         if(window.localStorage.getItem("subFlagModule3")== "6"){
          window.localStorage.setItem('mainFlagModule3', '17');
          window.localStorage.setItem('subFlagModule3', '1');
          window.localStorage.setItem('source', 'module 3.17');
          this.Module3Service.setLocalStorage3(17);
          var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-16'), "next": this.translate.instant('L2Module3Finish.subMenu3-17'), "nextRoute": "/modules/module3/Module3.17" }
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
         }
         else{
          window.localStorage.setItem('uuid', data['data'].nextuuid);
          this.subFlagModule3++;
          window.localStorage.setItem('subFlagModule3', JSON.stringify(this.subFlagModule3));
          this.instructionModal.hide()
          this.LanguageService.toHide();
          this.start();
         }

        }
      },
      error => {
        // this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        this.LanguageService.handleError(error.error.message);
      });
  }
  nextRoute() {
    this.router.navigate(['/dashboard']);
  }

  showVideo(src, title,value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    if (value == 1)
    {
      console.log("srccc",src)
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
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
    }else if (value == 6)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }
  
  }
}
