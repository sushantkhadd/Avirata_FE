import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Module5Service } from './module5.service';

@Component({
  selector: 'app-module5-6',
  templateUrl: './module5-6.component.html'
})
export class Module56Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));


  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module5Service: Module5Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) 
  {
    this.toastr.setRootViewContainerRef(vcr); 
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag;
  public statVideoFlag; thumb_title;

  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png'

    this.showVideoFlag = false;
    this.nextBtnFlag = false;

    if (this.mainFlagModule5 == 6) {
      if (this.subFlagModule5 == 1) {
        this.start()
      } else if (this.subFlagModule5 == 2) {
        // this.start1()
      }
    }

    if (this.mainFlagModule5 > 6) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.6"
        );
        if (urlJson["children"][index].url != null) {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["5.6.1"];
          this.urlArray["src2"] = mainJson["5.6.2"];
        } else {
          this.mapJSON();
          console.log('map json', this.mapJSON);
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

  start(){
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'start')
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show()
      this.nextBtnFlag = true
    }
  }

  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'finish1')
  }
  start1() {
    this.showVideoFlag = true
    this.videoData['apiUrl'] = 'modulefivecfustart/';
  }

  finishCFU(e) {
    if (e) {
      var url = {}
      url['5.6.1'] = this.passUrl;
      url['5.6.2'] = e['url'];
      console.log("urllll", url)
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson5"));
      var index = current1["children"].findIndex(
        item => item.source == "module 5.6");
      current1["children"][index].url = JSON.stringify(url);

      window.localStorage.setItem("currentJson5", JSON.stringify(current1));
      window.localStorage.setItem('mainFlagModule5', '7');
      window.localStorage.setItem('subFlagModule5', '1');
      window.localStorage.setItem('source', 'module 5.7');
      this.Module5Service.setLocalStorage5(7);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module5.subMenu5-6'), "next": this.translate.instant('L2Module5.subMenu5-7'), "nextRoute": "/modules/module5/Module5.7" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module5Service.apiCall(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (fun == 'start') {
          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 3.8', window.localStorage.getItem('username'), 10);
          this.passData['apiUrl'] = "modulefivesingleurl/";
          this.passData['videoUrl'] = data['data'].url;
          this.showVideoFlag = true
          this.passUrl = data['data'].url;
          console.log('passurl', this.passUrl);

          // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson1'))
          // var index1 = dummylocal.children.findIndex(item =>
          //   item.source == "module 3.8");
          // dummylocal.children[index1].url = this.passUrl
          // window.localStorage.setItem('currentJson1', JSON.stringify(dummylocal))

        } if (fun == 'finish1') {
          this.instructionModal.hide()
          this.showVideoFlag = false
          window.localStorage.setItem('uuid', data['data'].nextuuid)
          this.subFlagModule5 = this.subFlagModule5 + 1
          window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString())
          // this.start1()
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

  closeModal() {
    // this.imageSrc = "";
    this.statVideoFlag = false;
    this.passData['videoUrl'] = "";
    this.staticImageModal.hide();
  }

  singleCFUComplete(e) {
    // this.subFlagModule5++;
    // window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
  }

}
