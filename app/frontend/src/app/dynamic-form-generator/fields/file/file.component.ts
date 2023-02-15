import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input() field:any = {};
  @Input() form:FormGroup | any;
  preloadedImageArray: any = [];
  preloadedImage: any = [];
  isShowPreviewImage = false;
  get isValid() { 
    return this.form?.controls[this.field.name].valid; 
  }
  get isDirty() { 
    return this.form?.controls[this.field.name].dirty; 
  }
  isHovering: boolean = false;
  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  constructor(private confirmationService: ConfirmationService,
    public translate: TranslateService,) {
    
  }

  ngOnInit() {
    // console.log(this.field?.value);
    if(this.field?.value) {
      this.isShowPreviewImage = false;
      (typeof(this.field?.value) == 'string' && !this.field.multiple) ? 
            this.preloadedImage.push(this.field.value) :  
                  (this.preloadedImageArray = this.field.value);
      setTimeout(() => this.isShowPreviewImage = true);
    }
    console.log("image file", this.preloadedImageArray);
  }

  ngOnChange(){
    // this.field.value.
  }

  toggleHover($event: any) {
    this.isHovering != this.isHovering
  }

  onChange(event: any) {
    console.log("file event", event);
    if (event.target.files.length) {
      [...event.target.files].forEach((file) => {
        file['fileUpload'] = `${this.generateUniqueId()}+A`
      })
    }
    console.log("file event", event.target.files);
    this.previewImages(event);
    return this.field.onUpload(event.target.files);
  }
  
  previewImages(event: any) {
    if (event.target.files) {
      this.isShowPreviewImage = false;
      if(this.field.multiple) {
        this.previewImageArray(event.target.files);
      } else {
        this.preloadedImageArray = [];
        this.previewImage(event.target.files[0])
      }
      setTimeout(() => this.isShowPreviewImage = true, 10);
    }
  }

  previewImageArray(files: any) {
    if(files.length) {
      [...files].forEach((file) => {
        this.previewImage(file)
      })
    }
  }

  previewImage(file: any) {
    if (file) {
      let oFReader = new FileReader();
      oFReader.readAsDataURL(file);
  
      oFReader.onload = (oFREvent) => {
        if (this.field.multiple) {
          this.preloadedImageArray = [...this.preloadedImageArray, {id: file.fileUpload, file: oFREvent?.target?.result, project_creation: 'A'}];
          console.log('file upload', this.preloadedImageArray);
        } else {
          this.preloadedImage = [...this.preloadedImage, oFREvent?.target?.result];
          console.log('file upload', this.preloadedImage);
        }
      };
    }
  }

  generateUniqueId() {
    return Math.floor(8000 + Math.random() * 1000);
  }

  display(data: any) {
    this.checkType(data);
    let fileName = ''
    if (data.startsWith("http://")) {
      let stringStart = data.search("/media/images/");
      fileName = data.slice(stringStart + 14)
      // console.log('file name', fileName);
    }
    return fileName
  }

  checkType(data: any) {
    let fileType = ''
    // console.log('check file', typeof(data), data);
    if (data.startsWith("http://")) {
      let stringStart = data.search("/media/images/");
      let fileName = data.slice(stringStart + 14)  
      // console.log('file name', fileName);
      // console.log('file type', fileName.lastIndexOf("."))
      let endDot = fileName.lastIndexOf(".") 
      fileType = fileName.slice(endDot)
      // console.log('file type', fileType);
    }
    return fileType
  }

  deleteImage(event: any, data: any) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    console.log('deleted', data);
    console.log('image list', this.preloadedImageArray);
    // let imageIndex = this.preloadedImageArray.indexOf(data);
    // console.log('index', imageIndex);
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: '',
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteFile',
      accept: () => {
        this.preloadedImageArray.forEach((element: any, index: any)=>{
          if(element.id==data.id) this.preloadedImageArray.splice(index, 1);
        });
          this.field.deleteFile(data.id);
        console.log('on delete', this.preloadedImageArray);
      }
    })
  }
}
