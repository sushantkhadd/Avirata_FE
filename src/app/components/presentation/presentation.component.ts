import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { CommonComponentService } from "../common-component.service";
import { CommonService } from "../../services/common.service";
import { Router } from "@angular/router";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from '@ngx-translate/core';
declare var JQuery: any;
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DomSanitizerPipe } from 'src/app/shared/pipes/dom-sanitizer.pipe';
import { LanguageService } from 'src/app/language.service';
import { DxRadioGroupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  host: {
    '(document:keydown)': 'chaneSlide($event)'
  },
  providers: [DomSanitizerPipe]
})
export class PresentationComponent implements OnInit {
  private myWidth: any = 'auto';
  private myHeight: any = 'auto';
  private toggled: boolean = false; audioSrc = {};
  public countForModule2 = 0; msgFlag; isLoaded;
  @Input() public data;
  @Input() public question1;
  @Output() public sendCfuAns = new EventEmitter<Object>();
  @ViewChild('cfuModal') public cfuModal: ModalDirective; //To Open/Close Modal from Typescript
  @ViewChild("eventRadioGroup") eventRadioGroup: DxRadioGroupComponent;
  @ViewChild('toasterPopupModal') public toasterPopupModal: ModalDirective;
  @ViewChild('audioModal') public audioModal: ModalDirective;
  @ViewChild('askMeModal') public askMeModal: ModalDirective;

  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  @Output() public showDoc = new EventEmitter<string>();
  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public count = 1; finalCount; page; pdfURL;totalPages;
  public imgUrl; downloadLink; download; newUrl; nextParentUrl;
  public showCFU; buttonShowFlag; question; selectedAnswer; submitDisabled; apiUrl;
  public questionSet = {}; options = []; showFinish; optionsStateDyanamic;
  @Output() public ansCorrect = new EventEmitter();  //For interest Video 5.6 to send result success

  subFlagModule5;
  fiftyFiftyFlag; askMeFlag; levelData; rightanswer;

  imageJson = {
    f1: "../../../assets/img/rewards/50-50.png",
    f2: "../../../assets/img/rewards/50-50 - done.png",
    a1: "../../../assets/img/rewards/ask mitra.png",
    a2: "../../../assets/img/rewards/ask mitra - done.png"
  };
  rewardImgUrl1;
  rewardImgUrl2; selectedValue;
  rewardsOptions = []; hideMe;

