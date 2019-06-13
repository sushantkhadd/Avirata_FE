import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module2-15',
  templateUrl: './module2-15.component.html'
})
export class Module215Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;
  public startEvent = false;public playVideo = false; vedioCompleteUrl;docData = {};
  public mainFlagModule2; token; jsonBody = {}; imgUrl; pdfUrl; subFlagModule2; passData = {};
  mainJson;
  flag; passValues = {};
  constructor(public FullLayoutService:FullLayoutService, public translate: TranslateService,public LanguageService:LanguageService, public router: Router, public Module2Service: Module2Service, public LocalstoragedetailsService: LocalstoragedetailsService,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  public startPdf = false;urlArray={};lnk1;lnk2;thumb_title;
  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.pdfUrl='https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module1/1.7_A.pdf'
    this.startEvent = false;
    this.mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
    this.subFlagModule2 = window.localStorage.getItem('subFlagModule2');
    this.token = window.localStorage.getItem('token');
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    if (this.mainFlagModule2 < 15) {

    }
    else if (this.mainFlagModule2 == 15) {
      this.startEvent = false;
      if (this.subFlagModule2 == 1 ) {
        // this.start()
      }
      if (this.subFlagModule2 == 2) {
        this.passData['apiUrl'] = "moduletwosingleurl/";
        this.passData['videoUrl'] = "";
        this.passData['status'] = true;  //first time call
        this.passData['currentSubmodule'] = 'Career - a process' //static msg
        this.passData['nextSubmodule'] = 'Career magic framework' //static msg
      }
    }
    else if (this.mainFlagModule2 > 15) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.15"
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
  //     this.router.navigate(["/modules/module2/Module2.16"]);
  //   }

  // }

  start() {
    if(window.localStorage.getItem("subFlagModule2") == "4"){
      console.log("pdf")
      this.startPdf = true;
      this.docData['state'] = 'dyanamic';
      this.docData['download'] = false;
      this.docData['link'] = '';

      this.docData['finalcount'] = 4;
      this.docData['showcfu'] = true;
      this.docData['apiurl'] = 'moduletwocfustart/';
      this.docData['apiurlResult'] = 'moduletwocfustart/';
    }
    else{
      var apiUrl = 'moduletwosingleurl/';
      this.jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
      this.jsonBody['event'] = "start";


    this.Module2Service.apiCall(this.jsonBody, apiUrl)
      .subscribe(
      data => {
        if (data['message'] = "submodule started") {
          if(window.localStorage.getItem("subFlagModule2")== "1"){
            this.imgUrl = data['data'].url;
          }
         else if(window.localStorage.getItem("subFlagModule2")== "2" || window.localStorage.getItem("subFlagModule2")== "3" || window.localStorage.getItem("subFlagModule2")== "5" || window.localStorage.getItem("subFlagModule2")== "6"){
          this.passData['videoUrl'] = data['data'].url;
          this.vedioCompleteUrl = data['data'].url;
          this.playVideo = true;
         }
         else if(window.localStorage.getItem("subFlagModule2")== "4"){
          this.passData['url'] = data['data'].url;
          this.startPdf = true;
         }
          var current2=[]
          current2=JSON.parse(window.localStorage.getItem('currentJson2'))
          var child={}
           var index=current2['children'].findIndex(item => item.source=='module 2.15');
          current2['children'][index].url= this.imgUrl
          console.log("FINISH ",current2)
          window.localStorage.setItem('currentJson2',JSON.stringify(current2))

          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 2.15', window.localStorage.getItem('username'), 10);
        }
      },
      error => {
        // this.toastr.error(this.translate.instant('Errors.cannotProceed'));
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

    this.mainFlagModule2 = 15;
    this.subFlagModule2 = 5;
    window.localStorage.setItem("mainFlagModule2", "15");
    window.localStorage.setItem("subFlagModule2", "5");
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
      window.localStorage.setItem('mainFlagModule2', '15');
      this.router.navigate(['/modules/Module2.15']);
    }
  }

  finish() {
    if(window.localStorage.getItem("subFlagModule2")== "4"){
      var apiUrl = 'moduletwocfustart/';
      var jsonFinish = {};
      jsonFinish['currentsubmoduleid'] = window.localStorage.getItem('uuid');
      jsonFinish['useroption'] = "";
      jsonFinish['event'] = "answer";
    }
    else{
      var apiUrl = 'moduletwosingleurl/';
      var jsonFinish = {};
      jsonFinish['submoduleid'] = window.localStorage.getItem('uuid');
      jsonFinish['event'] = "finish";
    }

    this.Module2Service.apiCall(jsonFinish, apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "submodule finish next uuid is") {
          window.localStorage.setItem('uuid', data['data'].nextuuid);
          this.subFlagModule2++;
          window.localStorage.setItem('subFlagModule2', JSON.stringify(this.subFlagModule2));
          this.instructionModal.hide()
          this.LanguageService.toHide();
          this.start();
        }
       else if (data['message'] == "submodule finish") {
        this.instructionModal.hide()
        this.LanguageService.toHide();
        var url = (data["data"].parenturl); 
        var current2 = [];
        current2 = JSON.parse(window.localStorage.getItem("currentJson2")); 
        var index = current2["children"].findIndex(
          item => item.source == "module 2.15" );
        current2["children"][index].url = url; 
        window.localStorage.setItem("currentJson2", JSON.stringify(current2));

         if(window.localStorage.getItem("subFlagModule2")== "6"){
          window.localStorage.setItem('mainFlagModule2', '16');
          window.localStorage.setItem('subFlagModule2', '1');
          window.localStorage.setItem('source', 'module 2.16');
          window.localStorage.setItem('uuid', data['data'].nextuuid);
          this.Module2Service.setLocalStorage2(16);
          var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.subMenu2-15'), "next": this.translate.instant('L2Module2.subMenu2-16'), "nextRoute": "/modules/module2/Module2.16" }
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
         }
         else{
          window.localStorage.setItem('uuid', data['data'].nextuuid);
          this.subFlagModule2++;
          window.localStorage.setItem('subFlagModule2', JSON.stringify(this.subFlagModule2));
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
