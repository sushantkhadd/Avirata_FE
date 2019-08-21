import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { environment } from './../../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class QuizService {
  private apiUrl = environment.l3apiUrl;
  public answerSendingError: boolean;
  constructor(private httpClient: HttpClient) { }
  startExam(startExamJson: any, token: any, apiEndStart) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem('token'),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }

    return this.httpClient.post(this.apiUrl + apiEndStart, { body: startExamJson }, { headers: headers })
    
  }//End startExam

  //POST method for Send Answer for BaseLine Que
  sendAnswer(sendAnsJson: any, token: any, apiEndSendAns) {
    const body = sendAnsJson;
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem('token'),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.httpClient.post(this.apiUrl + apiEndSendAns, { body: body }, { headers: headers })
    
  }//End Send Answer
  //POST method for Finish BaseLine
  finishBaseline(sendAnsJson: any, token: any, apiEndFinish) {
    // const body = JSON.parse(sendAnsJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem('token'),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }

    return this.httpClient.post(this.apiUrl + apiEndFinish, { body: sendAnsJson }, { headers: headers })
   
  }
}
