import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  HostListener, ElementRef
} from "@angular/core";
import { FullLayoutService } from "./full-layout.service";
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from "@angular/router";
import { LanguageService } from "./../language.service";
import { DashboardService } from "./../dashboard/dashboard.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ModalDirective } from "ngx-bootstrap";
import { ProfileService } from "src/app/dashboard/profile/profile.service";
import { ToastsManager } from "ng6-toastr";
import { PermissionModelService } from "src/app/permission-model.service";
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import html2canvas from "html2canvas";
import { DomSanitizer } from "@angular/platform-browser";
import { map, filter, take } from "rxjs/operators";
import { interval, pipe, Subscription } from "rxjs";
import { SignupStepperService } from "../signup-stepper/signup-stepper.service";
import { SharedDataService } from "../services/shared-data.service";
import * as fileSaver from 'file-saver';
declare var jQuery: any;


@Component({
  selector: "app-dashboard",
  templateUrl: "./full-layout.component.html",
  styleUrls: ["./full-layout.component.scss"]
})
export class FullLayoutComponent implements OnInit {
  public mainFlagModule5 = 0;
  subFlagModule5 = 0;
  mainFlagModule2 = 0;
  subFlagModule0 = 0;
  subFlagModule2 = 0;
  subFlagModule3 = 0;
  public token;
  userId; starPopupFlag;
  userType;
  public admin;
  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  private trainee = false;
  imgUrl;
  rewardsFlag;
  cupImg; profileFlag;
  needEfforts; needEfforts1;
  subscription: Subscription; isloaded; grandPercent;
  @ViewChild("passwordChangeModal") public passwordChangeModal: ModalDirective;
  @ViewChild("moduleStatusModal") public moduleStatusModal: ModalDirective;
  @ViewChild("submoduleStatusModal")
  public submoduleStatusModal: ModalDirective;

  @ViewChild("moduleStatusCupModal")
  public moduleStatusCupModal: ModalDirective;

  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  @ViewChild("instructionModal0") public instructionModal0: ModalDirective;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  @ViewChild('cupPopup') cupPopup: ElementRef;
  @ViewChild('screen') screencup: ElementRef;
  @ViewChild('canvas') canvascup: ElementRef;
  @ViewChild('downloadLink') downloadLinkcup: ElementRef;
  public passwordChange;
  newPasswordChange1;
  public confirmPaswwordTrue = false;
  public confirmPassword1;
  public moduleStatus = 5;
  public module5OnOffFlag = false;
  jsonBody = new Object();
  loaderFlag;

  public currentData = new Object();
  temp;

  public mainFlagModule1 = 0;
  subFlagModule1 = 0;
  mainFlagModule4 = 0;
  subFlagModule4 = 0;
  module4OnOffFlag = false;
  module2OnOffFlag = false;
  subFlagModule6 = 0;
  subFlagModule7 = 0;
  public mainFlagModule3 = 0;
  module3OnOffFlag = false;
  module1OnOffFlag = false;
  public mainFlagModule6 = 0;
  public moduleStatusCheck;
  homeLinkEnabled;
  hideMenuFlag;
  hideMenuAdminFlag;
  public currentFlag1;
  currentFlag2;
  currentFlag3;
  currentFlag4;
  currentFlag5;
  currentFlag6;
  currentFlag7;
  public moduleCompleteStatus = new Object();
  modalDisplay = true;
  public module6OnOffFlag = false;
  mainFlagModule7 = 0;
  getImage;
  module7OnOffFlag = false;

  public module0OnOffFlag;
  currentFlag0;
  shareableImage;
  mainFlagModule0 = 0;
  userName;
  moduleFinishCount;
  levelData;
  rewardImgUrl0;
  rewardImgUrl1;
  rewardImgUrl2;
  rewardImgUrl3;
  rewardImgUrl4;
  rewardImgUrl5;

  statusFlag;
  finishImgUrl;
  intVal; sharedData; module5FinishFlag; moduleStatus0
  // imageJson = {
  //   a1: "../../assets/img/rewards/side_gold_star.png",
  //   a2: "../../assets/img/rewards/side_silver_star.png",
  //   a3: "../../assets/img/rewards/side_bronze_star.png",
  //   a4: "",
  //   r1: "../../assets/img/rewards/gold_star.png",
  //   r2: "../../assets/img/rewards/silver_star.png",
  //   r3: "../../assets/img/rewards/bronze_star.png"
  // };

  imageJson = {
    a1: "fa-star gold_star",
    a2: "fa-star silver_star",
    a3: "fa-star bronze_star",
    a4: "",
    r1: "../../assets/img/rewards/gold_star.png",
    r2: "../../assets/img/rewards/silver_star.png",
    r3: "../../assets/img/rewards/bronze_star.png"
  };

  animatedImageJson = {
    a1: "../../assets/img/rewards/single-stars/gold.png",
    a2: "../../assets/img/rewards/single-stars/silver.png",
    a3: "../../assets/img/rewards/single-stars/bronze.png"
    // b1: "../../assets/img/rewards/single-stars/silver_small.png",
    // b2: "../../assets/img/rewards/single-stars/silver.png",
    // b3: "../../assets/img/rewards/single-stars/silver_small.png",
    // c1: "../../assets/img/rewards/single-stars/bronze_small.png",
    // c2: "../../assets/img/rewards/single-stars/bronze.png",
    // c3: "../../assets/img/rewards/single-stars/bronze_small.png"
  };
  constructor(
    public LanguageService: LanguageService,
    public DashboardService: DashboardService,
    public FullLayoutService: FullLayoutService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public ProfileService: ProfileService,
    public toastr: ToastsManager,
    public permission: PermissionModelService,
    vcr: ViewContainerRef,
    private lBar: SlimLoadingBarService,
    private _sanitizer: DomSanitizer,
    private sharedService: SharedDataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.router.events.subscribe((event: any) => {
      this.loadingBarInterceptor(event);
    });
  }
  public toggled(open: boolean): void { }
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  setlocal() {
    window.localStorage.setItem("myflag", "true");
  }
  logout() {
    this.LanguageService.googleEventTrack(
      "L3OUT",
      "currentuser",
      "UserLogout",
      10
    );
    this.FullLayoutService.logoutService().subscribe(
      data => {
        console.log("logout enters")
        if (data["Response"] == "User Logged Out") {
          window.localStorage.clear();
          this.router.navigate(["/"]);
        } else if (
          data["Response"] == "session not matches please re-login" ||
          data["Response"] == "session not matches"
        ) {
          // alert("कृपया पुन्हा लॉगइन करा")
          this.router.navigate(["/"]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      error =>
        this.toastr.error(
          "०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा."
        )
      // alert("आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा.")
    );
  }
  private loadingBarInterceptor(event: Event) {
    if (event instanceof NavigationStart) {
      this.lBar.start();
      // if (localStorage.getItem('hidemenu') == 'true')
      // {
      //   this.loaderFlag = true;
      // }
    }
    if (event instanceof NavigationEnd) {
      this.lBar.complete();
      // if (localStorage.getItem('hidemenu') == 'true')
      // {
      //   this.loaderFlag = false;
      // }
    }
  }

  downloadReward1() {
    //this.isloaded = true;
    if (this.rewardsFlag == 1) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Gold', this.moduleCompleteStatus['finishHead'], 10);
    }
    else if (this.rewardsFlag == 2) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Silver', this.moduleCompleteStatus['finishHead'], 10);
    }
    else if (this.rewardsFlag == 3) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Bronze', this.moduleCompleteStatus['finishHead'], 10);
    }
    setTimeout(() => {
      if (window.localStorage.getItem("currentstatus") == '1' ||
        window.localStorage.getItem("currentstatus") == '2' ||
        window.localStorage.getItem("currentstatus") == '3' ||
        window.localStorage.getItem("currentstatus") == '4' ||
        window.localStorage.getItem("currentstatus") == '5') {
        this.isloaded = true;
        console.log('currentstatus,downloaded1', window.localStorage.getItem("currentstatus"))
        html2canvas(this.screen.nativeElement, { backgroundColor: 'transperent' }).then(canvas => {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.isloaded = false;
          this.downloadLink.nativeElement.download = 'Reward.png';
          this.downloadLink.nativeElement.click();
        });
      } else if (window.localStorage.getItem("currentstatus") == '6') {
        this.isloaded = true;
        console.log('current 5,star', window.localStorage.getItem("currentstatus"))
        html2canvas(this.screen.nativeElement, { backgroundColor: 'transperent' }).then(canvas => {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.isloaded = false;
          this.downloadLink.nativeElement.download = 'My-Reward.png';
          this.downloadLink.nativeElement.click();
        });
      }
    }, 1200);

  }

