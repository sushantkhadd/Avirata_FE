import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProfilePic(userId: any) {
    console.log("In getUser", userId);
    return this.http
      .get(this.apiUrl + "getprofileimage/" + userId)
      
  }
  getMTList() {}

  getDietList(token) {
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
    return this.http
      .get(this.apiUrl + "districtcoordinator/", { headers: headers })
    
  }
}
