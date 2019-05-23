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
  selector: 'app-module2-13',
  templateUrl: './module2-13.component.html'
})
export class Module213Component implements OnInit {
  
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module2Service: Module2Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
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

    this.showVideoFlag = false
    this.nextBtnFlag = false

    if (this.mainFlagModule2 == 13)
    {
      if (this.subFlagModule2 == 1)
      {
        this.start()
      } else if (this.subFlagModule2 == 13)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule2 > 13)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.13"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["2.13.1"];
          this.urlArray["src2"] = mainJson["2.13.2"];
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
    this.apiCall(jsonBody, 'moduletwosingleurl/', 'start')
  }
  videoFinish(e) {
    if (e == true)
    {
      this.instructionModal.show()
      this.nextBtnFlag = true
    }
  }
  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'moduletwosingleurl/', 'finish1')
  }
  start1() {
    this.showVideoFlag = true
    this.videoData['apiUrl'] = 'moduletwocfustart/';
  }
  finishCFU(result) {
    if (result["status"] == true)
    {
      var url = {}
      url['2.13.1'] = this.passUrl;
      url['2.13.2'] = result['urls'];
      console.log("urllll", url)
      var current2 = [];
      current2 = JSON.parse(window.localStorage.getItem("currentJson2"));
      var index = current2["children"].findIndex(
        item => item.source == "module 2.13");
      current2["children"][index].url = JSON.stringify(url);

      window.localStorage.setItem("currentJson2", JSON.stringify(current2));
      window.localStorage.setItem('mainFlagModule2', '14');
      window.localStorage.setItem('subFlagModule2', '1');
      window.localStorage.setItem('source', 'module 2.14');
      this.Module2Service.setLocalStorage2(14);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.subMenu2-13'), "next": this.translate.instant('L2Module2.subMenu2-14'), "nextRoute": "/modules/module2/Module2.14" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start')
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 3.8', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "moduletwosingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true
            this.passUrl = data['data'].url;

            // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson1'))
            // var index1 = dummylocal.children.findIndex(item =>
            //   item.source == "module 3.8");
            // dummylocal.children[index1].url = this.passUrl
            // window.localStorage.setItem('currentJson1', JSON.stringify(dummylocal))

          } if (fun == 'finish1')
          {
            this.instructionModal.hide()
            this.showVideoFlag = false
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.subFlagModule2 = this.subFlagModule2 + 1
            window.localStorage.setItem('subFlagModule2', this.subFlagModule2.toString())
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
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2)
    {
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
    // this.subFlagModule1++;
    // window.localStorage.setItem('subFlagModule2', this.subFlagModule1.toString());
  }
}
