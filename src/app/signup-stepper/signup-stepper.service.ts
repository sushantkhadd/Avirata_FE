import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn : "root"
})
export class SignupStepperService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: Http,
  ) { }
//GET method for retrive Taluka List as per District
  getDistrict(token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    return this.http.get(this.apiUrl + 'alldistrict/',{ headers: headers })
      .map(data => {
        data.json();
        return data.json();
      });
  }//End of getTaluka

  //GET method for retrive Taluka List as per District
  getTaluka(district: any) {
    return this.http.get(this.apiUrl + 'districtwisetaluka/' + district)
      .map(data => {
        data.json();
        return data.json();
      });
  }//End of getTaluka
  //GET method for retrive Trainer List as per Taluka
  getTrainer(taluka: any) {
    return this.http.get(this.apiUrl + `talukawisemt/` + taluka)
      .map(data => {
        data.json();
        return data.json();
      });
  }//End of getTrainer
  //GET method for School Index and Name as per Taluka
  getSchool(taluka: any) {
    return this.http.get(this.apiUrl + `talukawiseschoolindexname/` + taluka)
      .map(data => {
        data.json();
        return data.json();
      });
  }//End of getTrainer

  submitStepOne(stepOneJson: any,token:any) {
    const body = JSON.parse(stepOneJson);
    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile1/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepOne

  submitStepOneforMT(stepOneJson: any,token:any) {
    const body = JSON.parse(stepOneJson);
    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofilemt1/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepOneFor Master Trainer

  submitStepTwo(stepTwoJson: any,token:any) {
    const body = JSON.parse(stepTwoJson);
    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

      return this.http.post(this.apiUrl + 'userprofile2/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepTwo

  submitStepThree(stepThreeJson: any,token:any) {
    const body = JSON.parse(stepThreeJson);
    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile3/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepTwo

  submitStepFour(stepFourJson: any,token:any) {
    const body = JSON.parse(stepFourJson);
    const headers = new Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile4/', { body: body }, { headers: headers })
      .map(
      res => {
         return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepFour

  setProfilePic(profilePicJson: any) {
    const body = JSON.parse(profilePicJson);
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data; boundary=AaB03x');
    headers.append('Content-Type', 'application/json');
    // headers.append('Content-Type', 'application/octet-stream');
    // headers.set('Upload-Content-Type', image.type)
    return this.http.post(this.apiUrl + 'profilepic/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of submitStepTwo
}
