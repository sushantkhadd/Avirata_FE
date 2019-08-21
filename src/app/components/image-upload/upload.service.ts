import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : "root"
})
export class UploadService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  setImage(imageResult) {
    imageResult = imageResult + 'mOhArTeCh';

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("image", imageResult);
    //let headers = new HttpHeaders();
    var headers = new HttpHeaders({
      "Content-Type": 'multipart/form-data;boundary=----amrut',
      Authorization:  window.localStorage.getItem('token')
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    headers.append('Content-Type', 'multipart/form-data;boundary=----amrut');
  //  headers.append('Authorization', window.localStorage.getItem('token'));
    headers.append('Accept', 'application/json');
    return this.http.post(this.apiUrl + 'profilepic/', formData, { headers: headers })
      
  }
}
