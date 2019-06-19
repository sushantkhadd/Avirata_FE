import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { LanguageService } from "./../language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { SharedDataService } from "../services/shared-data.service";
import { FullLayoutService } from "../layouts/full-layout.service";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html"
})
export class TimelineComponent implements OnInit {
  public moduleTimelineFlag;
  public completedModule = {};

  constructor(
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public lang: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public translate: TranslateService,
    private sharedService: SharedDataService,
    public FullLayoutService: FullLayoutService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  counterValue0;
  counterValue1;
  counterValue2;
  counterValue3;
  counterValue4;
  counterValue5;
  currentstatus;
  currentJson2;
  public mainFlagModule0;
  mainFlagModule1;
  mainFlagModule2;
  mainFlagModule3;
  mainFlagModule4;
  mainFlagModule5;
  totalPer;
  width: number ;
  barWidth1;barWidth2;barWidth3;barWidth4;barWidth5;
  ngOnInit() {
    if (window.localStorage.getItem("token") == null) {
      this.router.navigate(["/"]);
      // window.location.reload();
    }
    // moduleTimelineFlag
    console.log(
      this.mainFlagModule0,
      this.mainFlagModule1,
      this.mainFlagModule2,
      this.mainFlagModule3,
      this.mainFlagModule4,
      this.mainFlagModule5,
      "Timeline=>this.LocalstoragedetailsService.timelineState" +
        this.LocalstoragedetailsService.timelineState
    );
    if (parseInt(window.localStorage.getItem("flag")) == 5) {
      this.LocalstoragedetailsService.timelineState = 1;
    }
    if (
      (window.localStorage.getItem("completeModule") != null &&
        window.localStorage.getItem("completeModule") != "" &&
        window.localStorage.getItem("completeModule") != undefined) ||
      (window.localStorage.getItem("currentstatus") != null &&
        window.localStorage.getItem("currentstatus") != "" &&
        window.localStorage.getItem("currentstatus") != undefined)
    ) {
      this.completedModule = JSON.parse(
        window.localStorage.getItem("completeModule")
      );
      this.currentstatus = JSON.parse(
        window.localStorage.getItem("currentstatus")
      );
    }
    let obJ = {};
    obJ['currentstatus'] = this.currentstatus;
    obJ['currentstatusFlag'] = true;
    this.sharedService.sendData(obJ);

    if (
      (window.localStorage.getItem("mainFlagModule0") != null &&
        window.localStorage.getItem("mainFlagModule0") != "" &&
        window.localStorage.getItem("mainFlagModule0") != undefined) ||
      (window.localStorage.getItem("mainFlagModule1") != null &&
        window.localStorage.getItem("mainFlagModule1") != "" &&
        window.localStorage.getItem("mainFlagModule1") != undefined) ||
      (window.localStorage.getItem("mainFlagModule2") != null &&
        window.localStorage.getItem("mainFlagModule2") != "" &&
        window.localStorage.getItem("mainFlagModule2") != undefined) ||
      (window.localStorage.getItem("mainFlagModule3") != null &&
        window.localStorage.getItem("mainFlagModule3") != "" &&
        window.localStorage.getItem("mainFlagModule3") != undefined) ||
      (window.localStorage.getItem("mainFlagModule4") != null &&
        window.localStorage.getItem("mainFlagModule4") != "" &&
        window.localStorage.getItem("mainFlagModule4") != undefined) ||
      (window.localStorage.getItem("mainFlagModule5") != null &&
        window.localStorage.getItem("mainFlagModule5") != "" &&
        window.localStorage.getItem("mainFlagModule5") != undefined)
    )
    {
      this.mainFlagModule0 = parseInt(
        window.localStorage.getItem("mainFlagModule0")
      );
      this.mainFlagModule1 = parseInt(
        window.localStorage.getItem("mainFlagModule1")
      );
      this.mainFlagModule2 = parseInt(
        window.localStorage.getItem("mainFlagModule2")
      );
      this.mainFlagModule3 = parseInt(
        window.localStorage.getItem("mainFlagModule3")
      );
      this.mainFlagModule4 = parseInt(
        window.localStorage.getItem("mainFlagModule4")
      );
      this.mainFlagModule5 = parseInt(
        window.localStorage.getItem("mainFlagModule5")
      );
    }

    // if (this.currentstatus)
    // {
    //   if (this.mainFlagModule0)
    //   {
    //     this.counterValue0 = 0;
    //     console.log("0",this.counterValue0)
    //   } else if (this.mainFlagModule1 && this.currentstatus  == 1)
    //   {
    //     this.counterValue1 = Math.round((this.mainFlagModule1 - 1) * this.calPercentage(12));
    //     this.totalPer = this.counterValue1;
    //     console.log("1",this.totalPer)
    //   } else if (this.mainFlagModule2 && this.currentstatus  == 2)
    //   {
    //     this.counterValue2 = Math.round((this.mainFlagModule2 - 1) * this.calPercentage(17));
    //     this.totalPer = 20 + this.counterValue2;
    //     console.log("2", this.totalPer)

    //   } else if (this.mainFlagModule3)
    //   {
    //     this.counterValue3 = Math.round((this.mainFlagModule3 - 1) * this.calPercentage(18));
    //     this.totalPer = 40 + this.counterValue3;
    //     console.log("3", this.totalPer)
    //   } else if (this.mainFlagModule4)
    //   {
    //     this.counterValue4 = Math.round((this.mainFlagModule4 - 1) * this.calPercentage(14));
    //     this.totalPer = 60 + this.counterValue4;
    //     console.log("4", this.totalPer)
    //   } else if (this.mainFlagModule5)
    //   {
    //     this.counterValue5 = Math.round((this.mainFlagModule5 - 1) * this.calPercentage(15));
    //     this.totalPer = 80 + this.counterValue5;
    //     console.log("5", this.totalPer)
    //   }
    // }
    console.log(this.counterValue0, this.counterValue1, this.counterValue2, this.counterValue3, this.counterValue4, this.counterValue5);
  }

  calPercentage(val) {
    let perval = 20 / val;
    var a =  perval.toString().split(".")[1]
    // console.log("a",a)
    // if()
    return (perval)
  }


  ngDoCheck() {
    if (
      (window.localStorage.getItem("completeModule") != null &&
        window.localStorage.getItem("completeModule") != "" &&
        window.localStorage.getItem("completeModule") != undefined) ||
      (window.localStorage.getItem("currentstatus") != null &&
        window.localStorage.getItem("currentstatus") != "" &&
        window.localStorage.getItem("currentstatus") != undefined)
    ) {
      this.completedModule = JSON.parse(
        window.localStorage.getItem("completeModule")
      );
      this.currentstatus = JSON.parse(
        window.localStorage.getItem("currentstatus")
      );
    }


    if (
      (window.localStorage.getItem("mainFlagModule0") != null &&
        window.localStorage.getItem("mainFlagModule0") != "" &&
        window.localStorage.getItem("mainFlagModule0") != undefined) ||
      (window.localStorage.getItem("mainFlagModule1") != null &&
        window.localStorage.getItem("mainFlagModule1") != "" &&
        window.localStorage.getItem("mainFlagModule1") != undefined) ||
      (window.localStorage.getItem("mainFlagModule2") != null &&
        window.localStorage.getItem("mainFlagModule2") != "" &&
        window.localStorage.getItem("mainFlagModule2") != undefined) ||
      (window.localStorage.getItem("mainFlagModule3") != null &&
        window.localStorage.getItem("mainFlagModule3") != "" &&
        window.localStorage.getItem("mainFlagModule3") != undefined) ||
      (window.localStorage.getItem("mainFlagModule4") != null &&
        window.localStorage.getItem("mainFlagModule4") != "" &&
        window.localStorage.getItem("mainFlagModule4") != undefined) ||
      (window.localStorage.getItem("mainFlagModule5") != null &&
        window.localStorage.getItem("mainFlagModule5") != "" &&
        window.localStorage.getItem("mainFlagModule5") != undefined)
    )
    {
      this.mainFlagModule0 = parseInt(
        window.localStorage.getItem("mainFlagModule0")
      );
      this.mainFlagModule1 = parseInt(
        window.localStorage.getItem("mainFlagModule1")
      );
      this.mainFlagModule2 = parseInt(
        window.localStorage.getItem("mainFlagModule2")
      );
      this.mainFlagModule3 = parseInt(
        window.localStorage.getItem("mainFlagModule3")
      );
      this.mainFlagModule4 = parseInt(
        window.localStorage.getItem("mainFlagModule4")
      );
      this.mainFlagModule5 = parseInt(
        window.localStorage.getItem("mainFlagModule5")
      );
    }

    if ((window.localStorage.getItem("currentstatus") != null &&
      window.localStorage.getItem("currentstatus") != "" &&
      window.localStorage.getItem("currentstatus") != undefined))
    {
    //  if (this.mainFlagModule0)
    //   {
    //     this.counterValue0 = 0;
    //     console.log("0",this.counterValue0)
    //   } else
      this.width = 4;

      if (this.mainFlagModule1 && this.currentstatus  == 1)
      {
        this.counterValue1 = Math.round((this.mainFlagModule1 - 1) * this.calPercentage(12));
        this.totalPer = this.counterValue1;
        this.barWidth1 = this.counterValue1 * this.width + '%';
      } else if (this.mainFlagModule2 && this.currentstatus  == 2)
      {
        this.totalPer =20
        this.counterValue2 = Math.round((this.mainFlagModule2 - 1) * this.calPercentage(17));
        this.totalPer = 20 + this.counterValue2;
        this.barWidth2 = this.counterValue2 * this.width + '%';

      } else if (this.mainFlagModule3 && this.currentstatus  == 3)
      {
        this.totalPer =40
        this.counterValue3 = Math.round((this.mainFlagModule3 - 1) * this.calPercentage(18));
        this.totalPer = 40 + this.counterValue3;
        this.barWidth3 = this.counterValue3 * this.width + '%';
      } else if (this.mainFlagModule4 && this.currentstatus  == 4)
      {
        this.totalPer =60
        this.counterValue4 = Math.round((this.mainFlagModule4 - 1) * this.calPercentage(14));
        this.totalPer = 60 + this.counterValue4;
        this.barWidth4 = this.counterValue4 * this.width + '%';
      } else if (this.mainFlagModule5 && this.currentstatus  == 5)
      {
        this.totalPer =80
        this.counterValue5 = Math.round((this.mainFlagModule5 - 1) * this.calPercentage(24));
        this.totalPer = 80 + this.counterValue5;
        this.barWidth5 = this.counterValue5 * this.width + '%';
      }else if (this.currentstatus  == 6)
      {
        this.totalPer =100 + '%'
        // this.width = 1;
      }
    }
  }

  showAlert() {
    this.toastr.warning(this.translate.instant("otherMessages.timelineMsg"));
  }
}
