import { Component } from '@angular/core';
import { CommonUtilService } from './services/common-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gallery';

  showMenu = true;

  menuNames = [
    { link: '', name: 'Home', matIconName: 'home' },
    { link: '', name: 'Search', matIconName: 'search' },
    { link: '', name: 'Sign In', matIconName: 'account_circle' }
  ];
  constructor(private util: CommonUtilService) {

  }
}
