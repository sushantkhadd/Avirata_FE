import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component'
// import { TranslateStaticLoader, TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ng2-img-cropper';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TranslateModule.forChild(),
    ImageCropperModule
  ],
  declarations: [ImageUploadComponent],
  exports:[ImageUploadComponent]
})
export class SharedModule { }
