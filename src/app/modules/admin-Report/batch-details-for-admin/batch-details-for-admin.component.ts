import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from "@angular/core";
import { AdminReportService } from "../admin-report.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { CsvService } from "angular2-json2csv";

@Component({
  selector: "app-batch-details-for-admin",
  templateUrl: "./batch-details-for-admin.component.html",
  styleUrls: ["./batch-details-for-admin.component.scss"]
})
export class BatchDetailsForAdminComponent implements OnInit {
  public jsonBody;
  batchDetailsData;
  exportData;
  showDetails;
  totalPage;
  currentPage;
  loader;
  constructor(
    private csvService: CsvService, public AdminReportService: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  @Output() public finishCall = new EventEmitter<any>();

  ngOnInit() {
    this.showDetails = false;
    this.loader = true;
    this.getBatchDetails();
  }

  getBatchDetails() {
    var apiUrl = "batchdetails/";
    this.AdminReportService.getCall(
      apiUrl,
      window.localStorage.getItem("token")
    ).subscribe(
      data => {
        if (data['message'] == "ok") {
          this.batchDetailsData = data['data'].result;
          if(this.batchDetailsData){
            this.loader = false;
          }else {
            this.loader = true;
          }
          this.batchDetailsData.sort(function(a, b){
            var A = a.district_name.toLowerCase();
            var B = b.district_name.toLowerCase();
            if (A < B) //sort string ascending
                return -1
            if (A > B)
                return 1
            return 0 //default return value (no sorting)
          });
          this.exportData = this.batchDetailsData;
        }
      },

      error => {
        if (error.error.message == "unknown source") {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("unknown source");
        } else if (error.error.message == "token not found") {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("token not found");
        } else if (error.error.message == "token not matches") {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("token not matches");
        } else if (error.error.message == "source required") {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("source required");
        } else if (error.error.message == "access denied") {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("access denied");
        } else {
          alert(this.translate.instant("errors.tryAgain"));
        }
      }
    );
  }

  export() {
    var date = new Date().toLocaleString();
    if (this.showDetails == true) {
      var fileName =
        "ModuleWise_Users_status_" + this.currentPage + "/" + this.totalPage;
    } else {
      var fileName = "Batch Details";
    }
    this.csvService.download(this.exportData, fileName);
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }
}
