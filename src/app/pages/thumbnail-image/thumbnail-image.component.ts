import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { CommonUtilService } from 'src/app/services/common-util.service';

@Component({
  selector: 'app-thumbnail-image',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './thumbnail-image.component.html',
  styleUrls: ['./thumbnail-image.component.scss']
})
export class ThumbnailImageComponent implements OnInit{

  @Input('imageDetails') imageDetails: any;

  constructor(private router: Router,public util:CommonUtilService) {

  }

  ngOnInit() {
   this.util.spinner.show();
  }


  viewPost(postDetails?) {
    this.router.navigate(['/view-post',{id:this.imageDetails.id}]);
  }
}
