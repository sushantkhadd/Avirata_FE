import { Injectable } from "@angular/core";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
// import * as CryptoJS from "crypto-js";
import * as CryptoJS from "crypto-js";
import { TranslateService } from "@ngx-translate/core";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
declare var jQuery: any;
@Injectable({
  providedIn: "root"
})
export class LanguageService {
  public checkBoxStatus;
  public languageSelection;
  modalClass;

  constructor(
    private translate: TranslateService,
    public toastr: ToastsManager,
    public router: Router
  ) {
    translate.addLangs(["en", "mr"]);
    translate.setDefaultLang("mr");
    this.checkBoxStatus = true;
    this.languageSelection = false;
  }
  changeLanguage(str: string) {
    if (str == "mr") {
      this.checkBoxStatus = true;
    } else {
      this.checkBoxStatus = false;
    }
    this.translate.setDefaultLang(str);
  }

  googleEventTrack(eventCategory, eventLabel, eventAction, eventValue) {
    (<any>window).ga("send", "event", {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  googleEventTrackModule2(eventCategory, eventLabel, eventAction, eventValue) {
    (<any>window).ga("send", "event", {
      eventCategory: eventCategory,
      eventLabel: { eventLabel, eventDate: new Date() },
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  //The set method is use for encrypt the value.
  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC
        // padding: CryptoJS.pad.AnsiX923
      }
    );

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC
      // padding: CryptoJS.pad.AnsiX923
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  handleError(errorMsg) {
    if (errorMsg == "token not found" || errorMsg == "token not match") {
      this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
    } else if (errorMsg == "token not matches please re-login") {
      this.toastr.error(this.translate.instant("otherMessages.sessionLogout"));
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
    } else if (errorMsg == "session not matches please re-login") {
      this.toastr.error(
        "०१४: आपला सेशन कालबाह्य झाला आहे, कृपया पुन्हा  लॉगइन करा."
      );
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
    } else if (errorMsg == "previous submodule not complete") {
      this.toastr.error(
        this.translate.instant("Errors.completePreviousModule")
      );
    } else if (errorMsg == "access denied" || errorMsg == "unauthorized") {
      this.toastr.error(this.translate.instant("Errors.accessDenied"));
    } else if (errorMsg == "required currentsubmoduleid key") {
      this.toastr.error(this.translate.instant("Errors.goPrevModule"));
    } else if (
      errorMsg == "required useroption key" ||
      errorMsg == "question not found" ||
      errorMsg == "invalid option" ||
      errorMsg == "required useranswer key" ||
      errorMsg == "required answer key" ||
      errorMsg == "required answer value" ||
      errorMsg == "wrong submodule id" ||
      errorMsg == "wrong answer" ||
      errorMsg == "json Key Error" ||
      errorMsg == "json key Error" ||
      errorMsg == "wrong activity" ||
      errorMsg == "wrong event" ||
      errorMsg == "required event key" ||
      errorMsg == "required review key" ||
      errorMsg == "invalid taluka id" ||
      errorMsg == "source is required" ||
      errorMsg == "unknown source" ||
      errorMsg == "not null submoduleid field" ||
      errorMsg == "not null event field" ||
      errorMsg == "qusetion not found" ||
      errorMsg == "invalid uuid" ||
      errorMsg == "wrong nextsubmodule id" ||
      errorMsg == "invalid event" ||
      errorMsg == "source required" ||
      errorMsg == "required submoduleid key" ||
      errorMsg == "url not found" ||
      errorMsg == "invalid request" ||
      errorMsg == "invalid question id" ||
      errorMsg == "wrong answer size" ||
      errorMsg == "submodule not started" ||
      errorMsg == "required useranswer value" ||
      errorMsg == "invalid hashids" ||
      errorMsg == "wrong answer value"
    ) {
      console.log(errorMsg);
    } else if (
      errorMsg == "examtype is required" ||
      errorMsg == "examtype key is required" ||
      errorMsg == "wrong examtype"
    ) {
      this.toastr.error(this.translate.instant("Errors.examTypeReqAndWrong"));
    } else if (errorMsg == "module not started") {
      this.toastr.error(this.translate.instant("Errors.moduleNotStarted"));
    } else if (errorMsg == "event is required") {
      this.toastr.error(this.translate.instant("Errors.userEventKeyReq"));
    } else if (
      errorMsg == "exam not started" ||
      errorMsg == "required quizid key" ||
      errorMsg == "quizid is required" ||
      errorMsg == "useroption is required" ||
      errorMsg == "wrong quizid" ||
      errorMsg == "wrong useroption"
    ) {
      this.toastr.error(this.translate.instant("Errors.checkInfoAll"));
    } else if (errorMsg == "fifty_fifty already used") {
      this.toastr.error("Fifty-Fifty already used");
    } else if (errorMsg == "askme already used") {
      this.toastr.error("Askme already used");
    } else if (errorMsg == "question_type is invalid") {
      this.toastr.error("qQuestion-type is invalid");
    } else {
      this.toastr.error(this.translate.instant("Errors.cannotProceed"));
    }
  }

  toHide() {
    this.modalClass = document.getElementsByTagName("body")[0];
    if (this.modalClass.classList.contains("modal-open")) {
      this.modalClass.classList.remove("modal-open");
      var paras = jQuery("bs-modal-backdrop");
      paras.hide();
      // console.log("true")
    }
    else{
      // console.log("false")
    }
  }

  toShow() {
    this.modalClass = document.getElementsByTagName("body")[0];
    if (!this.modalClass.classList.contains("modal-open")) {
      this.modalClass.classList.add("modal-open");
      // console.log("true")
    }
    else{
      // console.log("false")
    }
  }

  toHideChild() {
    this.modalClass = document.getElementsByTagName("body")[0];
    if (this.modalClass.classList.contains("modal-open1"))
    {
      this.modalClass.classList.remove("modal-open1");
      var paras = jQuery("bs-modal-backdrop");
      paras.hide();
      // console.log("true")
    }
    else
    {
      // console.log("false")
    }
  }

  toShowChild() {
    this.modalClass = document.getElementsByTagName("body")[0];
    if (!this.modalClass.classList.contains("modal-open1"))
    {
      this.modalClass.classList.add("modal-open1");
      // console.log("true")
    }
    else
    {
      // console.log("false")
    }
  }
}
