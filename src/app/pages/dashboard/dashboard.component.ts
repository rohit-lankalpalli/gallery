import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailImageComponent } from '../thumbnail-image/thumbnail-image.component';
import { CommonUtilService } from 'src/app/services/common-util.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ThumbnailImageComponent, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, InfiniteScrollModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  imageDetailsArray: any;
  places = new FormControl('');

  placesList: string[] = [];
  scrollArray: Array<any>;
  pageSize=16;
  totalPages=0;
  currentPage=1;
  showResults=false;
  loading: any;

  constructor(private util: CommonUtilService) {

  }

  async ngOnInit() {
    if (CommonUtilService.imageDetailsArray && CommonUtilService.imageDetailsArray.length > 0) {
      this.imageDetailsArray = CommonUtilService.imageDetailsArray;
    } else {
      this.util.spinner.show();
      let res = await this.util.callGETRequest('/api/googleDrive/getMetadata');
      this.util.spinner.hide();
      CommonUtilService.imageDetailsArray = res;
      this.imageDetailsArray = CommonUtilService.imageDetailsArray ;
    }
    this.getInitialScrollArray();
    this.util.callGETRequest('/api/checkAuth');
    let placesArray = [];
    CommonUtilService.imageDetailsArray.forEach(element => {
      if (element.place && placesArray.indexOf(element.place) == -1) {
        placesArray.push(element.place);
      }
    });
    this.placesList = placesArray;
  }

  filterArray(event) {
    if (event.value && event.value instanceof Array && event.value.length > 0) {
      let filteredArray = [];
      CommonUtilService.imageDetailsArray.forEach(element => {
        if (element.place && event.value.includes(element.place)) {
          filteredArray.push(element);
        }
      });
      this.imageDetailsArray= filteredArray;
    } else {
      this.imageDetailsArray= CommonUtilService.imageDetailsArray;
    }
    this.getInitialScrollArray();
  }

  onScroll() {
    if (this.currentPage < this.totalPages){
      this.getElementsFromStaticArray(this.currentPage*this.pageSize);
      this.currentPage = this.currentPage + 1;
    }
  }

  getElementsFromStaticArray(startIndex) {
    let oldArray = this.scrollArray;
    let tempArray = [...this.imageDetailsArray];
    let newArray = tempArray.splice(startIndex, this.pageSize);
    console.log('oldArray',oldArray, "  new Array",newArray)
    this.scrollArray = [ ...oldArray, ...newArray];
  }

  getInitialScrollArray() {
    this.totalPages=0;
    this.currentPage=1;
    if (this.imageDetailsArray.length % 12 == 0){
      this.totalPages = this.imageDetailsArray.length / 12;
    } else {
      this.totalPages = Math.floor(this.imageDetailsArray.length / 12) + 1;
    }
    this.scrollArray = [];
    this.getElementsFromStaticArray(0);
  }

}
