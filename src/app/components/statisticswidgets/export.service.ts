import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
  {
    providedIn: "root"
  }
)
export class ExportService {
  exportData = [];

  private apiUrl = environment.apiUrl;
  constructor(
    private httpClient: HttpClient,
  ) { }

  getUserDetails(token) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", 'MWEB')
    } else
    {
      headers.append("Source", 'WEB')
    }
    return this.httpClient.get(this.apiUrl + 'talukawiseregisteredusers/', { headers: headers })
  }

  //Service To get Total count by District for Admin Role
  districtwiseCount(token) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent)) {
      headers.append("Source", "MWEB");
    } else {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(this.apiUrl + "districtwisecount/", {
      headers: headers
    });
  }//End Service To get Total count by District for Admin Role

  //Service To get Total count by District for Co-ordinator Role
  districtwiseCountforCoordinator(token, districtId) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", "MWEB");
    } else
    {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(this.apiUrl + 'districwisetalukacount/' + districtId, {
      headers: headers
    });
  }//End Service To get Total count by District for Co-ordinator Role

  //Service To get Total count by District for Co-ordinator Role
  talukawiseCountForMT(token, talukaId) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent)) {
      headers.append("Source", "MWEB");
    } else {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(
      this.apiUrl + "talukawiseregisteredusers/" + talukaId,
      {
        headers: headers
      }
    );
  }//End Service To get Total count by District for Co-ordinator Role

  //GET method for School Index and Name as per Taluka
  getSchoolnameList(taluka: any, token: any) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", "MWEB");
    } else
    {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(
      this.apiUrl + "talukawiseschoolindexname/" + taluka,
      {
        headers: headers
      }
    );
    // let headers = new Headers();
    // headers.append('Authorization', token);
    // headers.append('SOURCE', 'WEB');

    // return this.httpClient.get(this.apiUrl + `talukawiseschoolindexname/` + taluka, { headers: headers })
    //   .map(data => {
    //     data.json();
    //     console.log(JSON.stringify(data.json()));
    //     return data.json();
    //   });
  }//End of function

  approveUserbyCoordinator(json, token) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", "MWEB");
    } else
    {
      headers.append("Source", "WEB");
    }

    return this.httpClient.post(
      this.apiUrl + "traineeapprovevalbycoordinator/",
      { body: JSON.parse(json) },
      { headers: headers }
    );
    // const body = JSON.parse(json);
    // const headers = new Headers({
    //   'Content-Type': 'application/json'
    // });
    // headers.append('Authorization', token);
    // // return this.http.post('http://192.168.1.223:8081/api/log', { body: body }, { headers: headers })
    // return this.httpClient.post(this.apiUrl + 'traineeapprovevalbycoordinator/', { body: body }, { headers: headers })
    //   .map(
    //   res => {
    //     res.json();
    //   }
    //   )
    //   .catch((error: Response) => {
    //     return Observable.throw(error);
    //   })

  }

  filterData(token, talukaId) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent)) {
      headers.append("Source", "MWEB");
    } else {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(
      this.apiUrl + "coordinatorwiseregistertrainees/" + talukaId,
      {
        headers: headers
      }
    );
    // let headers = new Headers();
    // headers.append('Authorization', token);
    // return this.httpClient.get(this.apiUrl + 'coordinatorwiseregistertrainees/' + talukaId, { headers: headers })
    //   .map(data => {
    //     data.json();
    //     return data.json();
    //   });
  }

  filterDataforNotPreset(token, talukaId) {
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    if (/Android/i.test(navigator.userAgent))
    {
      headers.append("Source", "MWEB");
    } else
    {
      headers.append("Source", "WEB");
    }
    return this.httpClient.get(
      this.apiUrl + "coordinatorwisenotregistertrainees/" + talukaId,
      {
        headers: headers
      }
    );
    // let headers = new Headers();
    // headers.append('Authorization', token);
    // return this.httpClient.get(this.apiUrl + 'coordinatorwisenotregistertrainees/' + talukaId, { headers: headers })
    //   .map(data => {
    //     data.json();
    //     return data.json();
    //   });
  }
}