  constructor(public _eleRef: ElementRef, public CommonService: CommonService, public CommonComponentService: CommonComponentService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, private sanitizer: DomSanitizer, public domSanitizer: DomSanitizerPipe, public LanguageService: LanguageService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  getRewards(event) {
    var jsonBody = {};
    var apiUrl = "helpline/";
    jsonBody["submoduleid"] = window.localStorage.getItem('uuid');
    jsonBody["module"] = window.localStorage.getItem("currentModule");
    jsonBody["event"] = event;
    this.CommonComponentService.submoduleFinish(jsonBody, apiUrl).subscribe(
      data => {
        if (data["message"] == "event is done")
        {
          if (event == "fifty_fifty")
          {
            this.rewardImgUrl1 = this.imageJson["f2"];
            this.options = [];
            for (let i = 0; i < this.optionsStateDyanamic.length; i++)
            {
              if (this.optionsStateDyanamic[i].option != this.rightanswer)
              {
                var randomOption = this.optionsStateDyanamic[i].value;
              }
              if (this.optionsStateDyanamic[i].option == this.rightanswer)
              {
                this.options.push(this.optionsStateDyanamic[i].value)
              }
            }
            this.options.push(randomOption);
            console.log(this.optionsStateDyanamic, this.options, this.rightanswer, randomOption)
            for (let index = 0; index < this.levelData.length; index++)
            {
              let current1 = [];
              current1 = JSON.parse(window.localStorage.getItem("levelData"));
              let index1 = current1.findIndex(
                item => item.module == index);
              current1[index1].fifty_fifty = true;
              window.localStorage.setItem("levelData", JSON.stringify(current1));
              console.log(current1, "fifirty")
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
            for (let i = 0; i < this.optionsStateDyanamic.length; i++)
            {
              if (this.optionsStateDyanamic[i].option == this.rightanswer)
              {
                this.options.push(this.optionsStateDyanamic[i].value);
                this.selectedValue = this.optionsStateDyanamic[i].value;
              }
            }
            console.log(this.optionsStateDyanamic, this.options, this.rightanswer)

            for (let index = 0; index < this.levelData.length; index++)
            {
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
      },
      error => {
          this.LanguageService.handleError(error.error.message);
      }
    );
  }

  showCfuModal() {
    this.cfuModal.show();
    if (this.options.length == 1)
    {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].option == this.rightanswer) {
          this.selectedValue = this.options[i].value;
        }
      }
    }
    console.log(this.options.length,this.options)
  }


  ngDoCheck() {

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

    if (this.showCFU == true) {
    }
    else {
      if (parseInt(window.localStorage.getItem('mainFlagModule2')) == 1) {
        if (this.count == this.finalCount) {
          this.showFinish = true;
        } else {
          this.showFinish = false
        }
      }
      else if (this.finalCount == 1) {

        if ((window.localStorage.getItem('mainFlagModule5')) == '4')
        {
          this.showFinish = true;
        } else
        {
          this.showFinish = false;
          this.buttonShowFlag = false;
        }
      }
      else if (parseInt(window.localStorage.getItem('mainFlagModule2')) != 1) {
        if (this.count == this.finalCount) {
          this.showFinish = true;
        } else {
          this.showFinish = false
        }
      }
    }
  }
  chaneSlide(e) {
    if (e.keyCode == 37) {
      this.back();
    } else if (e.keyCode == 39) {
      this.next();
    }
  }

  ngOnInit() {
    this.isLoaded = true;
    this.selectedValue = "";
    setTimeout(() => {
      this.isLoaded = false;
    }, 4000);
    console.log("data",this.data,'count init',this.count)
    this.count = 1;
    this.showFinish = false;
    this.submitDisabled = false;
    this.buttonShowFlag = false;
    this.imgUrl = this.data.url;
    this.subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));

    if (window.localStorage.getItem('mainFlagModule2') == '1') {
      if (window.localStorage.getItem('subFlagModule2') == '1') {
        this.countForModule2 = 0;
      } else if (window.localStorage.getItem('subFlagModule2') == '2') {
        this.countForModule2 = 1;
      } else if (window.localStorage.getItem('subFlagModule2') == '3') {
        this.countForModule2 = 2;
      } else if (window.localStorage.getItem('subFlagModule2') == '4') {
        this.countForModule2 = 3;
      } else if (window.localStorage.getItem('subFlagModule2') == '5') {
        this.countForModule2 = 4;
      } else if (window.localStorage.getItem('subFlagModule2') == '6') {
        this.countForModule2 = 5;
      }
      this.newUrl = this.data.url + this.countForModule2.toString() + this.count + ".jpg";
    } else {
      this.newUrl = this.data.url + this.count + ".jpg";
    }

    this.downloadLink = this.data.url;
    this.download = this.data.download;
    this.showCFU = this.data.showcfu;
    this.apiUrl = this.data.apiurl;
    this.page = 1;
    this.count = this.page;

    this.pdfURL = this.data.url;

    this.showCFU = this.data.showcfu;
    console.log("fdgdfxa", this.showCFU, this.data.state, this.pdfURL)
    if (this.showCFU == true) {
      //change------------
      if (this.data.state == 'static') {

        this.question = this.data.cfuQuestion;
        this.data.cfuOption.forEach(element => {
          this.options.push(element.option);
        });
      }
      else if (this.data.state == 'dyanamic') {
        var jsonBody = {};
        console.log("mailnflag",window.localStorage.getItem('mainFlagModule4'))
        if (
          window.localStorage.getItem("mainFlagModule2") == "15" ||
          window.localStorage.getItem("mainFlagModule3") == "14" ||
          window.localStorage.getItem("mainFlagModule3") == "15" ||
          window.localStorage.getItem("mainFlagModule3") == "16" ||
          window.localStorage.getItem("mainFlagModule4") == "13" ||
          window.localStorage.getItem("mainFlagModule5") == "2" ||
          window.localStorage.getItem("mainFlagModule5") == "3" ||
          window.localStorage.getItem("mainFlagModule5") == "4" ||
          window.localStorage.getItem("mainFlagModule5") == "5"
        ) {
          jsonBody["currentsubmoduleid"] = window.localStorage.getItem(
            "uuid"
          );
          jsonBody["useroption"] = "";
          jsonBody["event"] = "start";
          console.log(
            "mailnflag",
            window.localStorage.getItem("mainFlagModule4")
          );
        } else {
          jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
          if (window.localStorage.getItem("mainFlagModule2") == "1") {
            jsonBody["useranswer"] = "";
            jsonBody["event"] = "start";
            jsonBody["review"] = "";
          }
        }

        this.apiUrl = this.data.apiurl;
        if (
          window.localStorage.getItem("mainFlagModule2") == "15" ||
          window.localStorage.getItem("mainFlagModule3") == "14" ||
          window.localStorage.getItem("mainFlagModule3") == "15" ||
          window.localStorage.getItem("mainFlagModule3") == "16" ||
          window.localStorage.getItem("mainFlagModule4") == "13" ||
          window.localStorage.getItem("mainFlagModule5") == "2" ||
          window.localStorage.getItem("mainFlagModule5") == "3" ||
          window.localStorage.getItem("mainFlagModule5") == "4" ||
          window.localStorage.getItem("mainFlagModule5") == "5"
        ) {
          console.log("ma ", this.mainFlagModule5);
          this.CommonComponentService.submoduleFinish(
            jsonBody,
            this.apiUrl
          ).subscribe(
            data => {
              if (
                data["data"].rightanswer != null &&
                data["data"].rightanswer != "" &&
                data["data"].rightanswer != undefined
              ) {
                this.rightanswer = this.LanguageService.get(
                  "aesEncryptionKey",
                  data["data"].rightanswer
                );
                console.log("rightanswer", this.rightanswer);
              }
              if (data["status"] == true) {
                if (
                  window.localStorage.getItem("mainFlagModule2") == "1"
                ) {
                  if (
                    window.localStorage.getItem("subFlagModule2") == "1"
                  ) {
                    this.countForModule2 = 0;
                  } else if (
                    window.localStorage.getItem("subFlagModule2") == "2"
                  ) {
                    this.countForModule2 = 1;
                  } else if (
                    window.localStorage.getItem("subFlagModule2") == "3"
                  ) {
                    this.countForModule2 = 2;
                  } else if (
                    window.localStorage.getItem("subFlagModule2") == "4"
                  ) {
                    this.countForModule2 = 3;
                  } else if (
                    window.localStorage.getItem("subFlagModule2") == "5"
                  ) {
                    this.countForModule2 = 4;
                  } else if (
                    window.localStorage.getItem("subFlagModule2") == "6"
                  ) {
                    this.countForModule2 = 5;
                  }
                  this.pdfURL = data["data"].url;
                  this.newUrl =
                    this.imgUrl +
                    this.countForModule2.toString() +
                    this.count +
                    ".jpg";
                } else {
                  if (
                    window.localStorage.getItem("mainFlagModule2") ==
                      "15" ||
                    window.localStorage.getItem("mainFlagModule3") ==
                      "14" ||
                    window.localStorage.getItem("mainFlagModule3") ==
                      "15" ||
                    window.localStorage.getItem("mainFlagModule3") ==
                      "16" ||
                    window.localStorage.getItem("mainFlagModule4") ==
                      "13" ||
                    window.localStorage.getItem("mainFlagModule5") ==
                    "2" ||
                    window.localStorage.getItem("mainFlagModule5") ==
                    "3" ||
                    window.localStorage.getItem("mainFlagModule5") ==
                      "4" ||
                    window.localStorage.getItem("mainFlagModule5") ==
                      "5"
                  ) {
                    if (
                      this.mainFlagModule5 == 2 ||
                      this.mainFlagModule5 == 3 ||
                      this.mainFlagModule5 == 4 ||
                      this.mainFlagModule5 == 5
                    ) {
                      this.nextParentUrl = JSON.parse(
                        data["data"].nexturl
                      );
                      this.pdfURL = this.nextParentUrl["1"];
                    } else {
                      this.pdfURL = data["data"].nexturl;
                    }
                    console.log(data);
                    // this.pdfURL=data['data'].nexturl
                    this.newUrl = this.imgUrl + this.count + ".jpg";
                  } else {
                    this.pdfURL = data["data"].url;
                    this.newUrl = this.imgUrl + this.count + ".jpg";
                  }
                }
                this.question = data["data"].question;
                this.optionsStateDyanamic = data["data"].options;
                data["data"].options.forEach(element => {
                  this.options.push(element.value);
                });
              }
            },
            error => {
              this.CommonService.handleError(error.error.message);
            } //Catch Error if server is not Found
          );
        }
      }
      else if (this.data.state == 'review') {
        this.question = this.data.questions.question;
        this.data.questions.options.forEach(element => {
          this.options.push(element.value);
        });
      }
    }
    if (parseInt(window.localStorage.getItem('mainFlagModule2')) > 1) {
      this.showFinish = false;
      this.buttonShowFlag = false;
    }
    this.levelData = JSON.parse(localStorage.getItem("levelData"));
    console.log(this.levelData);
  }

