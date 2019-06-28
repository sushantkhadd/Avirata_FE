import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthenticationComponent } from "./authentication.component";
import { LevelSelectionComponent } from "./level-selection/level-selection.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { RegistrationService } from "./registration/registration.service";
import { NumberDirective } from "src/app/shared/directives/number.directive";
import { FormatTimePipe } from "../shared/pipes/format-time.pipe";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { RedirectComponent } from "./redirect/redirect.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    ModalModule.forRoot(),
    AuthenticationRoutingModule,
    AngularMultiSelectModule
  ],
  declarations: [
    LoginComponent,
    AuthenticationComponent,
    LevelSelectionComponent,
    RedirectComponent,
    NumberDirective,
    FormatTimePipe
  ],
  providers: [RegistrationService]
})
export class AuthenticationModule {}
