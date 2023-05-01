import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {Location} from '@angular/common'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  public API_ENDPOINT:String = environment.API_ENDPOINT;

  public static isValidUser:boolean = false;
  public static imageDetailsArray:any;

  constructor(private http: HttpClient, public router: Router, public route: ActivatedRoute, public location: Location, 
    public formBuilder: FormBuilder, public toastrService: ToastrService, public spinner: NgxSpinnerService) { 

  }

  callGETRequest(url) {
    return this.http.get(this.API_ENDPOINT + url).toPromise().then((res: any)=> {return res;});
  }

  callPOSTRequest(url, formData) {
    return this.http.post(this.API_ENDPOINT + url, formData).toPromise().then((res: any)=> {return res;});
  }

  callPutRequest(url, formData) {
    return this.http.put(this.API_ENDPOINT + url, formData).toPromise().then((res: any)=> {return res;});
  }

  callDeleteRequest(url) {
    return this.http.delete(this.API_ENDPOINT + url).toPromise().then((res: any)=> {return res;});
  }

  resetForm(form: FormGroup, defaultValues?: any){
    const formValue = Object.assign({}, form.value);
    Object.keys(formValue).forEach(key => {
      const property = formValue[key];
      if (typeof(property) == "string"){
        formValue[key]='';
      } else if (typeof(property) == "number") {
        formValue[key]=0;
      } else {
        formValue[key]='';
      }
      form.patchValue(formValue);
      if (defaultValues) {
        form.patchValue(defaultValues);
      }
      Object.keys(form.controls).forEach(key=> {
        form.controls[key].markAsPristine();
        form.controls[key].setErrors(null);
      });
    });
  }


}