  downloadReward() {
    //this.isloaded = true;
    if (this.rewardsFlag == 1) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Gold', this.moduleCompleteStatus['finishHead'], 10);
    }
    else if (this.rewardsFlag == 2) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Silver', this.moduleCompleteStatus['finishHead'], 10);
    }
    else if (this.rewardsFlag == 3) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Bronze', this.moduleCompleteStatus['finishHead'], 10);
    }
    setTimeout(() => {
      if (window.localStorage.getItem("currentstatus") == '1' ||
        window.localStorage.getItem("currentstatus") == '2' ||
        window.localStorage.getItem("currentstatus") == '3' ||
        window.localStorage.getItem("currentstatus") == '4' ||
        window.localStorage.getItem("currentstatus") == '5') {
        this.isloaded = true;
        console.log('currentstatus', window.localStorage.getItem("currentstatus"))
        html2canvas(this.screen.nativeElement, { backgroundColor: 'transperent' }).then(canvas => {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.isloaded = false;
          this.downloadLink.nativeElement.download = 'Reward.png';
          this.downloadLink.nativeElement.click();
        });
      } else if (window.localStorage.getItem("currentstatus") == '6') {
        this.isloaded = true;
        console.log('current 5', window.localStorage.getItem("currentstatus"))
        html2canvas(this.screen.nativeElement, { backgroundColor: 'transperent' }).then(canvas => {
          this.canvas.nativeElement.src = canvas.toDataURL();
          this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
          this.isloaded = false;
          this.downloadLink.nativeElement.download = 'My-Reward.png';
          this.downloadLink.nativeElement.click();
        });
      }
    }, 1200);

  }

  downloadCupReward() {
    if (this.cupImg == 1) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Gold', "CupImage", 10);
    }
    else if (this.cupImg == 2) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Silver', "CupImage", 10);
    }
    else if (this.cupImg == 3) {
      this.LanguageService.googleEventTrack('L3RewardDownload', 'Bronze', "CupImage", 10);
    }
    this.isloaded = true;
    setTimeout(() => {
      html2canvas(this.cupPopup.nativeElement, { backgroundColor: 'transperent' }).then(canvas => {
        this.canvascup.nativeElement.src = canvas.toDataURL();
        this.downloadLinkcup.nativeElement.href = canvas.toDataURL('image/png');
        this.isloaded = false;
        this.downloadLinkcup.nativeElement.download = 'CupReward.png';
        this.downloadLinkcup.nativeElement.click();
      });
    }, 100);
  }

  shareReward() {
    document.getElementById("popup").style.backgroundColor = '#ffffff'
    html2canvas(document.body).then(
      canvas => {
        // Export canvas as a blob  
        this.shareableImage = canvas;
        canvas.toBlob(function (blob) {
          console.log(blob);
          setTimeout(() => {
            //fileSaver.saveAs(blob, "My-Reward.png")
            var file = this.dataURLtoFile(blob, "My-Reward.png");
            var shareUrl = "whatsapp://send?text=" + file.name;
            this.getImage = this._sanitizer.bypassSecurityTrustResourceUrl(shareUrl);
            console.log(file, file.name, this.getImage)
          }, 1000);
        });
      });
    jQuery("#popup").css({ 'background-color': '', 'opacity': '' });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  mainFlag;

  ngOnInit() {
    // document.querySelector("#content").classList.remove("ml-0");
    // if (this.moduleCompleteStatus["type"] == "submodule")
    // {
    //   this.setInterval()
    // } else
    // {
    //   this.setInterval()
    // }
    this.hideMenuFlag = false;
    this.profileFlag = window.localStorage.getItem("is_profile_visible");
    this.starPopupFlag = false;
    this.subscription = this.sharedService.getData().subscribe(data => {
      console.log("sharedServicedata", data);
      if (data) {
        this.mainFlag = data["currentstatusFlag"];
        if (data["currentstatus"] != undefined && data["currentstatus"] != null && data["currentstatus"] != "") {
          this.currentStatus(data["currentstatus"]);
        }
        this.sharedData = data;
        console.log(data);
        if (
          this.sharedData["isAdmin"] != null &&
          this.sharedData["isAdmin"] != "" &&
          this.sharedData["isAdmin"] != undefined
        ) {
          if (this.sharedData["isAdmin"] == true) {
            this.loaderFlag = true;
            setTimeout(() => {
              this.loaderFlag = false;
            }, 2000);
          }
        }
      }
    });

    jQuery("#sidebarCollapse").on("click", function () {
      jQuery("#sidebar").toggleClass("active");
    });

    console.log("full");
    //Module 0
    this.module0OnOffFlag = true;
    // this.currentFlag0=true
    // this.mainFlagModule0=4;
    if (
      window.localStorage.getItem("firstname") != null &&
      window.localStorage.getItem("firstname") != null &&
      window.localStorage.getItem("firstname") != null
    ) {
      this.userName = window.localStorage.getItem("firstname");
    }

    if (
      window.localStorage.getItem("moduleFinishCount") != null &&
      window.localStorage.getItem("moduleFinishCount") != null &&
      window.localStorage.getItem("moduleFinishCount") != null
    ) {
      this.moduleFinishCount = JSON.parse(
        window.localStorage.getItem("moduleFinishCount")
      );
    }


    this.hideMenuAdminFlag = false;
    this.mainFlagModule7 = 0;
    if (window.localStorage.getItem("token") == null) {
      // this.router.navigate(["/"]);
    } else {
      this.moduleStatusCheck = parseInt(
        window.localStorage.getItem("currentstatus")
      );
      this.homeLinkEnabled = true;

      this.currentFlag0 = false;

      this.currentFlag1 = false;
      this.currentFlag2 = false;
      this.currentFlag3 = false;
      this.currentFlag4 = false;
      this.currentFlag5 = false;
      this.currentFlag6 = false;
      this.currentFlag7 = false;
      this.temp = false;
      this.module5OnOffFlag = false;
      this.module4OnOffFlag = false;
      this.module2OnOffFlag = false;
      this.module3OnOffFlag = false;
      this.module1OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.admin = this.LocalstoragedetailsService.userName;
      this.userId = this.LocalstoragedetailsService.userId;
      this.token = this.LocalstoragedetailsService.token;
      if (
        localStorage.getItem("group_name") != "" &&
        localStorage.getItem("group_name") != null &&
        localStorage.getItem("group_name") != undefined
      ) {
        this.userType = localStorage.getItem("group_name");
      }
      // this.userType = this.LocalstoragedetailsService.userType;
      this.modalDisplay = true;
      this.LocalstoragedetailsService.timelineState = this.moduleStatusCheck;
      this.DashboardService.getProfilePic(this.userId).subscribe(
        data => {
          if (data["results"].length != 0) {
            this.imgUrl = data["results"][0].file;
          }
          console.log(data)
        },
        error =>
          this.toastr.error(
            "०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा."
          )
      );

      this.setDisableMenu();
    }
    this.statusFlag = true;

    this.levelData = JSON.parse(localStorage.getItem("levelData"));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.router.url == 'admin_panel') {
      // this.hideMenu();
    }
  }

  setInterval() {
    interval(1000)
      .pipe(take(3))
      .subscribe(value => {
        this.intVal = value;
      });
  }

  langChange(e) {
    if (e.target.checked) {
      this.LanguageService.changeLanguage("mr");
    } else {
      this.LanguageService.changeLanguage("en");
    }
  }

  hideSideMenu() {
    document.querySelector("body").classList.add("sidebar-hidden");
  }
  // @HostListener("window:scroll", ["$event"]) onScrollEvent($event) {
  //   if (
  //     document.body.scrollTop > 15 ||
  //     document.documentElement.scrollTop > 15
  //   ) {
  //     document.querySelector(".app-header").classList.add("scrollAnimation");
  //   } else {
  //     document.querySelector(".app-header").classList.remove("scrollAnimation");
  //   }
  // }
  // @HostListener("document:click", ["$event"]) clickedOutside() {
  //   console.log('hello host')
  //   if(jQuery('#sidebar').hasClass('active')){
  //     jQuery('#sidebar').removeClass('active')
  //   }
  //   // document.querySelector("body").classList.remove("sidebar-mobile-show");
  // }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('hello...')
  }

  checkPassword() {
    if (
      this.confirmPassword1 != null &&
      this.confirmPassword1 != "" &&
      this.confirmPassword1 != undefined
    ) {
      if (this.newPasswordChange1 == this.confirmPassword1) {
        this.confirmPaswwordTrue = true;
      } else {
        this.confirmPaswwordTrue = false;
      }
    }
  }
  clearFieldsResetPassword() {
    this.passwordChangeModal.show();
    this.LanguageService.toShow();
    this.newPasswordChange1 = "";
    this.passwordChange = "";
    this.confirmPassword1 = "";
    this.confirmPaswwordTrue = false;
  }
  changePassword() {
    if (this.passwordChange == this.newPasswordChange1) {
      this.toastr.error("नवीन पासवर्ड आणि पूर्वीचा पासवर्ड सारखा नसावा.");
    } else {
      var changePasswordJson =
        '{"oldpassword":"' +
        this.passwordChange +
        '","newpassword":"' +
        this.newPasswordChange1 +
        '","confirmpassword":"' +
        this.confirmPassword1 +
        '"}';

      this.ProfileService.changePassword(
        changePasswordJson
      ).subscribe(
        data => {
          if (data["Response"] == "Password Changed Successfully") {
            this.toastr.success("पासवर्ड यशस्वीरीत्या बदलला.");

            this.passwordChangeModal.hide();
            this.LanguageService.toHide();
          } else if (data["Response"] == "Wrong Old Password.") {
            this.toastr.error("पूर्वीचा पासवर्ड चुकीचा आहे.");

            document.getElementById("passwordChange").focus();
          } else if (data["Response"] == "Password did not Match") {
            this.toastr.error("पासवर्ड अयोग्य.");
          } else if (
            data["Response"] == "session not matches please re-login"
          ) {
            this.toastr.error(
              "०१४: आपला सेशन कालबाह्य झाला आहे, कृपया पुन्हा  लॉगइन करा."
            );
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 4000);
          } else {
            this.toastr.error("आपली माहिती पुन्हा तपासून पाहा.");
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        } //Catch Error if server is not Found
      );
    }
  }

  currentStatus(moduleNo) {
    if (window.localStorage.getItem("profileComplete") == "false") {
      this.toastr.error(
        "तुमची पप्रोफाइल अपूर्ण आहे , कृपया प्रोफाइल पूर्ण करा "
      );
    } else if (window.localStorage.getItem("profileComplete") != "false") {
      this.temp = false;
      if (moduleNo >= 5) {
        this.jsonBody["module"] = "5";
      } else if (moduleNo == 4) {
        this.jsonBody["module"] = "4";
      } else if (moduleNo == 2) {
        this.jsonBody["module"] = "2";
      } else if (moduleNo == 3) {
        this.jsonBody["module"] = "3";
      } else if (moduleNo == 1) {
        this.jsonBody["module"] = "1";
      } else if (moduleNo == 6) {
        this.jsonBody["module"] = "6";
      } else if (moduleNo == 7) {
        this.jsonBody["module"] = "7";
      } else if (moduleNo == 0) {
        this.jsonBody["module"] = "0";
      }
      this.FullLayoutService.moduleStatus(this.jsonBody).subscribe(
        data => {
          window.localStorage.setItem(
            "currentJson" + moduleNo,
            JSON.stringify(data["data"])
          );
          window.localStorage.setItem(
            "currentModule",
            JSON.stringify(moduleNo)
          );
          this.currentData = data["data"];
          this.parseObject(this.currentData);
          this.FullLayoutService.setCurrentStatus1(data["data"]);
          if (moduleNo == 5) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus(status);
            this.currentFlag5 = true;
          } else if (moduleNo == 4) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus4(status);
            this.currentFlag4 = true;
          } else if (moduleNo == 2) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus2(status);
            this.currentFlag2 = true;
          } else if (moduleNo == 3) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus3(status);
            this.currentFlag3 = true;
          } else if (moduleNo == 1) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus1(status);
            this.currentFlag1 = true;
          } else if (moduleNo == 6) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus6(status);
            this.currentFlag6 = true;
          } else if (moduleNo == 7) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus7(status);
            this.currentFlag7 = true; //chech then remove
          } else if (moduleNo == 0) {
            var status = false;
            if (data["data"].completedstatus == true) {
              status = true;
            }
            this.setStatus0(status);
            this.currentFlag0 = true; //chech then remove
          }
        },
        error => {
          // if (error.error.message == "session not matches please re-login") {
          //   this.toastr.error(
          //     "०१४: आपला सेशन कालबाह्य झाला आहे, कृपया पुन्हा  लॉगइन करा."
          //   );
          //   setTimeout(() => {
          //     this.router.navigate(["/"]);
          //   }, 4000);
          // } else
          if (
            error.error.message == "wrong module number" ||
            error.error.message == 'unknown source"'
          ) {
            if (moduleNo == 5) {
              this.router.navigate(["/modules/module5"]);
            } else if (moduleNo == 4) {
              this.router.navigate(["/modules/module4"]);
            } else if (moduleNo == 6) {
              this.toastr.error("तुमचे आधीचे मॉड्यूल पुर्ण करा.");
              setTimeout(() => {
                this.router.navigate(["/dashboard"]);
              }, 4000);
            }
          } else if (
            error.error.message == "json key error" ||
            error.error.message == "current status not available"
          ) {
            this.toastr.error("००४: चुकीची माहिती, कृपया पुन्हा प्रयत्न करा.");
            if (moduleNo == 5) {
              this.router.navigate(["/modules/module5"]);
            } else if (moduleNo == 4) {
              this.router.navigate(["/modules/module4"]);
            }
          } else if (error.error.message == 'access denied"') {
            this.toastr.error(
              "०१२: अनुमती नाकारण्यात आली आहे, कृपया पुन्हा लॉगइन करा / योग्य विनंती पाठवा."
            );
            setTimeout(() => {
              this.router.navigate(["/dashboard"]);
            }, 4000);
          } else if (
            error.error.message == "coordinator not aprroved for this user" ||
            error.error.message == "authorization failed" ||
            error.error.message == "user not in date"
          ) {
            if (moduleNo == 1) {
              this.currentFlag1 = true;
              this.module1OnOffFlag = false;
            } else if (moduleNo == 2) {
              this.currentFlag2 = true;
              this.module2OnOffFlag = false;
            } else if (moduleNo == 3) {
              this.currentFlag3 = true;
              this.module3OnOffFlag = false;
            } else if (moduleNo == 4) {
              this.currentFlag4 = true;
              this.module4OnOffFlag = false;
            } else if (moduleNo == 5) {
              this.currentFlag5 = true;
              this.module5OnOffFlag = false;
            } else if (moduleNo == 6) {
              this.currentFlag6 = true;
              this.module6OnOffFlag = false;
            } else if (moduleNo == 7) {
              this.currentFlag7 = true;
              this.module7OnOffFlag = false;
            } else if (moduleNo == 0) {
              this.currentFlag0 = true;
              this.module0OnOffFlag = false;
            }
            if (window.localStorage.getItem("group_name") == "master_trainer") {
              this.toastr.error(
                "तुमचा प्रशिक्षण कालावधी समाप्त झाला आहे. त्यामुळे फक्त तालुकानिहाय रिपोर्ट उपलब्ध आहे."
              );
            } else {
              this.toastr.error(
                "तुमचा प्रशिक्षण कालावधी समाप्त झाला आहे किंवा सुरु झाला नाही."
              );
            }
            this.router.navigate(["/dashboard"]);
          } else {
            // this.toastr.error(
            //   "०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा."
            // );
            this.LanguageService.handleError(error.error.message);
          }
        }
      );
    }
  }

  parseObject(obj) {
    if (this.temp == false) {
      var i = 0;
      for (var key in obj) {
        // console.log("objuuif", obj)
        if (key == "uuid") {
          if (obj[key] != null) {
            if (
              obj["currentstatus"] == true &&
              obj["completedstatus"] == false
            ) {
              window.localStorage.setItem("uuid", obj[key]);
              window.localStorage.setItem("source", obj["source"]);
              this.temp = true;
              break;
            }
          }
        }
        if (obj[key] instanceof Object) {
          this.parseObject(obj[key]);
        }
      }
    }
  }
  //Set status for module5- to set mainFlagModule5,subFlagModule5
  setStatus(val) {
    if (val == true) {
      this.mainFlagModule5 = 25;
      this.subFlagModule5 = 1;
    } else {
      var source = window.localStorage.getItem("source");
      if (
        source == "module 5.1" ||
        source == "module 5.1.1" ||
        source == "module 5.1.2"
      ) {
        this.mainFlagModule5 = 1;
        if (source == "module 5.1.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.1.2") {
          this.subFlagModule5 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.2" ||
        source == "module 5.2.1" ||
        source == "module 5.2.2" ||
        source == "module 5.2.3"
      ) {
        this.mainFlagModule5 = 2;
        if (source == "module 5.2.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.2.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.2.3") {
          this.subFlagModule5 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.3" ||
        source == "module 5.3.1" ||
        source == "module 5.3.2" ||
        source == "module 5.3.3"
      ) {
        this.mainFlagModule5 = 3;
        if (source == "module 5.3.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.3.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.3.3") {
          this.subFlagModule5 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.4" ||
        source == "module 5.4.1" ||
        source == "module 5.4.2" ||
        source == "module 5.4.3"
      ) {
        this.mainFlagModule5 = 4;
        if (source == "module 5.4.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.4.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.4.3") {
          this.subFlagModule5 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.5" ||
        source == "module 5.5.1" ||
        source == "module 5.5.2" ||
        source == "module 5.5.3"
      ) {
        this.mainFlagModule5 = 5;
        if (source == "module 5.5.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.5.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.5.3") {
          this.subFlagModule5 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.6" ||
        source == "module 5.6.1" ||
        source == "module 5.6.2"
      ) {
        this.mainFlagModule5 = 6;
        if (source == "module 5.6.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.6.2") {
          this.subFlagModule5 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.7") {
        this.mainFlagModule5 = 7;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.8" || source == "module 5.8.1" ||
        source == "module 5.8.1") {
        this.mainFlagModule5 = 8;
        if (source == "module 5.8" || source == "module 5.8.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.8.2") {
          this.subFlagModule5 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.9") {
        this.mainFlagModule5 = 9;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.10") {
        this.mainFlagModule5 = 10;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.11") {
        this.mainFlagModule5 = 11;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.12") {
        this.mainFlagModule5 = 12;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.13") {
        this.mainFlagModule5 = 13;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.14") {
        this.mainFlagModule5 = 14;
        this.subFlagModule5 = 1;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.15" ||
        source == "module 5.15.1" ||
        source == "module 5.15.2"
      ) {
        this.mainFlagModule5 = 15;
        if (source == "module 5.15.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.15.2") {
          this.subFlagModule5 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.16") {
        this.mainFlagModule5 = 16;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.17" ||
        source == "module 5.17.1" ||
        source == "module 5.17.2"
      ) {
        this.mainFlagModule5 = 17;
        if (source == "module 5.17.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.17.2") {
          this.subFlagModule5 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.18" ||
        source == "module 5.18.1" ||
        source == "module 5.18.2" ||
        source == "module 5.18.3" ||
        source == "module 5.18.4") {
        this.mainFlagModule5 = 18;
        if (source == "module 5.18.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.18.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.18.3") {
          this.subFlagModule5 = 3;
        } else if (source == "module 5.18.4") {
          this.subFlagModule5 = 4;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.19") {
        this.mainFlagModule5 = 19;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.20") {
        this.mainFlagModule5 = 20;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.21" ||
        source == "module 5.21.1" ||
        source == "module 5.21.2" ||
        source == "module 5.21.3"
      ) {
        this.mainFlagModule5 = 21;
        if (source == "module 5.21.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.21.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.21.3") {
          this.subFlagModule5 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.22") {
        this.mainFlagModule5 = 22;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (
        source == "module 5.23" ||
        source == "module 5.23.1" ||
        source == "module 5.23.2" ||
        source == "module 5.23.3" ||
        source == "module 5.23.4" ||
        source == "module 5.23.5" ||
        source == "module 5.23.6" ||
        source == "module 5.23.6.1" ||
        source == "module 5.23.6.2" ||
        source == "module 5.23.6.3"
      ) {
        this.mainFlagModule5 = 23;
        if (source == "module 5.23.1") {
          this.subFlagModule5 = 1;
        } else if (source == "module 5.23.2") {
          this.subFlagModule5 = 2;
        } else if (source == "module 5.23.3") {
          this.subFlagModule5 = 3;
        } else if (source == "module 5.23.4") {
          this.subFlagModule5 = 4;
        } else if (source == "module 5.23.5") {
          this.subFlagModule5 = 5;
        } else if (source == "module 5.23.6" || source == "module 5.23.6.1" || source == "module 5.23.6.2" || source == "module 5.23.6.3") {
          this.subFlagModule5 = 6;
        }
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      } else if (source == "module 5.24") {
        this.mainFlagModule5 = 24;
        window.localStorage.setItem(
          "subFlagModule5",
          this.subFlagModule5.toString()
        );
      }
    }
    this.LocalstoragedetailsService.setModule5Falgs(
      this.mainFlagModule5,
      this.subFlagModule5
    );
    window.localStorage.setItem(
      "mainFlagModule5",
      this.mainFlagModule5.toString()
    );
  }

  setStatus4(val) {
    if (val == true) {
      this.mainFlagModule4 = 15;
    } else {
      var source = window.localStorage.getItem("source");
      if (source == "module 4.1.1" || source == "module 4.2.1") {
        this.mainFlagModule4 = 1;
        if (source == "module 4.1.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.2.1") {
          this.subFlagModule4 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (source == "module 4.2" ||
        source == "module 4.2.1" ||
        source == "module 4.2.2") {
        this.mainFlagModule4 = 2;
        if (source == "module 4.2" || source == "module 4.2.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.2.2") {
          this.subFlagModule4 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.3" ||
        source == "module 4.3.1" ||
        source == "module 4.3.2" ||
        source == "module 4.3.3"
      ) {
        this.mainFlagModule4 = 3;
        if (source == "module 4.3.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.3.2") {
          this.subFlagModule4 = 2;
        } else if (source == "module 4.3.3") {
          this.subFlagModule4 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.4" ||
        source == "module 4.4.1" ||
        source == "module 4.4.2" ||
        source == "module 4.4.3"
      ) {
        this.mainFlagModule4 = 4;
        if (source == "module 4.4.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.4.2") {
          this.subFlagModule4 = 2;
        } else if (source == "module 4.4.3") {
          this.subFlagModule4 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.5" ||
        source == "module 4.5.1" ||
        source == "module 4.5.2" ||
        source == "module 4.5.3" ||
        source == "module 4.5.4" ||
        source == "module 4.5.5"
      ) {
        this.mainFlagModule4 = 5;
        if (source == "module 4.5.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.5.2") {
          this.subFlagModule4 = 2;
        } else if (source == "module 4.5.3") {
          this.subFlagModule4 = 3;
        } else if (source == "module 4.5.4") {
          this.subFlagModule4 = 4;
        } else if (source == "module 4.5.5") {
          this.subFlagModule4 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.6" ||
        source == "module 4.6.1" ||
        source == "module 4.6.2" ||
        source == "module 4.6.2.1" ||
        source == "module 4.6.2.2" ||
        source == "module 4.6.2.3"
      ) {
        this.mainFlagModule4 = 6;
        if (source == "module 4.6.1") {
          this.subFlagModule4 = 1;
        } else if (
          source == "module 4.6.2" ||
          source == "module 4.6.2.1" ||
          source == "module 4.6.2.2" ||
          source == "module 4.6.2.3"
        ) {
          this.subFlagModule4 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.7" ||
        source == "module 4.7.1" ||
        source == "module 4.7.2" ||
        source == "module 4.7.3" ||
        source == "module 4.7.4" ||
        source == "module 4.7.5"
      ) {
        this.mainFlagModule4 = 7;
        if (source == "module 4.7.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.7.2") {
          this.subFlagModule4 = 2;
        } else if (source == "module 4.7.3") {
          this.subFlagModule4 = 3;
        } else if (source == "module 4.7.4") {
          this.subFlagModule4 = 4;
        } else if (source == "module 4.7.5") {
          this.subFlagModule4 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (source == "module 4.8") {
        this.mainFlagModule4 = 8;
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.9" ||
        source == "module 4.9.1" ||
        source == "module 4.9.2"
      ) {
        this.mainFlagModule4 = 9;
        if (source == "module 4.9.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.9.2") {
          this.subFlagModule4 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.10" ||
        source == "module 4.10.1" ||
        source == "module 4.10.2"
      ) {
        this.mainFlagModule4 = 10;
        if (source == "module 4.10.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.10.2") {
          this.subFlagModule4 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (source == "module 4.11") {
        this.mainFlagModule4 = 11;
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (source == "module 4.12") {
        this.mainFlagModule4 = 12;
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (
        source == "module 4.13" ||
        source == "module 4.13.1" ||
        source == "module 4.13.2" ||
        source == "module 4.13.3" ||
        source == "module 4.13.4" ||
        source == "module 4.13.4.1" ||
        source == "module 4.13.4.2" ||
        source == "module 4.13.4.3" ||
        source == "module 4.13.5" ||
        source == "module 4.13.6"
      ) {
        this.mainFlagModule4 = 13;
        if (source == "module 4.13.1") {
          this.subFlagModule4 = 1;
        } else if (source == "module 4.13.2") {
          this.subFlagModule4 = 2;
        } else if (source == "module 4.13.3") {
          this.subFlagModule4 = 3;
        } else if (
          source == "module 4.13.4" ||
          source == "module 4.13.4.1" ||
          source == "module 4.13.4.2" ||
          source == "module 4.13.4.3"
        ) {
          this.subFlagModule4 = 4;
        } else if (source == "module 4.13.5") {
          this.subFlagModule4 = 5;
        } else if (source == "module 4.13.6") {
          this.subFlagModule4 = 6;
        }
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      } else if (source == "module 4.14") {
        this.mainFlagModule4 = 14;
        window.localStorage.setItem(
          "subFlagModule4",
          this.subFlagModule4.toString()
        );
      }
    }
    window.localStorage.setItem(
      "mainFlagModule4",
      this.mainFlagModule4.toString()
    );
  }
  setStatus2(val) {
    console.log("so ", window.localStorage.getItem("source"));
    if (val == true) {
      this.mainFlagModule2 = 18;
    } else {
      var source = window.localStorage.getItem("source");

      if (
        source == "module 2.1" ||
        source == "module 2.1.1" ||
        source == "module 2.1.2"
      ) {
        this.mainFlagModule2 = 1;
        if (source == "module 2.1.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.1.2") {
          this.subFlagModule2 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.2" ||
        source == "module 2.2.1" ||
        source == "module 2.2.2" ||
        source == "module 2.2.3"
      ) {
        this.mainFlagModule2 = 2;
        if (source == "module 2.2.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.2.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.2.3") {
          this.subFlagModule2 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.3" ||
        source == "module 2.3.1" ||
        source == "module 2.3.2" ||
        source == "module 2.3.3" ||
        source == "module 2.3.4" ||
        source == "module 2.3.5"
      ) {
        this.mainFlagModule2 = 3;
        if (source == "module 2.3.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.3.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.3.3") {
          this.subFlagModule2 = 3;
        } else if (source == "module 2.3.4") {
          this.subFlagModule2 = 4;
        } else if (source == "module 2.3.5") {
          this.subFlagModule2 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.4" ||
        source == "module 2.4.1" ||
        source == "module 2.4.2"
      ) {
        this.mainFlagModule2 = 4;
        if (source == "module 2.4.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.4.2") {
          this.subFlagModule2 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.5" ||
        source == "module 2.5.1" ||
        source == "module 2.5.2" ||
        source == "module 2.5.3"
      ) {
        this.mainFlagModule2 = 5;
        if (source == "module 2.5.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.5.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.5.3") {
          this.subFlagModule2 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (source == "module 2.6") {
        this.mainFlagModule2 = 6;
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.7" ||
        source == "module 2.7.1" ||
        source == "module 2.7.2"
      ) {
        this.mainFlagModule2 = 7;
        if (source == "module 2.7.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.7.2") {
          this.subFlagModule2 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.8" ||
        source == "module 2.8.1" ||
        source == "module 2.8.2" ||
        source == "module 2.8.3"
      ) {
        this.mainFlagModule2 = 8;
        if (source == "module 2.8.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.8.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.8.3") {
          this.subFlagModule2 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.9" ||
        source == "module 2.9.1" ||
        source == "module 2.9.2" ||
        source == "module 2.9.3" ||
        source == "module 2.9.4" ||
        source == "module 2.9.5" ||
        source == "module 2.9.6" ||
        source == "module 2.9.7"
      ) {
        this.mainFlagModule2 = 9;
        if (source == "module 2.9.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.9.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.9.3") {
          this.subFlagModule2 = 3;
        } else if (source == "module 2.9.4") {
          this.subFlagModule2 = 4;
        } else if (source == "module 2.9.5") {
          this.subFlagModule2 = 5;
        } else if (source == "module 2.9.6") {
          this.subFlagModule2 = 6;
        } else if (source == "module 2.9.7") {
          this.subFlagModule2 = 7;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.10" ||
        source == "module 2.10.1" ||
        source == "module 2.10.2" ||
        source == "module 2.10.3"
      ) {
        this.mainFlagModule2 = 10;
        if (source == "module 2.10.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.10.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.10.3") {
          this.subFlagModule2 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.11" ||
        source == "module 2.11.1" ||
        source == "module 2.11.2" ||
        source == "module 2.11.3" ||
        source == "module 2.11.4" ||
        source == "module 2.11.5"
      ) {
        this.mainFlagModule2 = 11;
        if (source == "module 2.11.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.11.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.11.3") {
          this.subFlagModule2 = 3;
        } else if (source == "module 2.11.4") {
          this.subFlagModule2 = 4;
        } else if (source == "module 2.11.5") {
          this.subFlagModule2 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.12" ||
        source == "module 2.12.1" ||
        source == "module 2.12.2" ||
        source == "module 2.12.3" ||
        source == "module 2.12.4"
      ) {
        this.mainFlagModule2 = 12;
        if (source == "module 2.12.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.12.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.12.3") {
          this.subFlagModule2 = 3;
        } else if (source == "module 2.12.4") {
          this.subFlagModule2 = 4;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.13" ||
        source == "module 2.13.1" ||
        source == "module 2.13.2" ||
        source == "module 2.13.2.1" ||
        source == "module 2.13.2.2"
      ) {
        this.mainFlagModule2 = 13;
        if (source == "module 2.13.1") {
          this.subFlagModule2 = 1;
        } else if (
          source == "module 2.13.2" ||
          source == "module 2.13.2.1" ||
          source == "module 2.13.2.2"
        ) {
          this.subFlagModule2 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (source == "module 2.14") {
        this.mainFlagModule2 = 14;
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (
        source == "module 2.15" ||
        source == "module 2.15.1" ||
        source == "module 2.15.2" ||
        source == "module 2.15.3" ||
        source == "module 2.15.4" ||
        source == "module 2.15.4.1" ||
        source == "module 2.15.4.2" ||
        source == "module 2.15.4.3" ||
        source == "module 2.15.5" ||
        source == "module 2.15.6"
      ) {
        this.mainFlagModule2 = 15;
        if (source == "module 2.15.1") {
          this.subFlagModule2 = 1;
        } else if (source == "module 2.15.2") {
          this.subFlagModule2 = 2;
        } else if (source == "module 2.15.3") {
          this.subFlagModule2 = 3;
        } else if (
          source == "module 2.15.4" ||
          source == "module 2.15.4.1" ||
          source == "module 2.15.4.2" ||
          source == "module 2.15.4.3"
        ) {
          this.subFlagModule2 = 4;
        } else if (source == "module 2.15.5") {
          this.subFlagModule2 = 5;
        } else if (source == "module 2.15.6") {
          this.subFlagModule2 = 6;
        }
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (source == "module 2.16") {
        this.mainFlagModule2 = 16;
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      } else if (source == "module 2.17") {
        this.mainFlagModule2 = 17;
        window.localStorage.setItem(
          "subFlagModule2",
          this.subFlagModule2.toString()
        );
      }
    }
    window.localStorage.setItem(
      "mainFlagModule2",
      this.mainFlagModule2.toString()
    );
    console.log("adsasd ", this.mainFlagModule2);
  }

  setStatus3(val) {
    if (val == true) {
      this.mainFlagModule3 = 19;
    } else {
      var source = window.localStorage.getItem("source");
      if (
        source == "module 3.1" ||
        source == "module 3.1.1" ||
        source == "module 3.1.2" ||
        source == "module 3.1.2.1" ||
        source == "module 3.1.2.2" ||
        source == "module 3.1.2.3" ||
        source == "module 3.1.2.4" ||
        source == "module 3.1.2.5" ||
        source == "module 3.1.2.6" ||
        source == "module 3.1.2.7" ||
        source == "module 3.1.2.8"
      ) {
        this.mainFlagModule3 = 1;
        if (source == "module 3.1.1") {
          this.subFlagModule3 = 1;
        } else if (
          source == "module 3.1.2" ||
          source == "module 3.1.2.1" ||
          source == "module 3.1.2.2" ||
          source == "module 3.1.2.3" ||
          source == "module 3.1.2.4" ||
          source == "module 3.1.2.5" ||
          source == "module 3.1.2.6" ||
          source == "module 3.1.2.7" ||
          source == "module 3.1.2.8"
        ) {
          this.subFlagModule3 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.2" ||
        source == "module 3.2.1" ||
        source == "module 3.2.2"
      ) {
        this.mainFlagModule3 = 2;
        if (source == "module 3.2.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.2.2") {
          this.subFlagModule3 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.3" ||
        source == "module 3.3.1" ||
        source == "module 3.3.2" ||
        source == "module 3.3.3"
      ) {
        this.mainFlagModule3 = 3;
        if (source == "module 3.3.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.3.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.3.3") {
          this.subFlagModule3 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.4" ||
        source == "module 3.4.1" ||
        source == "module 3.4.2" ||
        source == "module 3.4.2.1" ||
        source == "module 3.4.2.2" ||
        source == "module 3.4.2.3"
      ) {
        this.mainFlagModule3 = 4;
        if (source == "module 3.4.1") {
          this.subFlagModule3 = 1;
        } else if (
          source == "module 3.4.2" ||
          source == "module 3.4.2.1" ||
          source == "module 3.4.2.2" ||
          source == "module 3.4.2.3"
        ) {
          this.subFlagModule3 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.5" ||
        source == "module 3.5.1" ||
        source == "module 3.5.2" ||
        source == "module 3.5.3" ||
        source == "module 3.5.4" ||
        source == "module 3.5.5"
      ) {
        this.mainFlagModule3 = 5;
        if (source == "module 3.5.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.5.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.5.3") {
          this.subFlagModule3 = 3;
        } else if (source == "module 3.5.4") {
          this.subFlagModule3 = 4;
        } else if (source == "module 3.5.5") {
          this.subFlagModule3 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.6" ||
        source == "module 3.6.1" ||
        source == "module 3.6.2" ||
        source == "module 3.6.3"
      ) {
        this.mainFlagModule3 = 6;
        if (source == "module 3.6.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.6.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.6.3") {
          this.subFlagModule3 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (source == "module 3.7") {
        this.subFlagModule3 = 1;
        this.mainFlagModule3 = 7;
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.8" ||
        source == "module 3.8.1" ||
        source == "module 3.8.2" ||
        source == "module 3.8.3"
      ) {
        this.mainFlagModule3 = 8;
        if (source == "module 3.8.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.8.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.8.3") {
          this.subFlagModule3 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.9" ||
        source == "module 3.9.1" ||
        source == "module 3.9.2" ||
        source == "module 3.9.3" ||
        source == "module 3.9.4" ||
        source == "module 3.9.5"
      ) {
        this.mainFlagModule3 = 9;
        if (source == "module 3.9.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.9.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.9.3") {
          this.subFlagModule3 = 3;
        } else if (source == "module 3.9.4") {
          this.subFlagModule3 = 4;
        } else if (source == "module 3.9.5") {
          this.subFlagModule3 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.10" ||
        source == "module 3.10.1" ||
        source == "module 3.10.2" ||
        source == "module 3.10.3"
      ) {
        this.mainFlagModule3 = 10;
        if (source == "module 3.10.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.10.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.10.3") {
          this.subFlagModule3 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.11" ||
        source == "module 3.11.1" ||
        source == "module 3.11.2" ||
        source == "module 3.11.3" ||
        source == "module 3.11.4" ||
        source == "module 3.11.5"
      ) {
        this.mainFlagModule3 = 11;
        if (source == "module 3.11.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.11.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.11.3") {
          this.subFlagModule3 = 3;
        } else if (source == "module 3.11.4") {
          this.subFlagModule3 = 4;
        } else if (source == "module 3.11.5") {
          this.subFlagModule3 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.12" ||
        source == "module 3.12.1" ||
        source == "module 3.12.2" ||
        source == "module 3.12.3"
      ) {
        this.mainFlagModule3 = 12;
        if (source == "module 3.12.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.12.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.12.3") {
          this.subFlagModule3 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.13" ||
        source == "module 3.13.1" ||
        source == "module 3.13.2" ||
        source == "module 3.13.2.1" ||
        source == "module 3.13.2.2" ||
        source == "module 3.13.2.3"
      ) {
        this.mainFlagModule3 = 13;
        if (source == "module 3.13.1") {
          this.subFlagModule3 = 1;
        } else if (
          source == "module 3.13.2" ||
          source == "module 3.13.2.1" ||
          source == "module 3.13.2.2" ||
          source == "module 3.13.2.3"
        ) {
          this.subFlagModule3 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (source == "module 3.14") {
        this.subFlagModule3 = 1;
        this.mainFlagModule3 = 14;
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (source == "module 3.15") {
        this.subFlagModule3 = 1;
        this.mainFlagModule3 = 15;
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (
        source == "module 3.16" ||
        source == "module 3.16.1" ||
        source == "module 3.16.2" ||
        source == "module 3.16.3" ||
        source == "module 3.16.4" ||
        source == "module 3.16.4.1" ||
        source == "module 3.16.4.2" ||
        source == "module 3.16.4.3" ||
        source == "module 3.16.5" ||
        source == "module 3.16.6"
      ) {
        this.mainFlagModule3 = 16;
        if (source == "module 3.16.1") {
          this.subFlagModule3 = 1;
        } else if (source == "module 3.16.2") {
          this.subFlagModule3 = 2;
        } else if (source == "module 3.16.3") {
          this.subFlagModule3 = 3;
        } else if (
          source == "module 3.16.4" ||
          source == "module 3.16.4.1" ||
          source == "module 3.16.4.2" ||
          source == "module 3.16.4.3"
        ) {
          this.subFlagModule3 = 4;
        } else if (source == "module 3.16.5") {
          this.subFlagModule3 = 5;
        } else if (source == "module 3.16.6") {
          this.subFlagModule3 = 6;
        }
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (source == "module 3.17") {
        this.subFlagModule3 = 1;
        this.mainFlagModule3 = 17;
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      } else if (source == "module 3.18") {
        this.subFlagModule3 = 1;
        this.mainFlagModule3 = 18;
        window.localStorage.setItem(
          "subFlagModule3",
          this.subFlagModule3.toString()
        );
      }
    }
    window.localStorage.setItem(
      "mainFlagModule3",
      this.mainFlagModule3.toString()
    );
  }
  setStatus1(val) {
    if (val == true) {
      this.mainFlagModule1 = 16;
    } else {
      var source = window.localStorage.getItem("source");

      if (source == "module 1" ||
        source == "module 1.1" ||
        source == "module 1.1.1" ||
        source == "module 1.1.2" ||
        source == "module 1.1.2.1" ||
        source == "module 1.1.2.2"
      ) {
        this.mainFlagModule1 = 1;
        if (source == "module 1.1.1") {
          this.subFlagModule1 = 1;
        } else if (
          source == "module 1.1.2" ||
          source == "module 1.1.2.1" ||
          source == "module 1.1.2.2"
        ) {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.2" ||
        source == "module 1.2.1" ||
        source == "module 1.2.2" ||
        source == "module 1.2.3" ||
        source == "module 1.2.4" ||
        source == "module 1.2.5"
      ) {
        this.mainFlagModule1 = 2;
        if (source == "module 1.2.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.2.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.2.3") {
          this.subFlagModule1 = 3;
        } else if (source == "module 1.2.4") {
          this.subFlagModule1 = 4;
        } else if (source == "module 1.2.5") {
          this.subFlagModule1 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.3" ||
        source == "module 1.3.1" ||
        source == "module 1.3.1.1" ||
        source == "module 1.3.1.2" ||
        source == "module 1.3.1.3" ||
        source == "module 1.3.2" ||
        source == "module 1.3.2.1" ||
        source == "module 1.3.2.2"
      ) {
        this.mainFlagModule1 = 3;
        if (
          source == "module 1.3.1" ||
          source == "module 1.3.1.1" ||
          source == "module 1.3.1.2" ||
          source == "module 1.3.1.3"
        ) {
          this.subFlagModule1 = 1;
        } else if (
          source == "module 1.3.2" ||
          source == "module 1.3.2.1" ||
          source == "module 1.3.2.2"
        ) {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.4" ||
        source == "module 1.4.1" ||
        source == "module 1.4.2" ||
        source == "module 1.4.3" ||
        source == "module 1.4.4" ||
        source == "module 1.4.5" ||
        source == "module 1.4.6" ||
        source == "module 1.4.7" ||
        source == "module 1.4.8" ||
        source == "module 1.4.9" ||
        source == "module 1.4.10" ||
        source == "module 1.4.11" ||
        source == "module 1.4.12"
      ) {
        this.mainFlagModule1 = 4;
        if (source == "module 1.4.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.4.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.4.3") {
          this.subFlagModule1 = 3;
        } else if (source == "module 1.4.4") {
          this.subFlagModule1 = 4;
        } else if (source == "module 1.4.5") {
          this.subFlagModule1 = 5;
        } else if (source == "module 1.4.6") {
          this.subFlagModule1 = 6;
        } else if (source == "module 1.4.7") {
          this.subFlagModule1 = 7;
        } else if (source == "module 1.4.8") {
          this.subFlagModule1 = 8;
        } else if (source == "module 1.4.9") {
          this.subFlagModule1 = 9;
        } else if (source == "module 1.4.10") {
          this.subFlagModule1 = 10;
        } else if (source == "module 1.4.11") {
          this.subFlagModule1 = 11;
        } else if (source == "module 1.4.12") {
          this.subFlagModule1 = 12;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.5" ||
        source == "module 1.5.1" ||
        source == "module 1.5.2" ||
        source == "module 1.5.2.1" ||
        source == "module 1.5.2.2"
      ) {
        this.mainFlagModule1 = 5;
        if (source == "module 1.5.1") {
          this.subFlagModule1 = 1;
        } else if (
          source == "module 1.5.2" ||
          source == "module 1.5.2.1" ||
          source == "module 1.5.2.2"
        ) {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.6" ||
        source == "module 1.6.1" ||
        source == "module 1.6.2" ||
        source == "module 1.6.3" ||
        source == "module 1.6.4" ||
        source == "module 1.6.5" ||
        source == "module 1.6.6" ||
        source == "module 1.6.7"
      ) {
        this.mainFlagModule1 = 6;
        if (source == "module 1.6.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.6.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.6.3") {
          this.subFlagModule1 = 3;
        } else if (source == "module 1.6.4") {
          this.subFlagModule1 = 4;
        } else if (source == "module 1.6.5") {
          this.subFlagModule1 = 5;
        } else if (source == "module 1.6.6") {
          this.subFlagModule1 = 6;
        } else if (source == "module 1.6.7") {
          this.subFlagModule1 = 7;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.7" ||
        source == "module 1.7.1" ||
        source == "module 1.7.2" ||
        source == "module 1.7.3"
      ) {
        this.mainFlagModule1 = 7;
        if (source == "module 1.7.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.7.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.7.3") {
          this.subFlagModule1 = 3;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.8" ||
        source == "module 1.8.1" ||
        source == "module 1.8.2" ||
        source == "module 1.8.3" ||
        source == "module 1.8.4" ||
        source == "module 1.8.5"
      ) {
        this.mainFlagModule1 = 8;
        if (source == "module 1.8.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.8.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.8.3") {
          this.subFlagModule1 = 3;
        } else if (source == "module 1.8.4") {
          this.subFlagModule1 = 4;
        } else if (source == "module 1.8.5") {
          this.subFlagModule1 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.9" ||
        source == "module 1.9.1" ||
        source == "module 1.9.2"
      ) {
        this.mainFlagModule1 = 9;
        if (source == "module 1.9.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.9.2") {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.10" ||
        source == "module 1.10.1" ||
        source == "module 1.10.2" ||
        source == "module 1.10.3" ||
        source == "module 1.10.4" ||
        source == "module 1.10.5"
      ) {
        this.mainFlagModule1 = 10;
        if (source == "module 1.10.1") {
          this.subFlagModule1 = 1;
        } else if (source == "module 1.10.2") {
          this.subFlagModule1 = 2;
        } else if (source == "module 1.10.3") {
          this.subFlagModule1 = 3;
        } else if (source == "module 1.10.4") {
          this.subFlagModule1 = 4;
        } else if (source == "module 1.10.5") {
          this.subFlagModule1 = 5;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (
        source == "module 1.11" ||
        source == "module 1.11.1" ||
        source == "module 1.11.2" ||
        source == "module 1.11.2.1" ||
        source == "module 1.11.2.2"
      ) {
        this.mainFlagModule1 = 11;
        if (source == "module 1.11.1") {
          this.subFlagModule1 = 1;
        } else if (
          source == "module 1.11.2" ||
          source == "module 1.11.2.1" ||
          source == "module 1.11.2.2"
        ) {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      } else if (source == "module 1.12") {
        this.mainFlagModule1 = 12;
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      }
      else if (
        source == "module 1.13" ||
        source == "module 1.13.1" ||
        source == "module 1.13.2" 
      ) {
        this.mainFlagModule1 = 13;
        if (
        source == "module 1.13" || 
        source == "module 1.13.1"
        ) {
          this.subFlagModule1 = 1;
        } else if (
          source == "module 1.13.2" 
        ) {
          this.subFlagModule1 = 2;
        }
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      }else if (source == "module 1.14") {
        this.mainFlagModule1 = 14;
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      }else if (source == "module 1.15") {
        this.mainFlagModule1 = 15;
        window.localStorage.setItem(
          "subFlagModule1",
          this.subFlagModule1.toString()
        );
      }
    }
    window.localStorage.setItem(
      "mainFlagModule1",
      this.mainFlagModule1.toString()
    );
  }
  setStatus6(val) {
    if (val == true) {
      this.mainFlagModule6 = 3;
      window.localStorage.setItem(
        "mainFlagModule6",
        this.mainFlagModule6.toString()
      );
    } else {
      var source = window.localStorage.getItem("source");

      if (
        source == "module 6.1" ||
        source == "module 6.1.1" ||
        source == "module 6.1.2" ||
        source == "module 6.1.3" ||
        source == "module 6.1.4" ||
        source == "module 6.2" ||
        source == "module 6.2.1" ||
        source == "module 6.2.2" ||
        source == "module 6.2.3" ||
        source == "module 6.2.4"
      ) {
        if (source == "module 6.1.1") {
          this.mainFlagModule6 = 1;
          this.subFlagModule6 = 1;
        } else if (source == "module 6.1.2") {
          this.mainFlagModule6 = 1;
          this.subFlagModule6 = 2;
        } else if (source == "module 6.1.3") {
          this.mainFlagModule6 = 1;
          this.subFlagModule6 = 3;
        } else if (source == "module 6.1.4") {
          this.mainFlagModule6 = 1;
          this.subFlagModule6 = 4;
        } else if (source == "module 6.2.1") {
          this.mainFlagModule6 = 2;
          this.subFlagModule6 = 1;
        } else if (source == "module 6.2.2") {
          this.mainFlagModule6 = 2;
          this.subFlagModule6 = 2;
        } else if (source == "module 6.2.3") {
          this.mainFlagModule6 = 2;
          this.subFlagModule6 = 3;
        } else if (source == "module 6.2.4") {
          this.mainFlagModule6 = 2;
          this.subFlagModule6 = 4;
        }
        window.localStorage.setItem(
          "subFlagModule6",
          this.subFlagModule6.toString()
        );
      }
    }
    window.localStorage.setItem(
      "mainFlagModule6",
      this.mainFlagModule6.toString()
    );
  }
  setStatus7(val) {
    if (val == true) {
      this.mainFlagModule7 = 4;
    } else {
      // var temp = window.localStorage.getItem('assignmentDate').split('-');
      // var str = "प्रकल्प पुर्ण करण्यासाठी दिनांक " + temp[2] + "/" + temp[1] + "/" + temp[0] + " पर्यंत अवधी आहे."
      // this.toastr.warning(str, null, { toastlife: 7000 });
      var source = window.localStorage.getItem("source");

      if (source == "module 7.1.1" || source == "module 7.1.2") {
        this.mainFlagModule7 = 1;
        this.subFlagModule7 = 1;
      } else if (source == "module 7.2" || source == "module 7.2.1") {
        this.mainFlagModule7 = 2;
        this.subFlagModule7 = 1;
      } else if (source == "module 7.3" || source == "module 7.3.1") {
        this.mainFlagModule7 = 3;
        this.subFlagModule7 = 1;
      }
    }
    window.localStorage.setItem(
      "subFlagModule7",
      this.subFlagModule7.toString()
    );
    window.localStorage.setItem(
      "mainFlagModule7",
      this.mainFlagModule7.toString()
    );
  }
  setStatus0(val) {
    if (val == true) {
      this.mainFlagModule0 = 31;
      window.localStorage.setItem(
        "mainFlagModule0",
        this.mainFlagModule0.toString()
      );
    } else {
      var source = window.localStorage.getItem("source");

      if (source == "module 0.1") {
        this.mainFlagModule0 = 1;
        if (source == "module 0.1") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.2") {
        this.mainFlagModule0 = 2;
        if (source == "module 0.2") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.3") {
        this.mainFlagModule0 = 3;
        if (source == "module 0.3") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.3.1") {
        this.mainFlagModule0 = 3;
        if (source == "module 0.3.1") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.3.2") {
        this.mainFlagModule0 = 3;
        if (source == "module 0.3.2") {
          this.subFlagModule0 = 2;
        }
      } else if (source == "module 0.4") {
        this.mainFlagModule0 = 4;
        if (source == "module 0.4") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.5") {
        this.mainFlagModule0 = 5;
        if (source == "module 0.5") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.6") {
        this.mainFlagModule0 = 6;
        if (source == "module 0.6") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.7") {
        this.mainFlagModule0 = 7;
        if (source == "module 0.7") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.8") {
        this.mainFlagModule0 = 8;
        if (source == "module 0.8") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.9") {
        this.mainFlagModule0 = 9;
        if (source == "module 0.9") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.10") {
        this.mainFlagModule0 = 10;
        if (source == "module 0.10") {
          this.subFlagModule0 = 1;
        }
      } else if (
        source == "module 0.11" ||
        source == "module 0.11.1" ||
        source == "module 0.11.2"
      ) {
        this.mainFlagModule0 = 11;
        if (source == "module 0.11" || source == "module 0.11.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.11.2") {
          this.subFlagModule0 = 2;
        }
      } else if (source == "module 0.12") {
        this.mainFlagModule0 = 12;
        if (source == "module 0.12") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.13") {
        this.mainFlagModule0 = 13;
        if (source == "module 0.13") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.14") {
        this.mainFlagModule0 = 14;
        if (source == "module 0.14") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.15") {
        this.mainFlagModule0 = 15;
        if (source == "module 0.15") {
          this.subFlagModule0 = 1;
        }
      }
      else if (
        source == "module 0.16" ||
        source == "module 0.16.1" ||
        source == "module 0.16.2" ||
        source == "module 0.16.3" ||
        source == "module 0.16.4" ||
        source == "module 0.16.5"
      ) {
        this.mainFlagModule0 = 16;
        if (source == "module 0.16" || source == "module 0.16.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.16.2") {
          this.subFlagModule0 = 2;
        }
        else if (source == "module 0.16.3") {
          this.subFlagModule0 = 3;
        } else if (source == "module 0.16.4") {
          this.subFlagModule0 = 4;
        } else if (source == "module 0.16.5") {
          this.subFlagModule0 = 5;
        }
      } else if (
        source == "module 0.17" ||
        source == "module 0.17.1" ||
        source == "module 0.17.2"
      ) {
        this.mainFlagModule0 = 17;
        if (source == "module 0.17" || source == "module 0.17.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.17.2") {
          this.subFlagModule0 = 2;
        }
      } else if (source == "module 0.18") {
        this.mainFlagModule0 = 18;
        if (source == "module 0.18") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.19") {
        this.mainFlagModule0 = 19;
        if (source == "module 0.19") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.20") {
        this.mainFlagModule0 = 20;
        if (source == "module 0.20") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.21") {
        this.mainFlagModule0 = 21;
        if (source == "module 0.21") {
          this.subFlagModule0 = 1;
        }
      } else if (
        source == "module 0.22" ||
        source == "module 0.22.1" ||
        source == "module 0.22.2"
      ) {
        this.mainFlagModule0 = 22;
        if (source == "module 0.22" || source == "module 0.22.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.22.2") {
          this.subFlagModule0 = 2;
        }
      }
      else if (source == "module 0.23") {
        this.mainFlagModule0 = 23;
        if (source == "module 0.23") {
          this.subFlagModule0 = 1;
        }
      }
      else if (source == "module 0.24") {
        this.mainFlagModule0 = 24;
        if (source == "module 0.24") {
          this.subFlagModule0 = 1;
        }
      } else if (
        source == "module 0.25" ||
        source == "module 0.25.1" ||
        source == "module 0.25.2"
      ) {
        this.mainFlagModule0 = 25;
        if (source == "module 0.25" || source == "module 0.25.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.25.2") {
          this.subFlagModule0 = 2;
        }
      }
      else if (source == "module 0.26") {
        this.mainFlagModule0 = 23;
        if (source == "module 0.26") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.27") {
        this.mainFlagModule0 = 27;
        if (source == "module 0.27") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.28") {
        this.mainFlagModule0 = 28;
        if (source == "module 0.28") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.29") {
        this.mainFlagModule0 = 29;
        if (source == "module 0.29") {
          this.subFlagModule0 = 1;
        }
      } else if (source == "module 0.30") {
        this.mainFlagModule0 = 30;
        if (source == "module 0.30") {
          this.subFlagModule0 = 1;
        }
      } else if (
        source == "module 0.31" ||
        source == "module 0.31.1" ||
        source == "module 0.31.2" ||
        source == "module 0.31.3" ||
        source == "module 0.31.4" ||
        source == "module 0.31.5"
      ) {
        this.mainFlagModule0 = 31;
        if (source == "module 0.31" || source == "module 0.31.1") {
          this.subFlagModule0 = 1;
        }
        else if (source == "module 0.31.2") {
          this.subFlagModule0 = 2;
        } else if (source == "module 0.31.3") {
          this.subFlagModule0 = 3;
        } else if (source == "module 0.31.4") {
          this.subFlagModule0 = 4;
        } else if (source == "module 0.31.5") {
          this.subFlagModule0 = 5;
        }
      }
      window.localStorage.setItem(
        "subFlagModule0",
        this.subFlagModule0.toString()
      );
    }
    window.localStorage.setItem(
      "mainFlagModule0",
      this.mainFlagModule0.toString()
    );
  }

  ngDoCheck() {
    this.moduleStatus0 = window.localStorage.getItem("currentstatus")
    //console.log('current finish module',this.moduleStatus0)
    this.profileFlag = window.localStorage.getItem("is_profile_visible");
    if (
      localStorage.getItem("levelData") != null &&
      localStorage.getItem("levelData") != "" &&
      localStorage.getItem("levelData") != undefined
    ) {
      this.levelData = JSON.parse(localStorage.getItem("levelData"));

      let percent0 = parseInt(this.levelData[0].percent);
      let percent1 = parseInt(this.levelData[1].percent);
      let percent2 = parseInt(this.levelData[2].percent);
      let percent3 = parseInt(this.levelData[3].percent);
      let percent4 = parseInt(this.levelData[4].percent);
      let percent5 = parseInt(this.levelData[5].percent);

      var perval0 = isNaN(percent0);
      var perval1 = isNaN(percent1);
      var perval2 = isNaN(percent2);
      var perval3 = isNaN(percent3);
      var perval4 = isNaN(percent4);
      var perval5 = isNaN(percent5);

      this.grandPercent = (percent1 + percent2 + percent3 + percent4 + percent5) / 5;
      // console.log('grand %', this.grandPercent,percent1,percent2,percent3,percent4,percent5)
      window.localStorage.setItem("grand%", this.grandPercent.toString())
      if (this.grandPercent > 80) {
        this.cupImg = 1;
        // console.log('gold');
      } else if (this.grandPercent <= 80 && this.grandPercent > 50) {
        this.cupImg = 2
        // console.log('silver');
      } else if (this.grandPercent >= 10 && this.grandPercent <= 50) {
        this.cupImg = 3
        // console.log('bronze');
      } else if (this.grandPercent >= 0 &&
        this.grandPercent < 10) {
        this.cupImg = '';
      }

      if (perval0 == false && this.levelData[0].status == true) {
        if (percent0 > 80) {
          this.rewardImgUrl0 = this.imageJson["a1"];
        } else if (percent0 <= 80 && percent0 > 50) {
          this.rewardImgUrl0 = this.imageJson["a2"];
        } else if (percent0 >= 10 && percent0 <= 50) {
          this.rewardImgUrl0 = this.imageJson["a3"];
        } else if (percent0 >= 0 && percent0 < 10) {
          this.rewardImgUrl0 = this.imageJson["a4"];
        }
      }
      if (perval1 == false && this.levelData[1].status == true) {
        if (percent1 > 80) {
          this.rewardImgUrl1 = this.imageJson["a1"];
        } else if (percent1 <= 80 && percent1 > 50) {
          this.rewardImgUrl1 = this.imageJson["a2"];
        } else if (percent1 >= 10 && percent1 <= 50) {
          this.rewardImgUrl1 = this.imageJson["a3"];
        } else if (percent1 >= 0 && percent1 < 10) {
          this.rewardImgUrl1 = this.imageJson["a4"];
        }
      }
      if (perval2 == false && this.levelData[2].status == true) {
        if (percent2 > 80) {
          this.rewardImgUrl2 = this.imageJson["a1"];
        } else if (percent2 <= 80 && percent2 > 50) {
          this.rewardImgUrl2 = this.imageJson["a2"];
        } else if (percent2 >= 10 && percent2 <= 50) {
          this.rewardImgUrl2 = this.imageJson["a3"];
        } else if (percent2 >= 0 && percent2 < 10) {
          this.rewardImgUrl2 = this.imageJson["a4"];
        }
      }
      if (perval3 == false && this.levelData[3].status == true) {
        if (percent3 > 80) {
          this.rewardImgUrl3 = this.imageJson["a1"];
        } else if (percent3 <= 80 && percent3 > 50) {
          this.rewardImgUrl3 = this.imageJson["a2"];
        } else if (percent3 >= 10 && percent3 <= 50) {
          this.rewardImgUrl3 = this.imageJson["a3"];
        } else if (percent3 >= 0 && percent3 < 10) {
          this.rewardImgUrl3 = this.imageJson["a4"];
        }
      }

      if (perval4 == false && this.levelData[4].status == true) {
        if (percent4 > 80) {
          this.rewardImgUrl4 = this.imageJson["a1"];
        } else if (percent4 <= 80 && percent4 > 50) {
          this.rewardImgUrl4 = this.imageJson["a2"];
        } else if (percent4 >= 10 && percent4 < 50) {
          this.rewardImgUrl4 = this.imageJson["a3"];
        } else if (percent4 >= 0 && percent4 < 10) {
          this.rewardImgUrl4 = this.imageJson["a4"];
        }
      }

      if (perval5 == false && this.levelData[5].status == true) {
        if (percent5 > 80) {
          this.rewardImgUrl5 = this.imageJson["a1"];
        } else if (percent5 <= 80 && percent5 > 50) {
          this.rewardImgUrl5 = this.imageJson["a2"];
        } else if (percent5 >= 10 && percent5 < 50) {
          this.rewardImgUrl5 = this.imageJson["a3"];
        } else if (percent5 >= 0 && percent5 < 10) {
          // this.rewardImgUrl5 = this.imageJson["a4"];
          if (this.cupImg == 1) {
            this.rewardImgUrl5 = 'fa-trophy gold_star'
          } else if (this.cupImg == 2) {
            this.rewardImgUrl5 = 'fa-trophy silver_star'
          } else if (this.cupImg == 3) {
            this.rewardImgUrl5 = 'fa-trophy bronze_star'
          }
        }
      }
    }

    if (
      window.localStorage.getItem("moduleFinishCount") != null &&
      window.localStorage.getItem("moduleFinishCount") != "" &&
      window.localStorage.getItem("moduleFinishCount") != undefined && this.starPopupFlag == false
    ) {
      this.moduleFinishCount = JSON.parse(
        window.localStorage.getItem("moduleFinishCount")
      );
      if (this.moduleFinishCount.percentage > 80) {
        this.finishImgUrl = this.imageJson["r1"];
        this.needEfforts = false;
        this.rewardsFlag = 1;
        jQuery(".animate-reward img").each(function (i) {
          jQuery(this)
            .delay(100 * i)
            .fadeIn(1500);
        });
      } else if (
        this.moduleFinishCount.percentage > 50 &&
        this.moduleFinishCount.percentage <= 80
      ) {
        this.finishImgUrl = this.imageJson["r2"];
        this.needEfforts = false;
        this.rewardsFlag = 2;
        jQuery(".animate-reward img").each(function (i) {
          jQuery(this)
            .delay(100 * i)
            .fadeIn(1500);
        });
      } else if (
        this.moduleFinishCount.percentage >= 10 &&
        this.moduleFinishCount.percentage < 50
      ) {
        this.finishImgUrl = this.imageJson["r3"];
        this.needEfforts = false;
        this.rewardsFlag = 3;
        jQuery(".animate-reward img").each(function (i) {
          jQuery(this)
            .delay(100 * i)
            .fadeIn(1500);
        });
      } else if (
        this.moduleFinishCount.percentage >= 0 &&
        this.moduleFinishCount.percentage < 10
      ) {
        this.finishImgUrl = this.imageJson["r4"];
        this.needEfforts = true;
        this.rewardsFlag = 4;
      }
    }

    if (window.localStorage.getItem("hidemenu") == "true") {
      this.hideMenuFlag = true;
    } else {
      this.hideMenuFlag = false;
    }

    if (window.localStorage.getItem("hidemenuAdmin") == "true") {
      this.hideMenuAdminFlag = true;
    } else {
      this.hideMenuAdminFlag = false;
    }

    if (this.admin != window.localStorage.getItem("name")) {
      this.admin = window.localStorage.getItem("name");
    }
    // this.Module0Service.getLocalStorage0().subscribe(
    //   item => {
    this.mainFlagModule0 = parseInt(
      window.localStorage.getItem("mainFlagModule0")
    );
    if (this.mainFlagModule0 > 30) {
      // this.currentFlag1 = false;
      this.module0OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.mainFlagModule1 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module0"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module1Service.getLocalStorage1().subscribe(
    //   item => {
    // console.log("complete ",item)
    this.mainFlagModule1 = parseInt(
      window.localStorage.getItem("mainFlagModule1")
    );
    if (this.mainFlagModule1 > 14) {
      this.currentFlag2 = false;
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.mainFlagModule2 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module1"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module2ServiceService.getLocalStorage().subscribe(
    //   item => {

    this.mainFlagModule2 = parseInt(
      window.localStorage.getItem("mainFlagModule2")
    );
    if (this.mainFlagModule2 > 17) {
      this.currentFlag3 = false;
      this.module1OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.mainFlagModule3 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module2"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module3Service.getLocalStorage3().subscribe(
    //   item => {

    this.mainFlagModule3 = parseInt(
      window.localStorage.getItem("mainFlagModule3")
    );
    if (this.mainFlagModule3 > 18) {
      this.currentFlag4 = false;
      this.module4OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.mainFlagModule4 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module3"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module43Service.getLocalStorage4().subscribe(
    //   item => {
    this.mainFlagModule4 = parseInt(
      window.localStorage.getItem("mainFlagModule4")
    );
    if (this.mainFlagModule4 > 14) {
      this.currentFlag5 = false;
      this.module5OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.mainFlagModule5 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module4"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module5Service.getLocalStorage5().subscribe(
    //   item => {
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    if (this.mainFlagModule5 > 24) {
      this.currentFlag6 = false;
      this.module6OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.mainFlagModule6 = 1;
      window.localStorage.setItem("currentstatus", "6");
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module5"] = true;
        this.module5FinishFlag = true;
        // console.log('5 finish', completedModuleStatus["module5"], this.module5FinishFlag)
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    // this.Module6Service.getLocalStorage6().subscribe(
    //   item => {
    this.mainFlagModule6 = parseInt(
      window.localStorage.getItem("mainFlagModule6")
    );
    if (this.mainFlagModule6 > 2) {
      this.currentFlag7 = false;
      this.module7OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module6OnOffFlag = true;
      this.mainFlagModule7 = 1;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module6"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });
    // this.Module7Service.getLocalStorage7().subscribe(
    //   item => {

    this.mainFlagModule7 = parseInt(
      window.localStorage.getItem("mainFlagModule7")
    );
    if (this.mainFlagModule7 > 3) {
      this.module5OnOffFlag = true;
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module6OnOffFlag = true;
      this.module7OnOffFlag = true;
      if (window.localStorage.getItem("completeModule") != null) {
        var completedModuleStatus = JSON.parse(
          window.localStorage.getItem("completeModule")
        );
        completedModuleStatus["module7"] = true;
      }
      window.localStorage.setItem(
        "completeModule",
        JSON.stringify(completedModuleStatus)
      );
    }
    // });

    this.LocalstoragedetailsService.getModuleStatus().subscribe(item => {
      var sumbmodulestatus = JSON.parse(item);
      this.moduleCompleteStatus = sumbmodulestatus;
      // console.log("obj1",this.moduleCompleteStatus)
      if (this.moduleCompleteStatus["type"] == "submodule") {
        this.submoduleStatusModal.show();
        this.LanguageService.toShow();
      } else {
        this.moduleStatusModal.show();
        this.LanguageService.toShow();
      }
    });

    //to update flowlayout after profile completion
    if (window.localStorage.getItem("profileComplete") == "true") {
      if (window.localStorage.getItem("profileCompleteCurrent") == "true") {
        this.moduleStatusCheck = parseInt(
          window.localStorage.getItem("currentstatus")
        );

        this.setDisableMenu();
        window.localStorage.setItem("profileCompleteCurrent", "false");
        this.toastr.success(
          "तुमचे प्रोफाइल भरून झाले आहे.कृपया, अभ्यासक्रम सुरु करा."
        );
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000)
      }
    }
    // this.DashboardService.getMissingPost().subscribe(
    //   item => {
    //     alert(item);
    //   }
    // );
  }

  setDisableMenu() {
    if (window.localStorage.getItem("profileComplete") == "false") {
      this.moduleStatusCheck = 0;
      this.module1OnOffFlag = false;
      this.module2OnOffFlag = false;
      this.module3OnOffFlag = false;
      this.module4OnOffFlag = false;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag1 = true;
      this.currentFlag2 = true;
      this.currentFlag3 = true;
      this.currentFlag4 = true;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
    } else if (this.moduleStatusCheck == 0) {
      this.module1OnOffFlag = false;
      this.module2OnOffFlag = false;
      this.module3OnOffFlag = false;
      this.module4OnOffFlag = false;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag1 = true;
      this.currentFlag2 = true;
      this.currentFlag3 = true;
      this.currentFlag4 = true;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
    } else if (this.moduleStatusCheck == 1) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = false;
      this.module3OnOffFlag = false;
      this.module4OnOffFlag = false;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag2 = true;
      this.currentFlag3 = true;
      this.currentFlag4 = true;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
    } else if (this.moduleStatusCheck == 2) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = false;
      this.module4OnOffFlag = false;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag3 = true;
      this.currentFlag4 = true;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
      this.mainFlagModule1 = 15;
      this.LocalstoragedetailsService.timelineState = 2;
    } else if (this.moduleStatusCheck == 3) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = false;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag4 = true;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.LocalstoragedetailsService.timelineState = 3;
    } else if (this.moduleStatusCheck == 4) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = false;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.currentFlag5 = true;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.mainFlagModule3 = 18;
      this.LocalstoragedetailsService.timelineState = 4;
    } else if (this.moduleStatusCheck == 5) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module6OnOffFlag = false;
      this.module7OnOffFlag = false;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.mainFlagModule3 = 18;
      this.mainFlagModule4 = 16;
      this.currentFlag6 = true;
      this.currentFlag7 = true;
      this.LocalstoragedetailsService.timelineState = 5;
    } else if (this.moduleStatusCheck == 6) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module6OnOffFlag = true;
      this.module7OnOffFlag = false;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.mainFlagModule3 = 18;
      this.mainFlagModule4 = 16;
      this.mainFlagModule5 = 14;
      this.currentFlag7 = true;
      this.LocalstoragedetailsService.timelineState = 6;
    } else if (this.moduleStatusCheck == 7) {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module6OnOffFlag = true;
      this.module7OnOffFlag = true;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.mainFlagModule3 = 18;
      this.mainFlagModule4 = 16;
      this.mainFlagModule5 = 14;
      this.mainFlagModule6 = 3;
      this.LocalstoragedetailsService.timelineState = 7;
    } else {
      this.module1OnOffFlag = true;
      this.module2OnOffFlag = true;
      this.module3OnOffFlag = true;
      this.module4OnOffFlag = true;
      this.module5OnOffFlag = true;
      this.module6OnOffFlag = true;
      this.module7OnOffFlag = true;
      this.mainFlagModule1 = 15;
      this.mainFlagModule2 = 8;
      this.mainFlagModule3 = 18;
      this.mainFlagModule4 = 16;
      this.mainFlagModule5 = 14;
      this.mainFlagModule6 = 3;
      this.mainFlagModule7 = 4;
      this.LocalstoragedetailsService.timelineState = 8;
    }
  }
  moduleComplete(e) {
    this.starPopupFlag = false;
    if (
      this.moduleCompleteStatus["nextRoute"] != null &&
      this.moduleCompleteStatus["nextRoute"] != undefined &&
      this.moduleCompleteStatus["nextRoute"] != ""
    ) {
      this.router.navigate([this.moduleCompleteStatus["nextRoute"]]);
    }
    if (jQuery("bs-modal-backdrop").length > 1) {
      jQuery("bs-modal-backdrop").hide();
      jQuery("body .modal-backdrop.show").css("opacity", "0.3 !important");
      console.log('backdrop....')
    }
    this.moduleStatusModal.hide();
    this.LanguageService.toHide();
    this.submoduleStatusModal.hide();
    this.LanguageService.toHide();

    if (this.moduleCompleteStatus["type"] == "allFinish") {
      this.needEfforts = false;
      this.moduleStatusModal.hide();
      this.LanguageService.toHide();
      this.moduleStatusCupModal.show();
      this.LanguageService.toShow();
      console.log('all finish');
    }

    // var paras = document.getElementsByClassName('modal-backdrop');
    // while (paras[0])
    // {
    //   paras[0].parentNode.removeChild(paras[0]);
    // }

    // var paras = document.getElementsByClassName("modal-backdrop")[0];
    // if (paras.classList.contains("fade")) {
    //   console.log("true");
    //   paras.classList.remove("show");
    // }
    // if(paras.classList.contains('modal-backdrop fade in')){
    //   paras.classList.remove('modal-backdrop fade in');
    // }
    // while (paras[0]) {
    //   paras[0].parentNode.removeChild(paras[0]);
    // }
  }

  ngAfterViewInit() {
    if (window.localStorage.getItem("profleComplete") == "true") {
      if (window.localStorage.getItem("mspost") === null) {
        console.log("mspost not exists in localstorage");
      } else {
        console.log("mspost  exists in localstorage");
        if (window.localStorage.getItem("mspost") == "true") {
          console.log(true);
          this.currentStatus(1);
          this.router.navigate(["/modules/module1/Module1.7"]);
        }
      }
    }
  }
  instruction() {
    if (this.starPopupFlag == false) {
      this.instructionModal.show();
      this.LanguageService.toShow();
    }
    else {
      console.log("star function")
    }
  }
  closeInstruction() {
    this.instructionModal.hide();
    this.LanguageService.toHide();
    // var paras = document.getElementsByClassName("modal-backdrop")[0];
    // if (paras.classList.contains("show")) {
    //   paras.classList.remove("show");
    // }
    // var paras = document.getElementsByClassName("modal-backdrop");
    // while (paras[0]) {
    //   paras[0].parentNode.removeChild(paras[0]);
    // // }
    // var paras = document.getElementsByClassName("modal-backdrop")[0];
    // if (paras.classList.contains("fade")) {
    //   console.log("true");
    //   paras.classList.remove("show");
    // }
  }

  instruction0() {
    this.instructionModal0.show();
    this.LanguageService.toShow();
  }
  closeInstruction0() {
    this.instructionModal0.hide();
    this.LanguageService.toHide();
    // var paras = document.getElementsByClassName("modal-backdrop");
    // while (paras[0]) {
    //   paras[0].parentNode.removeChild(paras[0]);
    // }
  }

  hideMenu() {
    this.router.navigate(["/modules/admin_panel"]);
    let obJ = {};
    obJ["isAdmin"] = true;
    this.sharedService.sendData(obJ);
    window.localStorage.setItem("hidemenu", "true");
  }

  passwordChangeModalHide() {
    this.passwordChangeModal.hide();
    this.LanguageService.toHide();
  }

  cupModelShow() {
    this.needEfforts = false;
    this.moduleStatusModal.hide();
    this.LanguageService.toHide();
    this.moduleStatusCupModal.show();
    this.LanguageService.toShow();
    console.log('cup model');
  }

  closeMe() {
    this.moduleStatusCupModal.hide();
    this.LanguageService.toHide();
    this.router.navigate(["/dashboard"]);
  }

  showStarPopUp(val) {
    console.log("val", val)
    var percent;

    if (val == 1) {
      if (parseInt(window.localStorage.getItem("currentstatus")) > 1) {
        this.starPopupFlag = true;
        this.closeInstruction();
        // this.module5FinishFlag= false;
        this.moduleStatusModal.show()
        this.moduleCompleteStatus['type'] = 'moduleFinish'
        this.moduleCompleteStatus['moduleNo'] = "१"
        this.moduleCompleteStatus['finishHead'] = "यश आणि अपयश "
        var current1;
        current1 = JSON.parse(window.localStorage.getItem("levelData"))
        percent = parseInt(current1[1].percent);
        console.log("current1", percent, this.module5FinishFlag)
      }
    }
    if (val == 2) {
      if (parseInt(window.localStorage.getItem("currentstatus")) > 2) {
        this.starPopupFlag = true;
        this.moduleStatusModal.show()
        // this.module5FinishFlag= false;
        this.moduleCompleteStatus['type'] = 'moduleFinish'
        this.moduleCompleteStatus['moduleNo'] = "२"
        this.moduleCompleteStatus['finishHead'] = "प्रेम, मैत्री, आकर्षण"
        var current1;
        current1 = JSON.parse(window.localStorage.getItem("levelData"))
        percent = parseInt(current1[2].percent);
        console.log("current1", percent)
      }
    }
    if (val == 3) {
      if (parseInt(window.localStorage.getItem("currentstatus")) > 3) {
        this.starPopupFlag = true;
        this.moduleStatusModal.show()
        // this.module5FinishFlag= false;
        this.moduleCompleteStatus['type'] = 'moduleFinish'
        this.moduleCompleteStatus['moduleNo'] = "३"
        this.moduleCompleteStatus['finishHead'] = "मानसिक आरोग्य : प्रथमोपचार "
        var current1;
        current1 = JSON.parse(window.localStorage.getItem("levelData"))
        percent = parseInt(current1[3].percent);
        console.log("current1", percent)
      }
    }
    if (val == 4) {
      if (parseInt(window.localStorage.getItem("currentstatus")) > 4) {
        this.starPopupFlag = true;
        this.moduleStatusModal.show()
        // this.module5FinishFlag= false;
        this.moduleCompleteStatus['type'] = 'moduleFinish'
        this.moduleCompleteStatus['moduleNo'] = "४"
        this.moduleCompleteStatus['finishHead'] = "सकारात्मक मानसिकता"
        var current1;
        current1 = JSON.parse(window.localStorage.getItem("levelData"))
        percent = parseInt(current1[4].percent);
        console.log("current1", percent)
      }
    }
    if (val == 5) {
      if (parseInt(window.localStorage.getItem("currentstatus")) > 5) {
        this.starPopupFlag = false;
        // this.moduleStatusModal.show()

        let percent5 = parseInt(this.levelData[5].percent);
        var perval5 = isNaN(percent5);

        if (perval5 == false && this.levelData[5].status == true) {
          if (percent5 >= 0 && percent5 < 10) {
            this.moduleStatusCupModal.show();
          } else {
            this.moduleStatusModal.show()
          }
        } else {
          this.moduleStatusModal.show()
        }

        this.moduleCompleteStatus['type'] = 'allFinish'
        this.moduleCompleteStatus['moduleNo'] = "५"
        this.moduleCompleteStatus['finishHead'] = "करिअर्स"
        var current1;
        current1 = JSON.parse(window.localStorage.getItem("levelData"))
        percent = parseInt(current1[5].percent);
        console.log("current1", percent)
      }
    }
    if (percent > 80) {
      this.finishImgUrl = this.imageJson["r1"];
      this.needEfforts = false;
      this.rewardsFlag = 1;
      jQuery(".animate-reward img").each(function (i) {
        jQuery(this)
          .delay(100 * i)
          .fadeIn(1500);
      });
    } else if (
      percent > 50 &&
      percent <= 80
    ) {
      this.finishImgUrl = this.imageJson["r2"];
      this.needEfforts = false;
      this.rewardsFlag = 2;
      jQuery(".animate-reward img").each(function (i) {
        jQuery(this)
          .delay(100 * i)
          .fadeIn(1500);
      });
    } else if (
      percent >= 10 &&
      percent < 50
    ) {
      this.finishImgUrl = this.imageJson["r3"];
      this.needEfforts = false;
      this.rewardsFlag = 3;
      jQuery(".animate-reward img").each(function (i) {
        jQuery(this)
          .delay(100 * i)
          .fadeIn(1500);
      });
    } else if (
      percent >= 0 &&
      percent < 10
    ) {
      this.finishImgUrl = this.imageJson["r4"];
      this.needEfforts = true;
      this.rewardsFlag = 4;
    }
  }
}
