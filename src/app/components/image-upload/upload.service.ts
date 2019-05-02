import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn : "root"
})
export class UploadService {
  public apiUrl = environment.apiUrl;
  constructor(private http: Http) { }
  setImage(imageResult) {
    imageResult = imageResult + 'mOhArTeCh';

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("image", imageResult);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data;boundary=----amrut');
    headers.append('Authorization', window.localStorage.getItem('token'));
    headers.append('Accept', 'application/json');
    return this.http.post(this.apiUrl + 'profilepic/', formData, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }
}
