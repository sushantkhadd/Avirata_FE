import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { Router } from "@angular/router";
import { CommonComponentService } from "../common-component.service";
import YouTubePlayer from 'youtube-player';
import { ModalDirective } from "ngx-bootstrap";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
let player;
@Component({
  selector: 'app-static-video',
  templateUrl: './static-video.component.html'
})
export class StaticVideoComponent implements OnInit {
  public start;
  public playerReady = false;
  public ismuted = false;
  @Input() public inputData;
  @Output() public finishCall = new EventEmitter<Boolean>();
  @ViewChild('staticVideoFinishModal') public staticVideoFinishModal: ModalDirective;
  @ViewChild('fakeModal') public fakeModal: ModalDirective;
  @Input() public receivedData;
  public videoUrl;
  constructor(private sanitizer: DomSanitizer, public LocalstoragedetailsService: LocalstoragedetailsService, public router: Router, public CommonComponentService: CommonComponentService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService,public LanguageService :LanguageService) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    console.log("Receive:: ", this.receivedData)
    player = YouTubePlayer('ytplayer', {
      videoId: "",
      playerVars: { 'autoplay': 0, 'rel': 0, 'controls': 0, 'modestbranding': 1, 'iv_load_policy': 3, 'disablekb': 1 }
    });
  }
  ngOnChanges() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.receivedData.videoUrl);
  }
  ngAfterViewInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.receivedData.videoUrl);
    player.loadVideoById(this.receivedData.videoUrl);
    this.playerReady = true;
  }
  play() {
    if (this.start == true) {
      player.playVideo().then(() => {
        var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.remove('show');
        console.log("PLAY EVENT");
      });

    }
    else {
      player.pauseVideo().then(() => {
        var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.add('show');
        console.log("PAUSE EVENT");
      });
    }
  }
  ngDoCheck() {
    // if (this.receivedData.status == true) {
    if (this.playerReady == true) {
      player.on('stateChange', (event) => {
        if (event.data == 1) {
          this.start = false;
          var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.remove('show');
        }
        if (event.data == 2) {
          this.start = true;
          var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.add('show');
        }
        if (event.data === 0) {
          if (window.localStorage.getItem('mainFlagModule1') == '1' || window.localStorage.getItem('mainFlagModule1') == '5' || window.localStorage.getItem('mainFlagModule1') == '11' || 
          window.localStorage.getItem('mainFlagModule1') == '13' || window.localStorage.getItem('mainFlagModule2') == '1' || window.localStorage.getItem('mainFlagModule2') == '10'  || window.localStorage.getItem('mainFlagModule2') == '4' || window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule2') == '13' || window.localStorage.getItem('mainFlagModule2') == '15' || window.localStorage.getItem('mainFlagModule3') == '1' || window.localStorage.getItem('mainFlagModule3') == '4' || window.localStorage.getItem('mainFlagModule3') == '13' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '16' || window.localStorage.getItem('mainFlagModule4') == '6' || window.localStorage.getItem('mainFlagModule4') == '13' || window.localStorage.getItem('mainFlagModule4') == '1' || window.localStorage.getItem('mainFlagModule4') == '9' || window.localStorage.getItem('mainFlagModule5') == '1' ||
          window.localStorage.getItem('mainFlagModule5') == '6' ||
          window.localStorage.getItem('mainFlagModule5') == '15' ||
          window.localStorage.getItem('mainFlagModule5') == '17' ||
          window.localStorage.getItem('mainFlagModule5') == '19' || window.localStorage.getItem('mainFlagModule5') == '24' || window.localStorage.getItem('mainFlagModule0') == '1' || window.localStorage.getItem('mainFlagModule0') == '2') {
            this.finishCall.emit(true)
          }
          if (
            window.localStorage.getItem('mainFlagModule0') == '1' || window.localStorage.getItem('mainFlagModule0') == '2' || window.localStorage.getItem('mainFlagModule0') == '3' || window.localStorage.getItem('mainFlagModule0') == '4' || window.localStorage.getItem('mainFlagModule0') == '5' || 
            window.localStorage.getItem('mainFlagModule0') == '6' || 
            window.localStorage.getItem('mainFlagModule0') == '7' || 
            window.localStorage.getItem('mainFlagModule0') == '8' || 
            window.localStorage.getItem('mainFlagModule0') == '11'|| 
            window.localStorage.getItem('mainFlagModule0') == '12'|| 
            window.localStorage.getItem('mainFlagModule0') == '13'|| 
            window.localStorage.getItem('mainFlagModule0') == '14'|| 
            window.localStorage.getItem('mainFlagModule0') == '15'|| 
            window.localStorage.getItem('mainFlagModule0') == '16'|| 
            window.localStorage.getItem('mainFlagModule0') == '17'|| 
            window.localStorage.getItem('mainFlagModule0') == '18'|| 
            window.localStorage.getItem('mainFlagModule0') == '19'|| 
            window.localStorage.getItem('mainFlagModule0') == '20'|| 
            window.localStorage.getItem('mainFlagModule0') == '21'|| 
            window.localStorage.getItem('mainFlagModule0') == '22'|| 
            window.localStorage.getItem('mainFlagModule0') == '23'|| 
            window.localStorage.getItem('mainFlagModule0') == '24'|| 
            window.localStorage.getItem('mainFlagModule0') == '25'|| 
            window.localStorage.getItem('mainFlagModule0') == '29'
          )
          {
            this.finishCall.emit(true);
          }
          this.start = true;
          if (this.receivedData.status){
            this.staticVideoFinishModal.show();
            this.LanguageService.toShow();
          }
          if (this.receivedData.throwEmmit) {
            this.finishCall.emit(true)
          }
          var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.add('show');
        }
      });
      // }
    }
  }

  stop() {
    player.stopVideo()
      .then(() => {
        console.log("STOP EVENT");
      });
  }

  volume() {

    if (this.ismuted == true) {
      player.isMuted().then(() => {
        player.unMute();
        this.ismuted = false;

      });
    }
    else {
      player.mute();
      this.ismuted = true;

    }
  }

  videoFinish() {

    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    if (window.localStorage.getItem('mainFlagModule1')) {
      if (window.localStorage.getItem('mainFlagModule1') == '1' || window.localStorage.getItem('mainFlagModule1') == '5' || window.localStorage.getItem('mainFlagModule1') == '11' || window.localStorage.getItem('mainFlagModule1') == '13' || window.localStorage.getItem('mainFlagModule2') == '1' || window.localStorage.getItem('mainFlagModule2') == '10' || window.localStorage.getItem('mainFlagModule2') == '4' || window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule2') == '13' ||  window.localStorage.getItem('mainFlagModule3') == '1' || window.localStorage.getItem('mainFlagModule3') == '4' || window.localStorage.getItem('mainFlagModule3') == '9'  || window.localStorage.getItem('mainFlagModule3') == '13' || window.localStorage.getItem('mainFlagModule3') == '1' || window.localStorage.getItem('mainFlagModule3') == '16' || window.localStorage.getItem('mainFlagModule4') == '6' || window.localStorage.getItem('mainFlagModule4') == '13' || window.localStorage.getItem('mainFlagModule4') == '1' ||  window.localStorage.getItem('mainFlagModule4') == '9' || window.localStorage.getItem('mainFlagModule5') == '1' || window.localStorage.getItem('mainFlagModule5') == '6' || window.localStorage.getItem('mainFlagModule5') == '15' || window.localStorage.getItem('mainFlagModule5') == '19' || window.localStorage.getItem('mainFlagModule5') == '24' || window.localStorage.getItem('mainFlagModule0') == '1' || window.localStorage.getItem('mainFlagModule0') == '2')
        jsonBody['event'] = 'finish';
    }
    var apiUrl = this.receivedData.apiUrl;

    this.CommonComponentService.submoduleFinish(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (data['status'] == true) {
          window.localStorage.setItem('uuid', data['data'].nextuuid)
          this.receivedData.status = false;
          this.staticVideoFinishModal.hide();
          // this.LanguageService.toHide();
          // //backdrop remove
          // var paras = document.getElementsByClassName("modal-backdrop")[0];
          // if (paras.classList.contains("fade")) {
          //   console.log("true");
          //   paras.classList.remove("show");
          // }
          //backdrop remove
          this.finishCall.emit(true);
        }
        else if (data['status'] == false) {
          if (data['message'] == 'token not found') {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          }
          else if (data['message'] == 'token not matches please re-login') {
            this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          }
          else if (data['message'] == 'required submoduleid key') {
            this.toastr.error(this.translate.instant('Errors.requiredSubmoduleKey'));
            this.finishCall.emit(false);
          }
          else if (data['message'] == 'not null submoduleid field') {
            this.toastr.error(this.translate.instant('Errors.requiredSubmoduleField'));
            this.finishCall.emit(false);
          }
          else if (data['message'] == 'wrong submodule id') {
            this.toastr.error(this.translate.instant('Errors.requiredSubmoduleId'));
            this.finishCall.emit(false);
          }
          else if (data['message'] == 'complete previous module first') {
            this.toastr.error(this.translate.instant('Errors.completePrevModuleFirst'));
            this.finishCall.emit(false);
          }
        }
      },
      error => {
        //handle status code here
        if (error.error.message == 'token not found') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        }
        else if (error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        }
        else if (error.error.message == 'required submoduleid key') {
          this.toastr.error(this.translate.instant('Errors.requiredSubmoduleKey'));
          this.finishCall.emit(false);
        }
        else if (error.error.message == 'not null submoduleid field') {
          this.toastr.error(this.translate.instant('Errors.requiredSubmoduleField'));
          this.finishCall.emit(false);
        }
        else if (error.error.message == 'wrong submodule id') {
          this.toastr.error(this.translate.instant('Errors.wrongSubmoduleId'));
          this.finishCall.emit(false);
        }
        else if (error.error.message == 'complete previous module first') {
          this.finishCall.emit(false);
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });
  }

  fakeModalHide(){
    this.fakeModal.hide()
    // this.LanguageService.toHide()
  }
}
