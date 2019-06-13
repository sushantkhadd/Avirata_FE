import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import YouTubePlayer from 'youtube-player';
import { ModalDirective } from "ngx-bootstrap";
import { CommonComponentService } from "../common-component.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { LanguageService } from 'src/app/language.service';
import { DxRadioGroupComponent } from 'devextreme-angular'

declare var jQuery: any;
let player;
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnInit {
  public start; msgFlag;
  public playerReady = false;
  public options = [];
  public question;
  public ismuted = false; selectedAnswer; submitDisabled;
  public optionsArray; rightanswer;
  @Input() public inputData;
  @Output() public finishCall = new EventEmitter<any>();
  @Output() public module5Emit = new EventEmitter<any>();
  @Output() public singleCFUCompleteStatus = new EventEmitter<Boolean>();
  @Output() public finishCallwithVideoUrl = new EventEmitter<Object>();
  @ViewChild("eventRadioGroup") eventRadioGroup: DxRadioGroupComponent;
  @ViewChild('cfuModal') public cfuModal: ModalDirective;
  @ViewChild('toasterPopupModal') public toasterPopupModal: ModalDirective;
  @ViewChild('askMeModal') public askMeModal: ModalDirective;

  public result = {}; module1_10Url;vUrl;imgUrl
  public ansOptionForModule2_9; ansValueForModule2_9; viewCorrectAnswer = false;

  fiftyFiftyFlag; askMeFlag; levelData; hideMe; strikeFlag; selectedValue;

  imageJson = {
    f1: "../../../assets/img/rewards/50-50.png",
    f2: "../../../assets/img/rewards/50-50 - done.png",
    a1: "../../../assets/img/rewards/ask mitra.png",
    a2: "../../../assets/img/rewards/ask mitra - done.png"
  };
  rewardImgUrl1;
  rewardImgUrl2;
  rewardsOptions = [];
  constructor(private CommonComponentService: CommonComponentService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public CommonService: CommonService, public LanguageService: LanguageService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.selectedValue = "";
    this.viewCorrectAnswer = false;
    this.submitDisabled = false;
    player = YouTubePlayer('ytplayer', {
      videoId: "",
      // 'disablekb': 1
      playerVars: { 'autoplay': 0, 'rel': 0, 'controls': 0, 'modestbranding': 1, 'iv_load_policy': 3, 'disablekb': 1 }
    });

    var jsonBody = {};
    var sendAnswer = ''
    this.callService(sendAnswer, 'start');

    this.levelData = JSON.parse(localStorage.getItem("levelData"));
    console.log(this.levelData);
  }

  getRewards(event) {
    var jsonBody = {};
    var apiUrl = "helpline/";
    jsonBody["submoduleid"] = window.localStorage.getItem('uuid');
    jsonBody["module"] = window.localStorage.getItem("currentstatus");
    jsonBody["event"] = event;
    this.CommonComponentService.submoduleFinish(jsonBody, apiUrl).subscribe(
      data => {
        if (data["message"] == "event is done") {
          if (event == "fifty_fifty") {
            this.resetRadio();
            this.rewardImgUrl1 = this.imageJson["f2"];
            this.options = [];
            for (let i = 0; i < this.optionsArray.length; i++)
            {
              if (this.optionsArray[i].option != this.rightanswer)
              {
                var randomOption = this.optionsArray[i].value;
              }
              if (this.optionsArray[i].option == this.rightanswer)
              {
                // var randomOption2 = this.optionsArray[i].value;
                this.options.push(this.optionsArray[i].value)
              }
              // let rewardObj = {};
              // rewardObj['1'] = randomOption;
              // rewardObj["2"] = randomOption2;

              // if (rewardObj["1"] != this.optionsArray[i].value) {
              //   this.strikeFlag = true;
              //   console.log("rewardObj[1]",rewardObj,this.strikeFlag);
              // } else
              // {
              //   jQuery(".instructionModal .card-block.mcqBlock .dx-item-content")
              //     .addClass("strikeThrough")
              //   this.strikeFlag = false;
              //   break;
              //   console.log("rewardObj[1], else", rewardObj, this.strikeFlag);
              // }

              // if (rewardObj["2"] != this.optionsArray[i].value)
              // {
              //   this.strikeFlag = true;
              //   console.log("rewardObj[2]", rewardObj, this.strikeFlag);
              // } else
              // {
              //   jQuery(".instructionModal .card-block.mcqBlock .dx-item-content")
              //   .addClass("strikeThrough")
              //   this.strikeFlag = false;
              //   break;
              //   console.log("rewardObj[2] else", rewardObj, this.strikeFlag);
              // }

              // console.log(rewardObj)
            }
            this.options.push(randomOption);
            console.log(this.optionsArray, this.options, this.rightanswer, randomOption, this.strikeFlag)
            this.levelData = localStorage.getItem("levelData");
          for (let index = 0; index < this.levelData.length; index++)
          {
            if(parseInt(window.localStorage.getItem("currentstatus")) == index){
              let current1 = [];
              current1 = JSON.parse(window.localStorage.getItem("levelData"));
              let index1 = current1.findIndex(
                item => item.module == index);
              current1[index1].fifty_fifty = true;
              window.localStorage.setItem("levelData", JSON.stringify(current1));
              console.log(current1,"fifirty")
            }

          }
          } else if (event == "askme")
          {
            this.askMeModal.hide();
            if (!this.fiftyFiftyFlag)
            {
              this.hideMe = true;
            } else
             {
               this.hideMe = false;
             }
            this.rewardImgUrl2 = this.imageJson["a2"];
            this.options = [];
            for (let i = 0; i < this.optionsArray.length; i++) {
              if (this.optionsArray[i].option == this.rightanswer)
              {
                this.options.push(this.optionsArray[i].value);
                this.selectedValue = this.optionsArray[i].value;
              }
            }
            console.log(this.optionsArray, this.options,this.rightanswer)
            this.levelData = localStorage.getItem("levelData");
            for (let index = 0; index < this.levelData.length; index++)
            {
              if(parseInt(window.localStorage.getItem("currentstatus")) == index){
              let current1 = [];
              current1 = JSON.parse(window.localStorage.getItem("levelData"));
              let index1 = current1.findIndex(
                item => item.module == index);
                current1[index1].askme = true;
              window.localStorage.setItem("levelData", JSON.stringify(current1));
              console.log(current1, "askme")
            }
          }
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
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
  ngAfterViewInit() {
  }
  ngDoCheck() {
    if (
      localStorage.getItem("levelData") != null &&
      localStorage.getItem("levelData") != "" &&
      localStorage.getItem("levelData") != undefined
    )
    {
      this.levelData = JSON.parse(localStorage.getItem("levelData"));
      for (let index = 0; index < this.levelData.length; index++)
      {
        const element = this.levelData[index];
        if (
          (this.levelData[index].module == "0" && this.levelData[index].status == true) ||
          (this.levelData[index].module == "1" && this.levelData[index].status == true) ||
          (this.levelData[index].module == "2" && this.levelData[index].status == true) ||
          (this.levelData[index].module == "3" && this.levelData[index].status == true) ||
          (this.levelData[index].module == "4" && this.levelData[index].status == true) ||
          (this.levelData[index].module == "5" && this.levelData[index].status == true)
        )
        {
          this.askMeFlag = this.levelData[index].askme;
          this.fiftyFiftyFlag = this.levelData[index].fifty_fifty;
          if (this.askMeFlag == true)
          {
            this.rewardImgUrl2 = this.imageJson["a2"];
          } else
          {
            this.rewardImgUrl2 = this.imageJson["a1"];
          }

          if (this.fiftyFiftyFlag == true)
          {
            this.rewardImgUrl1 = this.imageJson["f2"];
          } else
          {
            this.rewardImgUrl1 = this.imageJson["f1"];
          }
        }
      }
    }

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
          this.start = true;
          var thumb = document.querySelector('.static-thumbnail .img-fluid').classList.add('show');
          this.cfuModal.show();
          if (this.options.length == 1 && !this.fiftyFiftyFlag) {
            this.hideMe = true;
          } else {
            this.hideMe = false;
          }
        }
      });
    }
  }

  stop() {
    player
      .stopVideo()
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
  //method for option select
  onValueChanged($event) {

    this.selectedAnswer = $event.value;
    this.submitDisabled = true;
    if ($event.value) {
      this.viewCorrectAnswer = false;
    }
  }

  submitAnswer() {
    //----again call same api with answer key event
    var sendAnswer;

    this.optionsArray.forEach(element => {
      if (element.value == this.selectedAnswer) {
        sendAnswer = element.option;
      }
    });

    this.callService(sendAnswer, 'answer');
    this.cfuModal.hide();
  }

  callService(answer, event) {
    var jsonBody = {};
    jsonBody['currentsubmoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useroption'] = answer;
    jsonBody['event'] = event;
    this.CommonComponentService.submoduleFinish(jsonBody, this.inputData.apiUrl)
      .subscribe(
      data => {
        if(window.localStorage.getItem("mainFlagModule1") == "4" && window.localStorage.getItem("subFlagModule1") == "3"){
          this.vUrl=data['data'].parenturl;
        console.log("qadddddddddd",this.vUrl)
        }
        else{
          this.vUrl=data['data'].nexturl;
        console.log("adat",data)
        }
        // this.vUrl=data['data'].nexturl;
          // this.rightanswer = data["data"].rightanswer;
          if (data["data"].rightanswer != null && data["data"].rightanswer != "" && data["data"].rightanswer != undefined)
          {
            this.rightanswer = this.LanguageService.get('aesEncryptionKey', data["data"].rightanswer)
            console.log("rightanswer", this.rightanswer);
          }

        this.selectedAnswer = "";
        if (data['message'] == 'wrong answer') {
          this.eventRadioGroup.instance.option("value", '');

          this.msgFlag = false
          this.toasterPopupModal.show();
          if(window.localStorage.getItem("mainFlagModule2") == "2" && window.localStorage.getItem("subFlagModule2") == "3"){
            console.log("not shuffle")
          }
          else{
            this.shuffle(this.options);
          }
          this.submitDisabled = false;
          setTimeout(() => {
            this.toasterPopupModal.hide();
            setTimeout(() => {
              console.log("timeout")
              this.play();
            }, 200);
          }, 2000)

        } else if (data['message'] == 'submodule finish next uuid is' || data['message'] == 'submodule finish') {

          window.localStorage.setItem('uuid', data['data'].nextuuid)
          this.result['success'] = true;
          if(window.localStorage.getItem("mainFlagModule1") == "3" && window.localStorage.getItem("subFlagModule1") == "1" && window.localStorage.getItem("subFlagModule5") == "1"){
            console.log("b part")
            this.vUrl=data['data'].parenturl;
            this.msgFlag = true
            this.toasterPopupModal.show()
            // window.localStorage.setItem('subFlagModule1', "2")
            var pass = {};
            pass["status"] = true;
            pass["url"] = data["data"].parenturl;
            setTimeout(() => {
              this.toasterPopupModal.hide()
              // this.singleCFUCompleteStatus.emit(true);
              setTimeout(() => {
                console.log("timeout")
                this.finishCall.emit(pass);
              this.play();
              }, 2000);
            }, 4000)
          }
          else if (
            window.localStorage.getItem("mainFlagModule2") == "3" || window.localStorage.getItem("mainFlagModule2") == "11" || window.localStorage.getItem("mainFlagModule2") == "13" || window.localStorage.getItem("mainFlagModule2") == "15" || window.localStorage.getItem("mainFlagModule2") == "17" || window.localStorage.getItem("mainFlagModule3") == "2" || window.localStorage.getItem("mainFlagModule3") == "6" ||  window.localStorage.getItem("mainFlagModule3") == "8" || window.localStorage.getItem("mainFlagModule3") == "10" || window.localStorage.getItem("mainFlagModule4") == "6") {
            console.log("aa1");
            var result = {};
            result["status"] = true;
            result["urls"] = data['data'].parenturl;
            console.log("result",result)
            this.finishCall.emit(result);
          } else if (
            window.localStorage.getItem("mainFlagModule1") == "10" ||
            window.localStorage.getItem("mainFlagModule4") == "6"
          ) {
            console.log("aa2", this.module1_10Url);
            var result = {};
            result["status"] = true;
            result["urls"] = this.module1_10Url;
            this.finishCall.emit(result);
          } else if (
            // window.localStorage.getItem("mainFlagModule5") == "6" ||
            window.localStorage.getItem("mainFlagModule5") == "7" ||
            window.localStorage.getItem("mainFlagModule5") == "9" ||
            window.localStorage.getItem("mainFlagModule5") == "11"
          ) {
            console.log("aa3");
            console.log("mod5 ", data['data']);
            this.toastr.success(
              this.translate.instant("Errors.rightAns")
            );
            console.log("mod5 ", data['data']);
            var pass = {};
            pass["status"] = true;
            pass["url"] = data['data'].parenturl;

            // this.module5Emit.emit(data.data)
            setTimeout(() => {
              this.finishCall.emit(pass);
              // this.module5Emit.emit(data.data)
            }, 3000);
          } else {
            console.log("aa4");
            var pass = {};
            pass["status"] = true;
            pass["url"] = data['data'].parenturl;
            this.finishCall.emit(pass);
          }
        } else {
          if (data['message'] == 'your answer is correct') {

            this.msgFlag = true
            this.toasterPopupModal.show()

            setTimeout(() => {
              this.toasterPopupModal.hide()
              setTimeout(() => {
                console.log("timeout")
                this.singleCFUCompleteStatus.emit(true);
              }, 2000);
            }, 4000)
          }
          else if (data['message'] == 'your answer stored') {
            setTimeout(() => {
              this.singleCFUCompleteStatus.emit(true);
            }, 6000)
          }
          this.optionsArray = {};
          this.options = [];
          this.question = data['data'].question;
          data['data'].options.forEach(element => {
            this.options.push(element.value);
          });

          //---PLAYER
          this.optionsArray = data['data'].options;

          window.localStorage.setItem('uuid', data['data'].nextuuid)

          if ((window.localStorage.getItem('mainFlagModule1') == '10') || window.localStorage.getItem('mainFlagModule4') == '6') {
            this.module1_10Url = data['data'].nexturl;
            console.log("vbbbbbbbbbb",this.module1_10Url)
          } else if ((parseInt(window.localStorage.getItem('mainFlagModule2')) >= 2) || (parseInt(window.localStorage.getItem('mainFlagModule2')) <= 8)) {

            this.module1_10Url = data['data'].nexturl;
          } else if ((parseInt(window.localStorage.getItem('mainFlagModule2')) >= 10) || (parseInt(window.localStorage.getItem('mainFlagModule2')) <= 14) || window.localStorage.getItem('mainFlagModule4') == '6') {

            this.module1_10Url = data['data'].nexturl;
          }
          this.start = true;
          this.playerReady = true;
          player.loadVideoById(data['data'].nexturl);
          if (window.localStorage.getItem('mainFlagModule1') == '9') {
            this.ansOptionForModule2_9 = data['data'].answer;
            data['data'].options.forEach(element => {
              if (element.option == this.ansOptionForModule2_9) {
                this.ansValueForModule2_9 = element.value;
              }
            });
          }
        }
        this.eventRadioGroup.instance.option("value", '');
        this.submitDisabled = false;
      },
      error => {
        if (error.error.message == 'token not found') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 6000)
        }
        else if (error.error.message == 'Token not matches please re-login' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 6000)
        } else if (error.error.message == 'required currentsubmoduleid key') {
          this.toastr.error(this.translate.instant('Errors.requiredSubmoduleKey'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)

        } else if (error.error.message == 'required useroption key') {
          this.toastr.error(this.translate.instant('Errors.requiredUseroptionKey'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)

        } else if (error.error.message == 'required event key') {
          this.toastr.error(this.translate.instant('Errors.userEventKeyReq'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)
        } else if (error.error.message == 'wrong nextsubmodule id' || error.error.message == 'wrong submodule id') {

          this.toastr.error(this.translate.instant('Errors.requiredSubmoduleId'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)

        } else if (error.error.message == 'previous submodule not completed') {

          this.toastr.error(this.translate.instant('Errors.completePreviousModule'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)
        } else if (error.error.message == 'wrong answer') {

          this.toastr.error(this.translate.instant('Errors.wrongAns'));
          setTimeout(() => {
            this.play();
          }, 6000)

        } else if (error.error.message == 'submodule not started') {

          this.toastr.error(this.translate.instant('Errors.moduleNotStarted'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)

        } else if (error.error.message == 'event must be finish') {

          this.toastr.error(this.translate.instant('Errors.eventMustFinish'));
          setTimeout(() => {
            this.result['success'] = false;
            this.finishCall.emit(false);
          }, 6000)
        } else if (error.error.message == 'access denied') {
          this.result['success'] = false;
          this.finishCall.emit(false);
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 6000)
        }
        else if (error.error.message == 'invalid option') {
          this.result['success'] = false;
          this.finishCall.emit(false);
        }
        else if (error.error.message == 'invalid event') {
          this.result['success'] = false;
          this.finishCall.emit(false);
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
        this.eventRadioGroup.instance.option("value", '');
        this.submitDisabled = false;
      });
    //Catch Error if server is not Found

  }
  resetRadio() {
    this.eventRadioGroup.instance.option("value", '');
    this.submitDisabled = false;
  }
  shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }

  showToasterPopup() {
    this.toasterPopupModal.show();
    setTimeout(() => {
      this.toasterPopupModal.hide();
    }, 3000);
  }

  closeToasterPopup() {
    this.toasterPopupModal.hide();
  }
}
