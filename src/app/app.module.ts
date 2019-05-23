import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { AppRoutingModule } from "./app.routing";
import { AuthenticationModule } from "./authentication/authentication.module";
import { FullLayoutComponent } from "./layouts/full-layout.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LanguageService } from "./language.service";
import { FullLayoutService } from "./layouts/full-layout.service";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule, ToastOptions } from "ng6-toastr/ng2-toastr";
import { CustomOption } from "./shared/custom-option";
import { LocalstoragedetailsService } from "./services/localstoragedetails.service";
import { TimelineComponent } from "./timeline/timeline.component";
import { SignupStepperComponent } from "./signup-stepper/signup-stepper.component";
import { SharedModule } from "./shared/shared.module";
import { HttpModule } from "@angular/http";
import { SignupStepperService } from "./signup-stepper/signup-stepper.service";
import { CommonComponentService } from './components/common-component.service';
import { CommonService } from "./services/common.service";
import { AuthGuard } from "./shared/guards/auth-guard.service";
import { CanDeactivateGuard } from "./shared/guards/can-deactivate-guard.service";
import { PermissionModelService } from "./permission-model.service";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    TimelineComponent,
    SignupStepperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedModule,
    AngularMultiSelectModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: ToastOptions,
      useClass: CustomOption
    },
    LanguageService,
    FullLayoutService,
    LocalstoragedetailsService,
    SignupStepperService,
    CommonComponentService,
    CommonService,
    LocalstoragedetailsService,
    SignupStepperService,
    PermissionModelService,
    AuthGuard,
    CanDeactivateGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
