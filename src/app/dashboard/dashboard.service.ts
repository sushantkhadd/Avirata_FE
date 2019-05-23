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
    let headers = new HttpHeaders();
    headers.append("Authorization", token);
    return this.http
      .get(this.apiUrl + "districtcoordinator/", { headers: headers })
    
  }
}
