import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {

  @Input() hasDropZone: boolean;
  @Input() uploadUrl: string;
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

  private initUploader() {
    const token = localStorage.getItem('token');
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      itemAlias: 'file',
      authToken: `Bearer ${token}`,
      isHTML5: true,
      queueLimit: 1,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (item => {
      item.withCredentials = false;
    });

    this.uploader.onProgressItem = (progress: any) => {
      this.uploading = true;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.uploading = false;
      if (status === 200) {
        this.uploadSucceed.emit(JSON.parse(response));
        this.fileSelect.nativeElement.value = '';
      } else {
        this.uploader.clearQueue();
        this.uploadFailed.emit();
      }
    };
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

}
