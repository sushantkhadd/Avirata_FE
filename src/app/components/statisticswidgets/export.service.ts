import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
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

  getUserDetails() {
   let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl + 'talukawiseregisteredusers/', options)
  }

  //Service To get Total count by District for Admin Role
  districtwiseCount() {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl + "districtwisecount/", options);
  }//End Service To get Total count by District for Admin Role

  //Service To get Total count by District for Co-ordinator Role
  districtwiseCountforCoordinator(districtId) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl + 'districwisetalukacount/' + districtId, options);
  }//End Service To get Total count by District for Co-ordinator Role

  //Service To get Total count by District for Co-ordinator Role
  talukawiseCountForMT(talukaId) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(
      this.apiUrl + "talukawiseregisteredusers/" + talukaId,
     options
    );
  }//End Service To get Total count by District for Co-ordinator Role

  //GET method for School Index and Name as per Taluka
  getSchoolnameList(taluka: any) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(
      this.apiUrl + "talukawiseschoolindexname/" + taluka,
     options
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

  approveUserbyCoordinator(json) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };

    return this.httpClient.post(
      this.apiUrl + "traineeapprovevalbycoordinator/",
      { body: JSON.parse(json) },
      options
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

  filterData(talukaId) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(
      this.apiUrl + "coordinatorwiseregistertrainees/" + talukaId,
      options
    );
    // let headers = new Headers();
    // headers.append('Authorization', token);
    // return this.httpClient.get(this.apiUrl + 'coordinatorwiseregistertrainees/' + talukaId, { headers: headers })
    //   .map(data => {
    //     data.json();
    //     return data.json();
    //   });
  }

  filterDataforNotPreset() {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(
      this.apiUrl + "coordinatorwisenotregistertrainees/",
      options
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