  back() {
    this.count--;
    if (this.count >= 0 && this.count < this.finalCount) {
      if (window.localStorage.getItem('mainFlagModule2') == '1') {
        if (window.localStorage.getItem('subFlagModule2') == '1') {
          this.countForModule2 = 0;
        } else if (window.localStorage.getItem('subFlagModule2') == '2') {
          this.countForModule2 = 1;
        } else if (window.localStorage.getItem('subFlagModule2') == '3') {
          this.countForModule2 = 2;
        } else if (window.localStorage.getItem('subFlagModule2') == '4') {
          this.countForModule2 = 3;
        } else if (window.localStorage.getItem('subFlagModule2') == '5') {
          this.countForModule2 = 4;
        } else if (window.localStorage.getItem('subFlagModule2') == '6') {
          this.countForModule2 = 5;
        }
        this.newUrl = this.imgUrl + this.countForModule2.toString() + this.count + ".jpg";
      } else {
        this.newUrl = this.imgUrl + this.count + ".jpg";
      }
    }
    else {
      this.count++;
    }
  }

  private toggleMe() {
    if (this.toggled == false) {
      this.myWidth = (window.screen.width) + "px";
      this.myHeight = (window.screen.height) + "px";
    } else {
      this.myWidth = 'auto';
      this.myHeight = 'auto';
    }
    this.toggled = !this.toggled;
  }

