import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { LanguageService } from "../language.service";
import { DashboardService } from "./dashboard.service";
import { ProfileService } from "./profile/profile.service";
import { FaqComponent } from "src/app/dashboard/faq/faq.component";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { SignupStepperService } from "../signup-stepper/signup-stepper.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, ProfileComponent, FaqComponent],
  providers: [LanguageService,DashboardService,ProfileService,DatePipe,SignupStepperService]
})
export class DashboardModule {}
