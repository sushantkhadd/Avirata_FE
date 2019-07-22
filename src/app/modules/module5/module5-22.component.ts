import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { Module5Service } from './module5.service';

@Component({
  selector: 'app-module5-22',
  templateUrl: './module5-22.component.html'
})
export class Module522Component implements OnInit {

  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));

  public token; postWordCount;
  public txtcomment: string

  public submitPostDisable = true; startEvent;
  public checkAgree = false; missingPost = false; noPost;
  constructor(public translate: TranslateService, public LanguageService: LanguageService, public router: Router, public Module5Service: Module5Service, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.postWordCount = 0;
    this.submitPostDisable = true;
    this.mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
    this.token = window.localStorage.getItem('token');
    if (this.token == null)
    {
      this.router.navigate(['/']);
    }
    if (this.mainFlagModule5 < 22)
    {

    }
    else if (this.mainFlagModule5 == 22)
    {
      // this.startEvent = true;
      // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.7', window.localStorage.getItem('username'), 10);
    }
    else if (this.mainFlagModule5 > 22)
    {
      // this.startEvent = false;


    }
  }

  getData(e) {
    if (e)
    {
      this.noPost = true;
    } else
    {
      this.noPost = false;
    }
  }
  ngDoCheck() {
    if (this.txtcomment == undefined || this.txtcomment == "")
    {
      this.postWordCount = 0;
      this.submitPostDisable = true;
    } else
    {
      if (Object.keys(this.txtcomment.trim()).length == 0)
        this.submitPostDisable = true;
      else if (this.txtcomment.trim().split(/\s+/).length > 150 || this.txtcomment.trim().split(/\s+/).length < 5)
      {
        this.submitPostDisable = true;
      } else
      {
        this.submitPostDisable = false;
      }
    }

    if (this.txtcomment)
    {
      this.postWordCount = this.txtcomment.trim().split(/\s+/).length;
    }
  }
  nextRoute() {
    this.router.navigate(['/modules/module5/Module5.23']);
  }
  handleInput(e) {
    if (this.txtcomment != undefined)
    {
      if (this.txtcomment.trim().split(/\s+/).length > 150)
      {
        this.toastr.error(this.translate.instant('otherMessages.150Words'));
      }
    }
  }
  submitPost() {
    var apiUrl = 'modulefivepost/'
    var postJson = {};
    postJson['post'] = this.txtcomment.trim();
    postJson['submoduleid'] = window.localStorage.getItem('uuid');

    this.Module5Service.apiCall(postJson, apiUrl)
      .subscribe(
        data => {
          if (data["message"] == "post submitted successfully") {
            window.localStorage.setItem("mainFlagModule5", "23");
            this.mainFlagModule5 = 23;
            this.Module5Service.setLocalStorage5(23);
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            this.toastr.success(
              this.translate.instant(
                "otherMessages.successfullySubmit"
              )
            );
          }
        },
        error => {
          if (error.error.message == 'token not found' || error.error.message == 'token not match')
          {
            this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          } else if (error.error.message == 'json Key Error')
          {
            this.toastr.error(this.translate.instant('otherMessages.wrongInfo2'));
          } else if (error.error.message == 'access denied')
          {
            this.toastr.error(this.translate.instant('otherMessages.accessDenied'))
          }
          else
          {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'));
          }
        });
  }
  repost() {
    var apiUrl = 'mspost/'
    var postJson = {};
    postJson['key'] = "module_1_7";
    postJson['post'] = this.txtcomment.trim();

    this.Module5Service.apiCall(postJson, apiUrl)
      .subscribe(
        data => {
          if (data['message'] == 'post submited successfully')
          {
            // window.localStorage.setItem('mainFlagModule5', '8');
            this.toastr.success(this.translate.instant('otherMessages.successfullySubmit'));
            this.missingPost = false;
            window.localStorage.setItem('mspost', 'false');

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000)
          }
        },
        error => {
          if (error.error.message == 'token not found' || error.error.message == 'token not match')
          {
            this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          } else if (error.error.message == 'json key error')
          {
            this.toastr.error(this.translate.instant('otherMessages.wrongInfo2'));
          } else if (error.error.message == 'access denied')
          {
            this.toastr.error(this.translate.instant('otherMessages.accessDenied'))
          }
          else if (error.error.message == 'unknown source')
          {
            this.toastr.error(this.translate.instant('otherMessages.incorrectInfo'))
          }
          else if (error.error.message == 'invalid key')
          {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
          else if (error.error.message == 'invalid post')
          {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
          else if (error.error.message == 'post already taken')
          {
            // this.toastr.error(this.translate.instant('Errors.cannotProceed'))
            this.missingPost = false;
            window.localStorage.setItem('mspost', 'false');
          }
          else
          {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'));
          }
        });
  }
  agree(e) {
    if (e.target.checked)
    {
      this.checkAgree = true;
    }
    else
    {
      this.checkAgree = false;
    }
  }
  ngAfterViewInit() {
    if (window.localStorage.getItem('mspost') == 'true')
    {
      this.missingPost = true;
      setTimeout(() => {
        this.toastr.error(this.translate.instant('otherMessages.teacherSkill'));
      }, 1500);

    } else
    {
      this.missingPost = false;
    }
  }
}
