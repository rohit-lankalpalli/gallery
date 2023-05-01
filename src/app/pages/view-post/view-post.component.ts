import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { Observable, Observer } from "rxjs";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule,RouterModule],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  constructor(private route: ActivatedRoute,public util:CommonUtilService,private sanitizer:DomSanitizer,private renderer: Renderer2) {

  }

  id: any;

 imageDetails: any = {
    user: 'Rohit',
    src: '',
    caption: ``,
    alt: '',
    location: ''
  };
  showPost= false;
  showTextArea = false;

  async ngOnInit() {
    let id = this.route.snapshot.params.id;
    let op = this.route.snapshot.params.op;
    this.id = id;
    this.util.spinner.show();
    if (CommonUtilService.imageDetailsArray) {
      this.getPostDetails(id);
    } else {
      this.util.spinner.show();
      let res = await this.util.callGETRequest('/api/googleDrive/getMetadata');
      this.util.spinner.hide();
      CommonUtilService.imageDetailsArray = res;
      this.getPostDetails(id);
    }
    if (op == 'edit') {
      this.showTextArea = true;
    }   
  }

  getPostDetails(id) {
    CommonUtilService.imageDetailsArray.forEach(element => {
      if (element.id == id) {
        this.imageDetails = element;
      }
    });
  }

  showCaption() {
      return this.sanitizer.bypassSecurityTrustHtml(this.imageDetails.caption);
  }

  showJSON() {
    return JSON.stringify(this.imageDetails);
  }

  previewChanges(event) {
    this.imageDetails=JSON.parse(event);
  }

  downloadImage() {
    window.open('/api/image/download?id='+this.imageDetails.id+'&fileName='+this.imageDetails.alt, "_blank");
  }

}
