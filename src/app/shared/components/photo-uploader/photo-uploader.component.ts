import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit, OnChanges {

  private readonly allowTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg'
  ];

  @Input() uploadUrl: string;
  @Input() autoUpload = false;
  @Input() hasDropZone = false;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();

  @ViewChild('fileSelect') fileSelect: ElementRef;

  uploader: FileUploader;
  hasDropZoneOver = false;
  uploading = false;

  constructor() { }

  ngOnInit() {
    this.initUploader();
  }

  ngOnChanges() {
    if (this.uploader) {
      this.uploader.setOptions({ url: this.uploadUrl });
    }
  }

  private initUploader() {
    const token = localStorage.getItem(environment.authTokenName);
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      itemAlias: 'image',
      authToken: `Bearer ${token}`,
      isHTML5: true,
      queueLimit: 1,
      allowedMimeType: this.allowTypes,
      removeAfterUpload: true,
      autoUpload: this.autoUpload,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });

    this.uploader.onProgressItem = (progress: any) => {
      this.uploading = true;
    };

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.uploading = false;
      this.fileSelect.nativeElement.value = null;
      this.uploadSucceed.emit(JSON.parse(response));
    };

    this.uploader.onErrorItem = (item: any, reponse: any, status: any, headers: any) => {
      this.uploading = false;
      this.fileSelect.nativeElement.value = null;
      this.uploadFailed.emit();
    };
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

}
