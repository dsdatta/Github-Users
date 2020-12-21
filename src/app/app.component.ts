import { Component } from '@angular/core';
//import { GithubComponent } from './github/github.component';
import { ServerComponent } from './server/server.component';
import { HttpClientModule  } from '@angular/common/http';
import {myFunction} from '../assets/js/custom.js';

declare const myFunction:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //directives: [HttpProviders],
  providers: [HttpClientModule ,ServerComponent]
})
export class AppComponent {
  title = 'Github-Users';
  // test() {
  //   myFunction();
  // }
  
}