  next() {
    this.count++;

    if (this.count >= 0 && this.count < this.finalCount) {
      if (window.localStorage.getItem('mainFlagModule2') == '1') {
        if (window.localStorage.getItem('subFlagModule2') == '1') {
          this.countForModule2 = 0;
        } else if (window.localStorage.getItem('subFlagModule2') == '2') {
          this.countForModule2 = 1;
        } else if (window.localStorage.getItem('subFlagModule2') == '3') {
          this.countForModule2 = 2;
        } else if (window.localStorage.getItem('subFlagModule2') == '4') {
          this.countForModule2 = 3;
        } else if (window.localStorage.getItem('subFlagModule2') == '5') {
          this.countForModule2 = 4;
        } else if (window.localStorage.getItem('subFlagModule2') == '6') {
          this.countForModule2 = 5;
        }
        this.newUrl = this.imgUrl + this.countForModule2.toString() + this.count + ".jpg";
      } else {
        this.newUrl = this.imgUrl + this.count + ".jpg";
      }
      if (this.count == this.finalCount) {
        this.buttonShowFlag = true;
        if (this.showCFU == true) {
          console.log('next show cout',this.count,this.finalCount)
          this.buttonShowFlag = true;
        } else if (this.showCFU == false && (this.mainFlagModule4 == 8 || this.mainFlagModule1 == 11 || this.mainFlagModule3 == 3 || this.mainFlagModule3 == 5 || this.mainFlagModule5 == 15)) {
          this.showFinish = true;
        }
      }
    }
    else if (this.count == this.finalCount) {
      this.count--;
    }

  }

