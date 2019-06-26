import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: "root"
})
export class CommonComponentService {
  private apiUrl = environment.l3apiUrl;
  public l1ApiUrl = environment.apiUrl;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public toastr: ToastsManager,
    public translate: TranslateService
  ) {}

  getCall(api) {
    let source;
    if (/Android/i.test(navigator.userAgent))
    {
      source= "MWEB";
    } else
    {
      source= "WEB";
    }
    let headers = new HttpHeaders({
      "Authorization": window.localStorage.getItem("token"),
       "Source": source
    });
    return this.httpClient.get(this.l1ApiUrl + api, { headers: headers });
  }

  //   getData(apiUrl) {
  //     return this.httpClient.get(apiUrl)
  //       // .map((res:Response) => res.json()); //records in this case
  //       .map(data => {
  //         data;
  //         return data;
  //       }
  //   }

  //To get DOC CFU data
  //   getDataFromServer(jsonBody, apiUrl) {
  //     const headers = new Headers({
  //       'Authorization': window.localStorage.getItem('token'),
  //       'Content-Type': 'application/json',
  //       'Source': 'WEB'
  //     });
  //     return this.http.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //       .map(data => {
  //         return data.json();
  //       },
  //       error =>
  //         this.toastr.error(this.translate.instant('Errors.cannotProceed'))
  //       );
  //   }

  //   //To check DOC CFU Answer
  //   checkCfuAnswer(jsonBody, apiUrl) {
  //     console.log(jsonBody)

  //     const headers = new Headers({
  //       'Authorization': window.localStorage.getItem('token'),
  //       'Content-Type': 'application/json',
  //       'Source': 'WEB'
  //     });
  //     return this.http.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //       .map(data => {
  //         return data.json();
  //       },
  //       error =>
  //         this.toastr.error(this.translate.instant('Errors.cannotProceed'))
  //       );
  //   }

  //vedio and CFU (Start,Answer,Finish)
  submoduleFinish(jsonBody, apiUrl) {
    let source;
    if (/Android/i.test(navigator.userAgent))
    {
      source = "MWEB";
    } else
    {
      source = "WEB";
    }
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
      Source: source
    });
    return this.httpClient.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })

  }

  //Post Assingment Options
  //   sendList(submitAssignmentAPI, listJson, token) {
  //     const headers = new Headers({
  //       'Authorization': token,
  //       'Content-Type': 'application/json',
  //       'source': 'WEB'
  //     });
  //     return this.http.post(this.apiUrl + submitAssignmentAPI, { body: listJson }, { headers: headers })
  //       .map(
  //       res => {
  //         // If request fails, throw an Error that will be caught
  //         return res.json();
  //       })
  //       .catch((error: Response) => {
  //         return Observable.throw(error);
  //       })
  //   }

  //get Kal Chachni Question
  //   kalchachaniQuestion(token, jsonBody, apiUrl) {
  //     const headers = new Headers({
  //       'Authorization': token,
  //       'Content-Type': 'application/json',
  //       // 'source': 'web'
  //       'source': 'WEB'
  //     });
  //     return this.http.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //       .map(data => {
  //         data.json();
  //         return data.json();
  //       })
  //       .catch((error: Response) => {
  //         return Observable.throw(error);
  //       })
  //   }

  //Get Request for Kal Chachni Result for User
  //   getKalResult(token) {
  //     let headers = new Headers();
  //     headers.append('Authorization', token);
  //     headers.append('Source', 'WEB');

  //     // let options = new RequestOptions({ headers: headers });
  //     return this.http.get(this.apiUrl + 'kal_report/', { headers: headers })
  //       .map(data => {
  //         data.json();
  //         return data.json();
  //       });
  //   }

  //Get Forum Post
  //   getForumPostDetails(apiUrl,call){
  //     var url;
  //     const headers = new Headers({
  //       'Authorization': window.localStorage.getItem('token'),
  //       'Source': 'WEB'
  //     });
  //     if(call == 1){
  //       url=this.apiUrl + apiUrl
  //     }else if(call == 2){
  //       url =apiUrl
  //     }
  //     return this.http.get(url,{ headers: headers })
  //       .map(data => {
  //         data.json();
  //         return data.json();
  //       });
  //   }//End

  //Vie COmments
  //    viewComment(jsonBody, apiUrl) {
  //     const headers = new Headers({
  //       'Authorization': window.localStorage.getItem('token'),
  //       'Content-Type': 'application/json',
  //       'source': 'WEB'
  //     });
  //     return this.http.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //       .map(data => {
  //         data.json();
  //         return data.json();
  //       })
  //       .catch((error: Response) => {
  //         return Observable.throw(error);
  //       })
  //   }

  //Get Forum Post
  getForumPostDetails(apiUrl,call){
    var url;
    if(call == 1){
      url=this.apiUrl + apiUrl
    }else if(call == 2){
      url =apiUrl
    }
    let source;
    if (/Android/i.test(navigator.userAgent))
    {
      source= "MWEB";
    } else
    {
      source= "WEB";
    }
    let headers = new HttpHeaders({
      "Authorization": window.localStorage.getItem("token"),
       "Source": source
    });

    return this.httpClient.get(url,{ headers: headers })
  }//End

  //Vie COmments
   viewComment(jsonBody, apiUrl) {
     let source;
     if (/Android/i.test(navigator.userAgent))
     {
       source = "MWEB";
     } else
     {
       source = "WEB";
     }
     let headers = new HttpHeaders({
       "Content-Type": "application/json",
       Authorization: window.localStorage.getItem("token"),
       Source: source
     });
    return this.httpClient.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  }

  handleError(errorMsg) {
    if (
      errorMsg == "token not found" ||
      errorMsg == "token not match" ||
      errorMsg == "token not matches please re-login"
    ) {
      this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
    } else if (
      errorMsg == "json Key Error" ||
      errorMsg == "json key Error" ||
      errorMsg == "wrong activity" ||
      errorMsg == "wrong event"
    ) {
      this.toastr.error(this.translate.instant("Errors.wrongInfo"));
    } else if (
      errorMsg == "source is required" ||
      errorMsg == "unknown source"
    ) {
      this.toastr.error(this.translate.instant("Errors.incompleteInfo"));
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
      errorMsg == "required useranswer key"
    ) {
      this.toastr.error(this.translate.instant("Errors.userAnsKeyReq"));
    } else if (errorMsg == "required event key") {
      this.toastr.error(this.translate.instant("Errors.userEventKeyReq"));
    } else if (errorMsg == "required review key") {
      this.toastr.error(this.translate.instant("Errors.reviewKeyReq"));
    } else if (
      errorMsg == "invalid uuid" ||
      errorMsg == "wrong nextsubmodule id" ||
      errorMsg == "invalid event"
    ) {
      this.toastr.error(this.translate.instant("Errors.invalidUuidOrEvent"));
    } else if (errorMsg == "invalid taluka id") {
      this.toastr.error(this.translate.instant("Errors.recheckInfo"));
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
    } else if (errorMsg == "wrong event") {
      this.toastr.error(this.translate.instant("Errors.wrongEvent"));
    } else if (
      errorMsg == "exam not started" ||
      errorMsg == "required quizid key" ||
      errorMsg == "quizid is required" ||
      errorMsg == "required useroption key" ||
      errorMsg == "useroption is required" ||
      errorMsg == "wrong quizid" ||
      errorMsg == "wrong useroption"
    ) {
      this.toastr.error(this.translate.instant("Errors.checkInfoAll"));
    } else {
      this.toastr.error(this.translate.instant("Errors.cannotProceed"));
    }
  }
}
