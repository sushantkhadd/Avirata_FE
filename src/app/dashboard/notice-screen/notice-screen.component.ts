import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from "ngx-bootstrap";
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { ProfileService } from "src/app/dashboard/profile/profile.service";
import { ThrowStmt } from "@angular/compiler/src/output/output_ast";

declare var jQuery: any;

@Component({
  selector: "app-notice-screen",
  templateUrl: "./notice-screen.component.html",
  styleUrls: ["./notice-screen.component.scss"]
})
export class NoticeScreenComponent implements OnInit {
  @ViewChild(ModalDirective) public aceeptCheck: ModalDirective;
  @ViewChild('confirmModal') public confirmModal: ModalDirective;
  @ViewChild('requiredModal') public requiredModal: ModalDirective;
  public enableBtn: boolean = true;
  public initials;
  firstName;
  surName;
  fatherName;
  cityName;
  schoolName;
  taluka;
  district;
  marType;
  schoolIndex;
  saralNumber;
  showEdit;
  disabledFields;
  tempFieldArea;
  hideBtn;
  public genderList = ["श्री", "श्रीमती", "कु"];


  constructor(
    public translate: TranslateService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router,
    public ProfileService: ProfileService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // location.reload();
    if (
      window.localStorage.getItem("token") == null ||
      window.localStorage.getItem("token") == undefined ||
      window.localStorage.getItem("token") == ""
    ) {
      this.router.navigate(["/"]);
    }
    if (
      window.localStorage.getItem("group_name") == "admin" ||
      window.localStorage.getItem("group_name") == "co_ordinator"
    ) {
      this.router.navigate(["/dashboard"]);
    }
    this.hideBtn = true;
    this.disabledFields = false;
    this.showEdit = false;
    this.tempFieldArea = true;
    this.district = "";
    this.surName = "";
    this.firstName = "";
    this.surName = "";
    this.fatherName = "";
    this.schoolIndex = "";
    this.schoolName = "";
    this.cityName = "";
    this.taluka = "";
    this.saralNumber = "";
    this.initials = "";

    this.getinformation(false);
  }

