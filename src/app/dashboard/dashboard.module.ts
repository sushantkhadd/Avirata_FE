import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { TranslateModule } from "@ngx-translate/core";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import { ModalModule } from "ngx-bootstrap";
import { LanguageService } from "../language.service";
import { DashboardService } from "./dashboard.service";
import { ProfileService } from "./profile/profile.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, ProfileComponent],
  providers: [LanguageService,DashboardService,ProfileService]
})
export class DashboardModule {}
