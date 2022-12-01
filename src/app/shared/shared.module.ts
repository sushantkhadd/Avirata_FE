import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component'
// import { TranslateStaticLoader, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ng2-img-cropper';
import { TranslateModule } from '@ngx-translate/core';
import { PreventDoubleClickDirective } from './directives/prevent-double-click.directive';
import { SortPipe } from './pipes/sort.pipe';
import { NumberConvertorPipe } from 'src/app/shared/pipes/number-converter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    ImageCropperModule
  ],
  declarations: [ImageUploadComponent, PreventDoubleClickDirective, SortPipe,NumberConvertorPipe],
  exports: [ImageUploadComponent, PreventDoubleClickDirective,SortPipe,NumberConvertorPipe]
})
export class SharedModule {}