  onValueChanged($event) {
    this.selectedAnswer = $event.value;
    this.submitDisabled = true;
  }

  submitAnswer() {
    this.sendCfuAns.emit({ "elementhide": true });
    //if question json is locally stored
    if (this.data.state == 'static') {
      for (var i = 0; i < this.data.cfuOption.length; i++) {
        if (this.selectedAnswer == this.data.cfuOption[i].option) {

          if (this.data.cfuOption[i].id == this.data.answer) {
            this.cfuModal.hide();
            this.ansCorrect.emit(true);  //For interest Video 5.6 to send result success
            this.sendCfuAns.emit({ "question": this.question, "answer": this.selectedAnswer });
          } else {
            this.cfuModal.hide();
            this.toastr.error(this.translate.instant('Errors.ansWrongGoBack'));
            this.eventRadioGroup.instance.option("value", '');
            this.shuffle(this.options);
            this.count = 1;
            this.page = 1;
            this.buttonShowFlag = false;
            this.newUrl = this.imgUrl + this.count + ".jpg";
            this.sendCfuAns.emit({ "question": this.question, "answer": this.selectedAnswer });
          }
        }
      }
    }
    //if question json is retrieved from server
    else if (this.data.state == 'dyanamic') {
      for (var i = 0; i < this.optionsStateDyanamic.length; i++) {
        if (this.selectedAnswer == this.optionsStateDyanamic[i].value) {
           var jsonBody = {};
          this.apiUrl = this.data.apiurlResult;
          if (
            window.localStorage.getItem("mainFlagModule2") == "15" ||
            window.localStorage.getItem("mainFlagModule3") == "14" ||
            window.localStorage.getItem("mainFlagModule3") == "15" ||
            window.localStorage.getItem("mainFlagModule3") == "16" ||
            window.localStorage.getItem("mainFlagModule4") == "13" ||
            window.localStorage.getItem("mainFlagModule5") == "2" ||
            window.localStorage.getItem("mainFlagModule5") == "3" ||
            window.localStorage.getItem("mainFlagModule5") == "4" ||
            window.localStorage.getItem("mainFlagModule5") == "5"
          ) {
            jsonBody[
              "currentsubmoduleid"
            ] = window.localStorage.getItem("uuid");
            jsonBody["useroption"] = this.optionsStateDyanamic[
              i
            ].option;
            jsonBody["event"] = "answer";

            this.apiUrl = this.data.apiurl;
          } else if (
            window.localStorage.getItem("mainFlagModule5") == "6" ||
            window.localStorage.getItem("mainFlagModule5") == "7" ||
            window.localStorage.getItem("mainFlagModule5") == "8" ||
            window.localStorage.getItem("mainFlagModule5") == "9" ||
            window.localStorage.getItem("mainFlagModule5") == "10" ||
            window.localStorage.getItem("mainFlagModule5") == "11" ||
            window.localStorage.getItem("mainFlagModule5") == "12"
          ) {
            jsonBody["submoduleid"] = window.localStorage.getItem(
              "uuid"
            );
            jsonBody["useranswer"] = this.optionsStateDyanamic[
              i
            ].option;
            this.apiUrl = this.data.apiurlResult;
          } else {
            jsonBody["submoduleid"] = window.localStorage.getItem(
              "uuid"
            );
            if (
              window.localStorage.getItem("mainFlagModule2") == "1"
            ) {
              jsonBody["useranswer"] = this.optionsStateDyanamic[
                i
              ].option;
              jsonBody["event"] = "answer";
              jsonBody["review"] = "start";
              this.apiUrl = this.data.apiurl;
            }
          }

          this.CommonComponentService.submoduleFinish(jsonBody, this.apiUrl)     //check apiurl
            .subscribe(
              data => {
                if (data["data"].rightanswer != null && data["data"].rightanswer != "" && data["data"].rightanswer != undefined)
                {
                  this.rightanswer = this.LanguageService.get('aesEncryptionKey', data["data"].rightanswer)
                  console.log("rightanswer", this.rightanswer);
                }
                if (data['message'] == 'your answer correct' || data['message'] == 'your answer is correct')
                {

                  this.msgFlag = true;
                  if (
                    this.mainFlagModule5 == 2 ||
                    this.mainFlagModule5 == 3 ||
                    this.mainFlagModule5 == 4 ||
                    this.mainFlagModule5 == 5
                  ) {
                    let url = JSON.parse(
                      data["data"].nexturl
                    );
                    this.pdfURL = url["1"];
                    // this.audioSrc = {};
                    // this.audioSrc['url'] = url["2"];
                  } else {
                    this.pdfURL = data["data"].nexturl;
                  }
                //  this.pdfURL=data['data'].nexturl
                this.showToasterPopup();
                window.localStorage.setItem('uuid', data['data'].nextuuid);
                  if (window.localStorage.getItem('mainFlagModule2') == '15' || window.localStorage.getItem('mainFlagModule3') == '14' || window.localStorage.getItem('mainFlagModule3') == '15' || window.localStorage.getItem('mainFlagModule3') == '16' || window.localStorage.getItem('mainFlagModule4') == '13' || window.localStorage.getItem('mainFlagModule5') == '10' || window.localStorage.getItem('mainFlagModule5') == '11' || window.localStorage.getItem('mainFlagModule5') == '12' || window.localStorage.getItem('mainFlagModule5') == '2' ||
                    window.localStorage.getItem('mainFlagModule5') == '3' ||  window.localStorage.getItem('mainFlagModule5') == '4' || window.localStorage.getItem('mainFlagModule5') == '5')
                {
                  this.options = []

                  this.eventRadioGroup.instance.option("value", '');
                  this.question = data['data'].question;
                  this.optionsStateDyanamic = data['data'].options;
                  data['data'].options.forEach(element => {
                    this.options.push(element.value);
                  });
                    window.scrollTo(0, 0);
                    if (window.localStorage.getItem('mainFlagModule2') == '15')
                    {
                      window.localStorage.setItem('subFlagModule2', "4");
                   }
                    if (
                      window.localStorage.getItem('mainFlagModule5') == '2' ||
                      window.localStorage.getItem('mainFlagModule5') == '3' ||
                      window.localStorage.getItem('mainFlagModule5') == '4' ||
                      window.localStorage.getItem('mainFlagModule5') == '5'
                    )
                  {
                    this.subFlagModule5++;
                    window.localStorage.setItem('subFlagModule5', JSON.stringify(this.subFlagModule5));
                  }
                }
                else{
                    this.cfuModal.hide();
                  setTimeout(() => {
                    this.ansCorrect.emit(true);
                  }, 5000);
                }

              }
              else if (data['message'] == 'wrong answer read pdf again' || data['message'] == 'wrong answer')
              {
                if(window.localStorage.getItem('mainFlagModule5') == '6' || window.localStorage.getItem('mainFlagModule5') == '7' || window.localStorage.getItem('mainFlagModule5') == '8' || window.localStorage.getItem('mainFlagModule5') == '9' || window.localStorage.getItem('mainFlagModule5') == '10' || window.localStorage.getItem('mainFlagModule5') == '11' || window.localStorage.getItem('mainFlagModule5') == '12')
                {
                  this.msgFlag = false;
                  this.showToasterPopup();
                  this.eventRadioGroup.instance.option("value", '');
                  this.shuffle(this.options);

                }
                else{
                  this.msgFlag = false;
                  this.showToasterPopup();

                  this.cfuModal.hide();
                  this.eventRadioGroup.instance.option("value", '');

                  this.shuffle(this.options);
                  this.count = 1;

                  this.newUrl = this.imgUrl + this.count + ".jpg";
                  this.buttonShowFlag = false;
                }
              }
              //this response is for Module2.1
              else if (data['message'] == 'your answer stored next question and uuid is')
              {


                this.cfuModal.hide();
                this.eventRadioGroup.instance.option("value", '');
                this.sendCfuAns.emit(true);
                window.localStorage.setItem('uuid', data['data'].nextuuid);
                this.question = data['data'].question;
                this.optionsStateDyanamic = data['data'].options;
                this.options = [];
                data['data'].options.forEach(element => {
                  this.options.push(element.value);
                });
                this.eventRadioGroup.instance.option("value", '');
                this.submitDisabled = false;
                this.count = 1;
                this.buttonShowFlag = false;
                if (window.localStorage.getItem('mainFlagModule2') == '1') {
                  this.countForModule2++;
                  window.scrollTo(0, 0);
                  window.localStorage.setItem('subFlagModule2', (this.countForModule2 + 1).toString());
                  this.pdfURL=data['data'].url
                  this.newUrl = this.data.url + this.countForModule2.toString() + this.count + ".jpg";
                } else {
                  this.pdfURL=data['data'].url
                  this.newUrl = this.data.url + this.count + ".jpg";
                }

              }
              //for Module2.1
              else if (data['message'] == 'submodule finish' || data['message'] == 'submodule finish next uuid is') {
                window.localStorage.setItem('uuid', data['data'].nextuuid);
                this.cfuModal.hide();
                var pass={}
                pass['status']=true
                if (window.localStorage.getItem('mainFlagModule3') == '14' || window.localStorage.getItem('mainFlagModule3') == '15' || window.localStorage.getItem('mainFlagModule4') == '7' )
                {
                  pass['url']=this.pdfURL;
                  console.log("url",pass['url'])
                } else if (window.localStorage.getItem('mainFlagModule1') == '9')
                {
                  var url = JSON.parse(data["data"].parenturl);
                  pass["url"] = url["1"];
                  console.log('passs', pass)
                }
                else{
                  pass['url'] = data['data'].parenturl;
                }
                console.log("finishhhhhh")
                this.ansCorrect.emit(pass); //send true if all doc mcq successfully completed
                  if (
                    window.localStorage.getItem('mainFlagModule1') == '11' || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule5') == '2' ||
                    window.localStorage.getItem('mainFlagModule1') == '11' || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule5') == '3' ||
                    window.localStorage.getItem('mainFlagModule5') == '4' ||
                    window.localStorage.getItem('mainFlagModule5') == '5'
                  )
                  {
                    this.sendCfuAns.emit(true);
                  }
              }
              this.eventRadioGroup.instance.option("value", '');
                this.submitDisabled = false;
                if (this.options.length == 1)
                {
                  this.hideMe = true;
                } else
                {
                  this.hideMe = false;
                }
            },
            error => {
              this.CommonService.handleError(error.json().message);
              if (error.json().message == 'json Key Error' || error.json().message == 'source is required'  || error.json().message == 'unknown source' || error.json().message == 'required submoduleid key'
                 || error.json().message == 'required useranswer key' || error.json().message == 'required event key'|| error.json().message == 'required review key') {
                this.cfuModal.hide();
                this.toastr.error(this.translate.instant('Errors.goBackReadAns'));
                this.eventRadioGroup.instance.option("value", '');
                this.count = 1;
                this.buttonShowFlag = false;
                this.newUrl = this.imgUrl + this.count + ".jpg";
              }
              else if (error.json().message == 'invalid option') {
                //again start DOC from Start slide
                this.cfuModal.hide();
                this.toastr.error(this.translate.instant('Errors.goBackReadAns'));
                this.eventRadioGroup.instance.option("value", '');
                this.count = 1;
                this.buttonShowFlag = false;
                this.newUrl = this.imgUrl + this.count + ".jpg";
              }
              else {
                this.toastr.error(this.translate.instant('Errors.cannotProceed'));
              }
              this.cfuModal.hide();
              this.eventRadioGroup.instance.option("value", '');
              this.submitDisabled = false;
            }//Catch Error if server is not Found
            );

        }
      }
    }
    else if (this.data.state == 'review') {
      for (var i = 0; i < this.data.questions.options.length; i++) {
        if (this.selectedAnswer == this.data.questions.options[i].value) {
          this.cfuModal.hide();
          this.showDoc.emit(this.data.questions.options[i].option);
        }
      }
    }
  }

