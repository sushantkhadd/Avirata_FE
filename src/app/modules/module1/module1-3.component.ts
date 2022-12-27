import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module1Service } from './module1.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-module1-3',
  templateUrl: './module1-3.component.html'
})
export class Module13Component implements OnInit {

  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));

  public token; startVideoEvent;
  public passData = {}; //used when CFU completed
  public videoData = {}; passUrl;
  inst="मोहनच्या केसस्टडीमध्ये अपेक्षा, अपयश, नैराश्य आणि मग आत्महत्येचे विचार अशी एक साखळीच आपल्याला दिसते आहे. यापैकी नैराश्य म्हणजे काय आणि आत्महत्येचे विचार का येतात हे आपण पुढील मोड्यूल मध्ये पाहुयात. या मोड्यूलमध्ये आपण यश आणि अपयश यांची चर्चा करू."
  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService:FullLayoutService, public LanguageService:LanguageService,public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module1Service: Module1Service,public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    if (this.subFlagModule1 == 3) {
    }
     if (this.mainFlagModule1 < 3) {

    }
     else if (this.mainFlagModule1 == 3)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'moduleonecfustart/';
    }
    else if (this.mainFlagModule1 > 3) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.3"
        );
        if (urlJson["children"][index].url != null)
        {
          this.passData['videoUrl'] = urlJson["children"][index].url;
        } else {
          this.passData['videoUrl'] = this.passUrl;
        }
      } else {
        this.passData['videoUrl'] = this.passUrl;
      }
    }
  }

  finishCFU(e) {
    if (e) {
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson1")); 
      var index = current1["children"].findIndex(
      item => item.source == "module 1.3" );
      current1["children"][index].url = e["url"]; 
      window.localStorage.setItem("currentJson1", JSON.stringify(current1))
      window.localStorage.setItem('mainFlagModule1', '4');
      window.localStorage.setItem('subFlagModule1', '1');
      window.localStorage.setItem('source', 'module 1.4');
      this.Module1Service.setLocalStorage1(6);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-3'), "next": this.translate.instant('L2Module1Finish.subMenu1-4'), "nextRoute": "/modules/module1/Module1.4" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule1', '3');
      this.router.navigate(['/modules/module1/Module1.3']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule1++;
    window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString());
  }
  start(){
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
  }









  // public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  // public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  // public token; startVideoEvent;
  // public passData = {};//used when CFU completed
  // public videoData = {}; passUrl; flag; mainJson;
  // parentUrls = {}; urlArray = {};
  // public currentSource = window.localStorage.getItem('source');

  // constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module1Service: Module1Service, public translate: TranslateService, public toastr: ToastsManager,
  //   vcr: ViewContainerRef) {
  //   this.toastr.setRootViewContainerRef(vcr);
  //  }

  // ngOnInit() {
  //   this.passUrl = 'IkzkQ-Xft4c'
  //   this.currentSource = window.localStorage.getItem('source');
  //   this.startVideoEvent = false;

  //   this.token = this.LocalstoragedetailsService.token

  //   if (this.mainFlagModule1 == 3)
  //   {
  //     this.startVideoEvent = false;
  //     this.videoData["apiUrl"] = "moduleonecfustart/";
  //     // if (this.subFlagModule1 == 1)
  //     // {
  //     //   this.start1();
  //     // } else if (this.subFlagModule1 == 2)
  //     // {
  //     //   this.start2();
  //     // }
  //   }
  //   else if (this.mainFlagModule1 > 3)
  //   {
  //     this.flag = 0;
  //     var urlJson = {};
  //     urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
  //     if (urlJson["children"].length > 0)
  //     {
  //       var index = urlJson["children"].findIndex(
  //         item => item.source == "module 1.3"
  //       );
  //       if (urlJson["children"][index].url != null)
  //       {
  //         var mainJson;
  //         mainJson = JSON.parse(urlJson["children"][index].url);
  //         this.urlArray["src1"] = mainJson["1"];
  //         this.urlArray["src2"] = mainJson["2"];
  //       }
  //     }
  //   }
  // }

  // start1() {
  //   this.startVideoEvent = true;
  // }

  // showVideo(src, val) {
  //   if (val == 1) {
  //     this.flag = val;
  //     this.passData["videoUrl"] = src;
  //   } else if (val == 2) {
  //     this.flag = val;
  //     this.passData["videoUrl"] = src;
  //   }
  // }
  // finishCFU1(e) {
  //   if (e)
  //   {
  //     this.parentUrls['1'] = e['url'];
  //     var current1 = [];
  //     current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
  //     var index = current1["children"].findIndex(
  //       item => item.source == "module 1.3");
  //     current1["children"][index].url = JSON.stringify(this.parentUrls);
  //     window.localStorage.setItem("currentJson1",JSON.stringify(current1));

  //     this.videoData["apiUrl"] = "moduleonecfustart/";
  //     this.subFlagModule1 = this.subFlagModule1 + 1
  //     window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString());
  //     console.log(current1, e,'1')
  //   }
  // }

  // finishCFU2(e) {
  //   if (e)
  //   {
  //     var current1 = [];
  //     current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
  //     var index = current1["children"].findIndex(
  //       item => item.source == "module 1.3");
  //     var moduleJson = current1["children"][index]
  //     if(moduleJson["children"].length !=0){
  //     var index1 = moduleJson["children"].findIndex(
  //     item => item.source == "module 1.3.1");
  //     if(moduleJson["children"][index1].url !="" && moduleJson["children"][index1].url !=null && moduleJson["children"][index1].url !=undefined){
  //     this.parentUrls['1'] = moduleJson["children"][index1].url;
  //     }
  //     }
  //     this.parentUrls['2'] = e['url'];
  //     current1["children"][index].url = JSON.stringify(this.parentUrls);
  //     window.localStorage.setItem("currentJson1", JSON.stringify(current1));

  //     window.localStorage.setItem('mainFlagModule1', '4');
  //     window.localStorage.setItem('subFlagModule1', '1');
  //     window.localStorage.setItem('source', 'module 1.4.1');
  //     this.Module1Service.setLocalStorage1(4);
  //     var obj = {
  //       "type": "submodule",
  //       "route": true,
  //       "current": this.translate.instant('L2Module1.subMenu1-3'),
  //       "next": this.translate.instant('L2Module1Finish.subMenu1-4'),
  //       "nextRoute": "/modules/module1/Module1.4"
  //     }
  //     this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
  //     console.log(current1,e,'2')
  //   }
  //   else
  //   {
  //     window.localStorage.setItem('mainFlagModule1', '4');
  //     this.router.navigate(['/modules/module1/Module1.4']);
  //   }
  // }
  // singleCFUComplete(e) {
  //   // console.log(this.subFlagModule1, "part 2")
  //   this.subFlagModule1 = 2;
  //   // window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString());
  // }
  // start() {
  //   this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
  // }

}
