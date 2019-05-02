import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { LoginComponent } from "./login/login.component";
import { AuthenticationComponent } from "./authentication.component";
import { LevelSelectionComponent } from "./level-selection/level-selection.component";
import { TranslateModule } from "@ngx-translate/core";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { RegistrationService } from "./registration/registration.service";

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
    LevelSelectionComponent
  ],
  providers: [RegistrationService]
})
export class AuthenticationModule {}
