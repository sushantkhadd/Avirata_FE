import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module3Service} from './module3.service'
import { FullLayoutService} from '../../layouts/full-layout.service'

@Component({
  selector: 'app-module3-13',
  templateUrl: './module3-13.component.html'
})
export class Module313Component implements OnInit {
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module3Service: Module3Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
this.toastr.setRootViewContainerRef(vcr);
}
public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2;
public statVideoFlag; thumb_title;flag;
ngOnInit() {
this.lnk1 = ''
this.lnk2 = ''
this.urlArray['src1'] = 'skGFDAhQrhE'
this.urlArray['src2'] = 'opHKXAPIynA'
this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png'

this.showVideoFlag = false
this.nextBtnFlag = false

if (this.mainFlagModule3 == 13) {
  if (this.subFlagModule3 == 1) {
    this.start()
  } else if (this.subFlagModule3 == 2) {
    // this.start1()
  }
}
if (this.mainFlagModule3 > 13) {
  this.flag = 0;
  var urlJson = {};
  urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
  console.log("vcxxxx",urlJson)
  if (urlJson["children"].length > 0) {
    var index = urlJson["children"].findIndex(
      item => item.source == "module 3.13"
    );
    console.log("qWSS",index)
    var mainJson;
    mainJson = JSON.parse(urlJson["children"][index].url);
    console.log("hjbhjb",mainJson)
    if (urlJson["children"][index].url != null)
    {
      this.urlArray["src1"] = mainJson["3.13.1"];
      this.urlArray["src2"] = mainJson["3.13.2"];
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

start() {
var jsonBody = {}
jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
jsonBody['event'] = 'start'
this.apiCall(jsonBody, 'modulethreesingleurl/', 'start')
}
videoFinish(e) {
if (e == true) {
  this.instructionModal.show()
  this.LanguageService.toShow();
  this.nextBtnFlag = true
}
}
next() {
var jsonBody = {}
jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
jsonBody['event'] = 'finish'
this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1')
}
start1() {
this.showVideoFlag = true
this.videoData['apiUrl'] = 'modulethreecfustart/';
}
finishCFU(e) {
if (e) {
  var url ={}
  url['3.13.1'] = this.passUrl;
  url['3.13.2'] = e['url'];
  console.log("urllll",url)
  var current3 = [];
  current3 = JSON.parse(window.localStorage.getItem("currentJson3")); 
  var index = current3["children"].findIndex(
    item => item.source == "module 3.13" );
  current3["children"][index].url = JSON.stringify(url); 
  window.localStorage.setItem("currentJson3", JSON.stringify(current3));

  window.localStorage.setItem('mainFlagModule3', '14');
  window.localStorage.setItem('subFlagModule3', '1');
  window.localStorage.setItem('source', 'module 3.14');
  this.Module3Service.setLocalStorage3(14);
  var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-13'), "next": this.translate.instant('L2Module3.subMenu3-14'), "nextRoute": "/modules/module3/Module3.14" }
  this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
}
}

apiCall(jsonBody, apiUrl, fun) {
this.Module3Service.apiCall(jsonBody, apiUrl)
  .subscribe(
  data => {
    if (fun == 'start') {
      // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 3.8', window.localStorage.getItem('username'), 10);
      this.passData['apiUrl'] = "modulethreesingleurl/";
      this.passData['videoUrl'] = data['data'].url;
      this.showVideoFlag = true
      this.passUrl = data['data'].url;

      // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson3'))
      // var index1 = dummylocal.children.findIndex(item =>
      //   item.source == "module 3.8");
      // dummylocal.children[index1].url = this.passUrl
      // window.localStorage.setItem('currentJson3', JSON.stringify(dummylocal))

    } if (fun == 'finish1') {
      this.instructionModal.hide()
      this.LanguageService.toHide();
      this.showVideoFlag = false
      window.localStorage.setItem('uuid', data['data'].nextuuid)
      this.subFlagModule3 = this.subFlagModule3 + 1
      window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString())
      // this.start1()
    }
  },
  error => {
    this.LanguageService.handleError(error.error.message);
  });
}

showVideo(src, title,value) {
  // this.staticImageModal.show();
  // this.statVideoFlag = true;
  // this.statImageFlag = false;
  if (value == 1)
  {
    this.passData['videoUrl'] = this.urlArray['src1'];
    this.thumb_title = title;
    this.flag = value;
  } else if (value == 2)
  {
    this.passData['videoUrl'] = this.urlArray['src2'];
    this.thumb_title = title;
    this.flag = value;
  }

}

  closeModal() {
  // this.imageSrc = "";
  this.statVideoFlag = false;
  this.passData['videoUrl'] = "";
  this.staticImageModal.hide();
  this.LanguageService.toHide();
  }

  singleCFUComplete(e){

  }
}
