import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModulesRoutingModule } from "./modules-routing.module";
import { Module0Component } from "./module0/module0.component";
import { Module1Component } from "./module1/module1.component";
import { Module0Service } from "./module0/module0.service";
import { Module1Service } from "./module1/module1.service";
import { Module2Service } from "./module2/module2.service";
import { Module12Component } from "./module1/module1-2.component";
import { TranslateModule } from "@ngx-translate/core";
import { StaticVideoComponent } from "../components/static-video/static-video.component";
import { VideoPlayerComponent } from "../components/video-player/video-player.component";
import { PresentationComponent } from "../components/presentation/presentation.component";
import { Module16Component } from "./module1/module1-6.component";
import { Module17Component } from "./module1/module1-7.component";
import { Module19Component } from './module1/module1-9.component';
import { ModalModule } from "ngx-bootstrap";
import { Module14Component } from "./module1/module1-4.component";
import { McqcomponentComponent } from "../components/mcqcomponent/mcqcomponent.component";
import { Module13Component } from "./module1/module1-3.component";
import { DxChartModule, DxSelectBoxModule, DxRadioGroupModule, DxTemplateModule, DxPopupModule, DxCheckBoxModule, DxListModule, DxPieChartModule } from "devextreme-angular";
import { Module15Component } from './module1/module1-5.component';
import { Module18Component } from './module1/module1-8.component';
import { Module111Component } from './module1/module1-11.component';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { DomSanitizerPipe } from "../shared/pipes/dom-sanitizer.pipe";
import { Module110Component } from './module1/module1-10.component';
import { Module2Component } from './module2/module2.component';
import { Module22Component } from './module2/module2-2.component';
import { Module23Component } from './module2/module2-3.component';
import { Module24Component } from './module2/module2-4.component';
import { Module25Component } from './module2/module2-5.component';
import { Module29Component } from './module2/module2-9.component';
import { Module26Component } from './module2/module2-6.component';
import { Module27Component } from './module2/module2-7.component';
import { Module28Component } from './module2/module2-8.component';
import { Module217Component } from './module2/module2-17.component';
import { Ng2DragDropModule } from "ng2-drag-drop";
import { Module112Component } from "./module1/module1-12.component";
import { DragDropComponent } from "../components/drag-drop/drag-drop.component";
import { Module210Component } from './module2/module2-10.component';
import { Module211Component } from './module2/module2-11.component';
import { Module212Component } from './module2/module2-12.component';
import { Module213Component } from './module2/module2-13.component';
import { Module214Component } from './module2/module2-14.component';
import { Module215Component } from './module2/module2-15.component';
import { Module216Component } from './module2/module2-16.component';
import { FormsModule } from "@angular/forms";
import { Module3Component } from './module3/module3.component';
import { Module32Component } from './module3/module3-2.component';
import { Module33Component } from './module3/module3-3.component';
import { Module34Component } from './module3/module3-4.component';
import { Module35Component } from './module3/module3-5.component';
import { Module36Component } from './module3/module3-6.component';
import { Module37Component } from './module3/module3-7.component';
import { Module38Component } from './module3/module3-8.component';
import { Module39Component } from './module3/module3-9.component';
import { Module310Component } from './module3/module3-10.component';
import { Module311Component } from './module3/module3-11.component';
import { Module312Component } from './module3/module3-12.component';
import { Module313Component } from './module3/module3-13.component';
import { Module3Service } from "./module3/module3.service";
import { Module314Component } from './module3/module3-14.component';
import { Module315Component } from './module3/module3-15.component';
import { Module316Component } from './module3/module3-16.component';
import { Module317Component } from './module3/module3-17.component';
import { Module318Component } from './module3/module3-18.component';
import { Module4Component } from './module4/module4.component';
import { Module42Component } from './module4/module4-2.component';
import { Module43Component } from './module4/module4-3.component';
import { Module44Component } from './module4/module4-4.component';
import { Module45Component } from './module4/module4-5.component';
import { Module46Component } from './module4/module4-6.component';
import { Module47Component } from './module4/module4-7.component';
import { Module48Component } from './module4/module4-8.component';
import { Module49Component } from './module4/module4-9.component';
import { Module410Component } from './module4/module4-10.component';
import { Module411Component } from './module4/module4-11.component';
import { Module412Component } from './module4/module4-12.component';
import { Module413Component } from './module4/module4-13.component';
import { Module414Component } from './module4/module4-14.component';
import { Module4Service } from "./module4/module4.service";
import { NewBaselineComponent } from "../components/traineeBaseline/new-baseline/new-baseline.component"
import { QuizService } from "../components/traineeBaseline/services/quiz.service";
import { Ng5SliderModule } from "ng5-slider";
import { Module5Component } from './module5/module5.component';
import { Module52Component } from './module5/module5-2.component';
import { Module53Component } from './module5/module5-3.component';
import { Module54Component } from './module5/module5-4.component';
import { Module55Component } from './module5/module5-5.component';
import { Module56Component } from './module5/module5-6.component';
import { Module57Component } from './module5/module5-7.component';
import { Module58Component } from './module5/module5-8.component';
import { Module59Component } from './module5/module5-9.component';
import { Module510Component } from './module5/module5-10.component';
import { Module511Component } from './module5/module5-11.component';
import { Module512Component } from './module5/module5-12.component';
import { Module513Component } from './module5/module5-13.component';
import { Module514Component } from './module5/module5-14.component';
import { Module515Component } from './module5/module5-15.component';
import { Module5Service } from "./module5/module5.service";
import { AudioPlayerComponent } from "../components/audio-player/audio-player.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ModulesRoutingModule,
    PdfViewerModule,
    ModalModule.forRoot(),
    Ng2DragDropModule.forRoot(),
    FormsModule,
    DxChartModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    DxTemplateModule,
    DxPopupModule,
    DxCheckBoxModule,
    DxListModule,
    DxPieChartModule,
    Ng5SliderModule
  ],
  declarations: [
    Module0Component,
    StaticVideoComponent,
    Module1Component,
    VideoPlayerComponent,
    PresentationComponent,
    Module12Component,
    Module16Component,
    Module17Component,
    Module13Component,
    Module14Component,
    McqcomponentComponent,
    Module15Component,
    Module18Component,
    Module111Component,
    DomSanitizerPipe,
    Module19Component,
    Module110Component,
    Module112Component,
    DragDropComponent,
    AudioPlayerComponent,
    Module2Component,
    Module22Component,
    Module23Component,
    Module24Component,
    Module25Component,
    Module29Component,
    Module26Component,
    Module27Component,
    Module28Component,
    Module217Component,
    Module210Component,
    Module211Component,
    Module212Component,
    Module213Component,
    Module214Component,
    Module215Component,
    Module216Component,
    Module3Component,
    Module32Component,
    Module33Component,
    Module34Component,
    Module35Component,
    Module36Component,
    Module37Component,
    Module38Component,
    Module39Component,
    Module310Component,
    Module311Component,
    Module312Component,
    Module313Component,
    Module314Component,
    Module315Component,
    Module316Component,
    Module317Component,
    Module318Component,
    Module4Component,
    Module42Component,
    Module43Component,
    Module44Component,
    Module45Component,
    Module46Component,
    Module47Component,
    Module48Component,
    Module49Component,
    Module410Component,
    Module411Component,
    Module412Component,
    Module413Component,
    Module414Component,
    NewBaselineComponent,
    Module5Component,
    Module52Component,
    Module53Component,
    Module54Component,
    Module55Component,
    Module56Component,
    Module57Component,
    Module58Component,
    Module59Component,
    Module510Component,
    Module511Component,
    Module512Component,
    Module513Component,
    Module514Component,
    Module515Component
  ],
  providers: [
    Module0Service,
    Module1Service,
    Module2Service,
    Module3Service,
    Module4Service,
    Module5Service,
    QuizService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModulesModule {}
