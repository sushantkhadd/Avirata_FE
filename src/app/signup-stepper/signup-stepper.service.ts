import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : "root"
})
export class SignupStepperService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }
//GET method for retrive Taluka List as per District
  getDistrict(token) {
    let headers = new HttpHeaders();
    headers.append('Authorization', token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", "MWEB");
    } else
    {
      headers.append("Source", "WEB");
    }
    return this.http.get(this.apiUrl + 'alldistrict/',{ headers: headers })

  }//End of getTaluka

  //GET method for retrive Taluka List as per District
  getTaluka(district: any) {
    return this.http.get(this.apiUrl + 'districtwisetaluka/' + district)

  }//End of getTaluka
  //GET method for retrive Trainer List as per Taluka
  getTrainer(taluka: any) {
    return this.http.get(this.apiUrl + `talukawisemt/` + taluka)

  }//End of getTrainer
  //GET method for School Index and Name as per Taluka
  getSchool(taluka: any) {
    return this.http.get(this.apiUrl + `talukawiseschoolindexname/` + taluka)

  }//End of getTrainer

  submitStepOne(stepOneJson: any,token:any) {
    const body = JSON.parse(stepOneJson);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile1/', { body: body }, { headers: headers })

  }//End of submitStepOne

  submitStepOneforMT(stepOneJson: any,token:any) {
    const body = JSON.parse(stepOneJson);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofilemt1/', { body: body }, { headers: headers })

  }//End of submitStepOneFor Master Trainer

  submitStepTwo(stepTwoJson: any,token:any) {
    const body = JSON.parse(stepTwoJson);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });

      return this.http.post(this.apiUrl + 'userprofile2/', { body: body }, { headers: headers })

  }//End of submitStepTwo

  submitStepThree(stepThreeJson: any,token:any) {
    const body = JSON.parse(stepThreeJson);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile3/', { body: body }, { headers: headers })

  }//End of submitStepTwo

  submitStepFour(stepFourJson: any,token:any) {
    const body = JSON.parse(stepFourJson);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'userprofile4/', { body: body }, { headers: headers })

  }//End of submitStepFour

  setProfilePic(profilePicJson: any) {
    const body = JSON.parse(profilePicJson);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data; boundary=AaB03x');
    headers.append('Content-Type', 'application/json');
    // headers.append('Content-Type', 'application/octet-stream');
    // headers.set('Upload-Content-Type', image.type)
    return this.http.post(this.apiUrl + 'profilepic/', { body: body }, { headers: headers })

  }//End of submitStepTwo
}