  reset() {
    this.eventRadioGroup.instance.option("value", '');
    this.submitDisabled = false;
  }
  finishPDF() {
    this.sendCfuAns.emit(true);
    if (this.options.length == 1)
    {
      this.hideMe = true;
    } else
    {
      this.hideMe = false;
    }
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

  afterLoadComplete(pdfData: any) {
    this.finalCount =  pdfData.numPages;
  }

  finishAudio(e) {
    console.log(e);
    if (e == true)
    {
      this.audioModal.hide();
    }
  }

  nextPage() {

              console.log('next page', this.count)
              if(this.count == this.finalCount && this.showCFU == true){
              console.log('next page count1',this.count,this.finalCount)
              console.log('this.buttonshowflag',this.buttonShowFlag)
              this.buttonShowFlag=true
              console.log('this.buttonshowflag 1',this.buttonShowFlag)
      }
      else{
      console.log('else next11')
      this.count++;
                console.log(' this.count++', this.count);
                if(this.data.unlockView != "static"){
                if (this.count == 13 && this.mainFlagModule5 == 2)
                {
                  this.audioModal.show();
                  this.audioSrc = {};
                  this.audioSrc['url'] = this.nextParentUrl["2"];
                  this.audioSrc["state"] = "dynamic";
                  console.log(' mainFlagModule5.count++', this.count, this.audioSrc['url']);
                }
                else if (this.count == 10 && this.mainFlagModule5 == 3)
                {
                  this.audioModal.show();
                  this.audioSrc = {};
                  this.audioSrc['url1'] = this.nextParentUrl["2"];
                  this.audioSrc['url2'] = this.nextParentUrl["3"];
                  this.audioSrc["state"] = "dynamic";
                  console.log(' mainFlagModule5.count++', this.count, this.audioSrc['url']);
                }else if (this.count == 4 && this.mainFlagModule5 == 4)
                {
                  this.audioModal.show();
                  this.audioSrc = {};
                  this.audioSrc['url'] = this.nextParentUrl["2"];
                  this.audioSrc["state"] = "dynamic";
                  console.log(' mainFlagModule5.count++', this.count, this.audioSrc['url']);
                } else if (this.count == 7 && this.mainFlagModule5 == 5)
                {
                  this.audioModal.show();
                  this.audioSrc = {};
                  this.audioSrc['url'] = this.nextParentUrl["2"];
                  this.audioSrc["state"] = "dynamic";
                  console.log(' mainFlagModule5.count++', this.count, this.audioSrc['url']);
                }
              }
      if(this.count == this.finalCount && this.showCFU == true){
        console.log('else count1',this.count,this.finalCount)
       console.log('this.buttonshowflag 11',this.buttonShowFlag)
       this.buttonShowFlag=true
       console.log('this.buttonshowflag 11',this.buttonShowFlag)
      }

      }
    }

  prevPage() {
    this.count--;
    this.buttonShowFlag=false
  }

  showToasterPopup() {
    this.toasterPopupModal.show();
    setTimeout(() => {
      this.toasterPopupModal.hide();
    }, 5000);
  }

  closeToasterPopup() {
    this.toasterPopupModal.hide();
  }
}
