import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { LanguageService } from 'src/app/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [FormBuilder]
})

export class LoginComponent implements OnInit {

  loginModel = new Login();
  public username; password;disableLogin;

  constructor(public CommonService: CommonService,public router: Router,public fb: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public lang:LanguageService) {
     this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.username = "";
    this.password="";
    this.disableLogin = false;
  }

  ngDoCheck(){
    if(this.username.trim().length == 0 || this.password.trim().length == 0){
      this.disableLogin = false;
    }
    else{
      this.disableLogin = true;
    }
  }

  login(){
    var apiUrl = "login/";
    var jsonBody = {};

      jsonBody["username"] = this.username.trim();
      jsonBody["password"] = this.password.trim();
      jsonBody["firebaseid"] = "";

    this.CommonService.postCallWT(apiUrl, jsonBody).subscribe(
      data => {
        if (data['message'] == 'ok') {
          window.localStorage.setItem('setData',JSON.stringify(data['data']))
          window.localStorage.setItem("token",data['data'].token)
          window.localStorage.setItem("coordinatorStatus",data['data'].coordinatorstatus)
          window.localStorage.setItem("startDate",data['data'].daterange.startDate)
          window.localStorage.setItem("endDate",data['data'].daterange.endDate)
          window.localStorage.setItem("districtid",data['data'].districtid)
          window.localStorage.setItem("districtname",data['data'].districtname)
          window.localStorage.setItem("firstname",data['data'].firstname)
          window.localStorage.setItem("group_name",data['data'].group_name)
          window.localStorage.setItem('levelStatus', JSON.stringify(data['data'].level_status));
          window.localStorage.setItem("percentage",data['data'].percentage)
          window.localStorage.setItem("position",data['data'].position)
          window.localStorage.setItem("talukaid",data['data'].talukaid)
          window.localStorage.setItem("talukaname",data['data'].talukaname)
          window.localStorage.setItem("user_id",data['data'].user_id)
          this.router.navigate(['/level-selection']);
          if(data['data'].certificate!=null){
            window.localStorage.setItem('certificate',data['data'].certificate)
          }
        }

      },
      error => {
        if (error.error.message == 'user not exists')
        {
          this.toastr.error(this.translate.instant('Errors.wrongUsername'));
          document.getElementById('userName').focus();
        }
        else if(error.error.message == 'wrong password'){
          this.toastr.error(this.translate.instant('Errors.wrongPassword'));
          document.getElementById('pass').focus();
        } else
        {
          this.CommonService.handleError(error.error.message);
        }
      }
    );
   }

}
