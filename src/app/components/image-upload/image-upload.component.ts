import { Component, OnInit, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ModalDirective } from "ngx-bootstrap";
import { UploadService } from './upload.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

  data: any;
  @Output() public returnData = new EventEmitter<Boolean>();
  @ViewChild('uploadImageModal') public uploadImageModal: ModalDirective;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  croppedImage;
  emptySumbitMessage = false;
  wrongFileSelection = false;
  constructor(public UploadService: UploadService,public LocalstoragedetailsService:LocalstoragedetailsService,public toastr: ToastsManager, vcr: ViewContainerRef,  public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;

    this.cropperSettings.canvasWidth = 450;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;

    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.compressRatio = 1;
    this.cropperSettings.cropOnResize = true;

    this.data = {};

  }

  ngOnInit() {
  }
  fileChangeListener($event) {
    var image = $event.target.files[0];
    this.cropper.reset();
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
      this.wrongFileSelection = true;
      this.emptySumbitMessage = false;

      return;
    }
    this.wrongFileSelection = false;
    this.emptySumbitMessage = false;
    var image: any = new Image();
    var file: File = $event.target.files[0];

    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }
  cropped(e) {

    this.croppedImage = this.data.image;
  }
  sendImage() {
    if (this.croppedImage == undefined || this.croppedImage == "" || this.croppedImage == null) {

      this.emptySumbitMessage = true;
      this.wrongFileSelection = false;
    }
    else {
      this.UploadService.setImage(this.croppedImage)
        .subscribe(
        data => {

          if (data['Response']=='Successfully'){
                  this.returnData.emit(true);
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }//Catch Error if server is not Found
        );
      this.croppedImage = "";
      this.cropper.reset();
      this.uploadImageModal.hide();
    }
  }
}