  getinformation(state) {
    console.log("s ",state)
    var apiUrl = "getinformation/";
    this.ProfileService.getCall(apiUrl).subscribe(
      data => {
        if (data['message'] == "ok") {
          console.log("data ",data['data'])
          if(window.localStorage.getItem('myflag')== 'true'){
          this.aceeptCheck.show();
          }
          if (data['data'].info_flag == false) {
            this.showEdit = false;
            this.hideBtn = true;
          } else {
            if(state == false){
            this.showEdit = true;
            this.disabledFields = true;
            this.tempFieldArea = false;
            this.hideBtn = false;
            }

          }
          if (data['data'].title != null) {
            if ((data['data'].title).slice(-1) == '.')
            {
              this.initials = data['data'].title.replace('.', '')
              console.log('true',this.initials)
            } else
            {
              this.initials = data['data'].title;
              console.log('false',this.initials)
            }
            console.log("d ",data['data'].title)
          }
          if (data['data'].last_name != null) {
            this.surName = data['data'].last_name;
          }
          if (data['data'].first_name != null) {
            this.firstName = data['data'].first_name;
          }
          if (data['data'].middle_name != null) {
            this.fatherName = data['data'].middle_name;
          }
          if (data['data'].udise != null) {
            this.schoolIndex = data['data'].udise;
          }
          if (data['data'].school_name != null) {
            this.schoolName = data['data'].school_name;
          }
          if (data['data'].village != null) {
            this.cityName = data['data'].village;
          }
          if (data['data'].taluka != null) {
            this.taluka = data['data'].taluka;
          }
          if (data['data'].district != null) {
            this.district = data['data'].district;
          }
          if (data['data'].saral_no != null) {
            this.saralNumber = data['data'].saral_no;
          }
        }
      },

      err => {
        if (err.json().message == "group not found") {
          this.toastr.error(this.translate.instant("Errors.commonError"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        }
        if (err.json().message == "index not found") {
          this.toastr.error(this.translate.instant("Errors.commonError"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (err.json().message == "token not found") {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (err.json().message == "token not matches") {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (
          err.json().message == "source is required" ||
          err.json().message == "unknown source"
        ) {
          console.log("source required");
        } else if (err.json().message == "access denied") {
          this.toastr.error(this.translate.instant("Errors.accessDenied"));
        } else {
          this.toastr.error(this.translate.instant("Errors.tryAgain"));
        }
      }
    );
  }



  submitForm() {
    var tempsName = ((document.getElementById('surname') as HTMLInputElement).value);
    var tempfName = ((document.getElementById('name') as HTMLInputElement).value);
    var tempmName = ((document.getElementById('fatherName') as HTMLInputElement).value);
    var tempschlName = ((document.getElementById('schoolName') as HTMLInputElement).value);
    var tempvName = ((document.getElementById('cityName') as HTMLInputElement).value);
    var temptName = ((document.getElementById('taluka') as HTMLInputElement).value);
    var tempdName = ((document.getElementById('district') as HTMLInputElement).value);

    var tempValidation = /^[^a-zA-Z]+$/;

    if(!(tempValidation.test(tempsName)) || !(tempValidation.test(tempfName)) || !(tempValidation.test(tempmName)) || !(tempValidation.test(tempschlName)) || !(tempValidation.test(tempvName)) || !(tempValidation.test(temptName)) || !(tempValidation.test(tempdName))){
      // console.log('sajhdd',tempsName,tempfName,tempmName,tempschlName,tempvName,temptName,tempdName)
      this.toastr.error('कृपया सर्व माहिती मराठी (देवनागरी) मधेच भरली आहे याची खात्री करा.');
    } else{
      var apiUrl = "postinformation/";
      var jsonBody = {};
      jsonBody["title"] = this.initials;
      jsonBody["last_name"] = tempsName.trim();
      jsonBody["first_name"] = tempfName.trim();
      jsonBody["middle_name"] = tempmName.trim();
      jsonBody["school_name"] = tempschlName.trim();
      jsonBody["village"] = tempvName.trim();
      jsonBody["taluka"] = temptName.trim();
      jsonBody["district"] = tempdName.trim();
      jsonBody["saral_no"] = this.saralNumber.trim();

      // console.log('hdhdh',jsonBody);

      if (this.initials.trim() == "" || this.surName.trim() == "" || this.firstName.trim() == "" || this.fatherName == "" || this.schoolName == "" || this.schoolName.trim() == "" || this.cityName.trim() == "" || this.taluka.trim() == "" || this.district.trim() == "") {
        this.toastr.error("कृपया सर्व माहिती भरा");
      } else {
        this.ProfileService.postCall(apiUrl,jsonBody).subscribe(
          data => {
            if (data['message'] == "record inserted" || data['message'] == "record updated") {
              this.disabledFields = true;
              this.showEdit = true;
              this.tempFieldArea=false;
              this.hideBtn = false;
              this.toastr.success(
                this.translate.instant("माहिती यशस्वीरित्या अपडेट केली गेली आहे")
              );
              this.surName = tempsName;
              this.firstName = tempfName;
              this.fatherName = tempmName;
              this.schoolName = tempschlName;
              this.cityName = tempvName;
              this.taluka = temptName;
              this.district = tempdName;
            }
          },
          err => {
            if (err.json().message == "school not found") {
              this.toastr.error(this.translate.instant("Errors.commonError"));
              setTimeout(() => {
                this.router.navigate(["/"]);
              }, 500);
            } else if (err.json().message == "group not found") {
              this.toastr.error(this.translate.instant("Errors.commonError"));
              setTimeout(() => {
                this.router.navigate(["/"]);
              }, 500);
            } else if (err.json().message == "required title key") {
            } else if (err.json().message == "required last_name key") {
            } else if (err.json().message == "required first_name key") {
            } else if (err.json().message == "required middle_name key") {
            } else if (err.json().message == "required school_name key") {
            } else if (err.json().message == "required village key") {
            } else if (err.json().message == "required district key") {
            } else if (err.json().message == "required taluka key") {
            } else if (err.json().message == "required saral_no key") {
            } else if (
              err.json().message == "required title field" ||
              err.json().message == "required last_name field" ||
              err.json().message == "required first_name field" ||
              err.json().message == "required middle_name field" ||
              err.json().message == "required district field" ||
              err.json().message == "required village field" ||
              err.json().message == "required taluka field" ||
              err.json().message == "required school_name field"
            ) {
              // this.toastr.error(this.translate.instant("Errors.userAnsKeyReq"));
              this.requiredModal.show();
            } else if (err.json().message == "access denied") {
              this.toastr.error(this.translate.instant("Errors.accessDenied"));
            } else if (
              err.json().message == "token not matches" ||
              err.json().message == "token not found"
            ) {
              this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
              setTimeout(() => {
                this.router.navigate(["/"]);
              }, 500);
            } else if (
              err.json().message == "source is required" ||
              err.json().message == "unknown source"
            ) {
              this.toastr.error(
                this.translate.instant("otherMessages.unknownSource")
              );
            } else {
              this.toastr.error(this.translate.instant("Errors.cannotProceed"));
            }
          }
        );
      }
    }

  }

  resetForm() {
    this.firstName = "";
    this.surName = "";
    this.fatherName = "";
    this.cityName = "";
    this.district = "";
    this.taluka = "";
    this.schoolName = "";
    this.initials = "";
    this.saralNumber = "";
    this.confirmModal.hide();
  }

  ngDoCheck() {
    jQuery(document).keypress(
      function (event) {
        if (event.which == '13') {
          event.preventDefault();
        }
      });
  }

  checkEvent(event) {
    if (event.target.checked) {
      this.enableBtn = false;
    }
    else {
      this.enableBtn = true;
    }
  }
  myclick(){
    window.location.reload();
    window.localStorage.setItem('myflag','false')
  }

  editForm(){
    this.disabledFields=false;
    this.tempFieldArea=true;
    this.hideBtn=true;
    this.showEdit=false;
    this.getinformation(true);
  }

}
