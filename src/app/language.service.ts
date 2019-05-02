import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public checkBoxStatus;
  public languageSelection;

  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "mr"]);
    translate.setDefaultLang("mr");
    this.checkBoxStatus = true;
    this.languageSelection = false;
  }
  changeLanguage(str: string) {
    if (str == "mr")
    {
      this.checkBoxStatus = true;
    } else
    {
      this.checkBoxStatus = false;
    }
    this.translate.setDefaultLang(str);
  }

  googleEventTrack(eventCategory, eventLabel, eventAction, eventValue) {
    (<any>window).ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  googleEventTrackModule2(eventCategory, eventLabel, eventAction, eventValue) {
    (<any>window).ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: { eventLabel, eventDate: new Date() },
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

  //The set method is use for encrypt the value.
  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse('encryptionIntVec');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        // padding: CryptoJS.pad.AnsiX923
      });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse('encryptionIntVec');
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      // padding: CryptoJS.pad.AnsiX923
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
