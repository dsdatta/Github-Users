import { Component } from '@angular/core';
import { ServerComponent } from './server/server.component';
import { HttpClientModule  } from '@angular/common/http';

declare const myFunction:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClientModule ,ServerComponent]
})
export class AppComponent {
  title = 'Github-Users';
 
  
}
