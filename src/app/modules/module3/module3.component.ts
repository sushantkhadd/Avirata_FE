import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Module3Service } from "./module3.service";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModalDirective } from "ngx-bootstrap";
import { FullLayoutService } from "src/app/layouts/full-layout.service";

@Component({
  selector: "app-module3",
  templateUrl: "./module3.component.html"
})
export class Module3Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {}; passUrl; flag; mainJson;
  parentUrls = {}; urlArray = {};
  public currentSource = window.localStorage.getItem('source');
  showVideoFlag: boolean;
  nextBtnFlag: boolean;

  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module3Service: Module3Service, public translate: TranslateService, public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.passUrl = 'IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    console.log("hi this is main flag",this.mainFlagModule3)
    if (this.mainFlagModule3 == 1)
    {
      console.log("hello")
      this.startVideoEvent = false;
      this.videoData["apiUrl"] = "modulethreefustart/";
      console.log("hi")
      // if (this.subFlagModule3 == 1)
      // {
      this.start();
      // } else if (this.subFlagModule3 == 2)
      // {
      //   this.start2();
      // }
    }
    else if (this.mainFlagModule3 > 1)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      if (urlJson["children"].length > 0)
      {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.1"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["1"];
          this.urlArray["src2"] = mainJson["2"];
        }
      }
    }
  }

  start1() {
    this.startVideoEvent = true;
  }

  showVideo(src, val) {
    if (val == 1) {
      this.flag = val;
      this.passData["videoUrl"] = src;
    } else if (val == 2) {
      this.flag = val;
      this.passData["videoUrl"] = src;
    }
  }
  finishCFU1(e) {
    if (e)
    {
      this.parentUrls['1'] = e['url'];
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
      var index = current1["children"].findIndex(
        item => item.source == "module 3.1");
      current1["children"][index].url = JSON.stringify(this.parentUrls);
      window.localStorage.setItem("currentJson1",JSON.stringify(current1));

      this.videoData["apiUrl"] = "moduleonecfustart/";
      this.subFlagModule3 = this.subFlagModule3 + 1
      window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
      console.log(current1, e,'1')
    }
  }

  finishCFU2(e) {
    if (e)
    {
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
      var index = current1["children"].findIndex(
        item => item.source == "module 3.2");
      var moduleJson = current1["children"][index]
      if(moduleJson["children"].length !=0){
      var index1 = moduleJson["children"].findIndex(
      item => item.source == "module 2.1");
      if(moduleJson["children"][index1].url !="" && moduleJson["children"][index1].url !=null && moduleJson["children"][index1].url !=undefined){
      this.parentUrls['1'] = moduleJson["children"][index1].url;
      }
      }
      this.parentUrls['2'] = e['url'];
      current1["children"][index].url = JSON.stringify(this.parentUrls);
      window.localStorage.setItem("currentJson1", JSON.stringify(current1));

      window.localStorage.setItem('mainFlagModule3', '2');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.2');
      this.Module3Service.setLocalStorage3(4);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module3.subMenu1-1'),
        "next": this.translate.instant('L2Module1Finish.subMenu1-2'),
        "nextRoute": "/modules/module3/Module3.2"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
      console.log(current1,e,'2')
    }
    else
    {
      window.localStorage.setItem('mainFlagModule1', '6');
      this.router.navigate(['/modules/module1/Module1.6']);
    }
  }
  singleCFUComplete(e) {
    // console.log(this.subFlagModule3, "part 2")
    this.subFlagModule3 = 2;
    // window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
  }
  // start() {
  //   this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.1', window.localStorage.getItem('username'), 10);
  // }

  start() {
    var jsonBody = {}
    console.log("event start ", window.localStorage.getItem('uuid'))
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start')
  }
  videoFinish(e) {
    if (e == true)
    {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }
  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        console.log("api data body", data)
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.2', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "modulezerosingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            console.log("sacsac",this.passData)
            this.showVideoFlag = true
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.2");
            current0["children"][index].url =this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0                                        ', '3');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.3');
            this.Module3Service.setLocalStorage3(3);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-2'), "next": this.translate.instant('L2Module0Finish.subMenu0-3'), "nextRoute": "/modules/module0/Module0.3" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }  
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }


}
