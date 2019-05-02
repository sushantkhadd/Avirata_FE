import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { environment } from "./../../environments/environment";
import { Http, Headers } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  constructor(private http: Http) {}
  getProfilePic(userId: any) {
    console.log("In getUser", userId);
    return this.http
      .get(this.apiUrl + "getprofileimage/" + userId)
      .map(data => {
        data.json();
        return data.json();
      });
  }
  getMTList() {}

  getDietList(token) {
    let headers = new Headers();
    headers.append("Authorization", token);
    return this.http
      .get(this.apiUrl + "districtcoordinator/", { headers: headers })
      .map(data => {
        data.json();
        return data.json();
      });
  }
}
