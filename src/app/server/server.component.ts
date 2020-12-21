import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpClientModule  } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
@Injectable()
export class ServerComponent implements OnInit {
  private username='dsdatta';
  private client_id='f9994826ce73c910beb9';
  private client_secret='51b893231e89e64903ef4c32c7fffca8d844abd5';

  constructor(private _http:HttpClient) {
    console.log('Github service started...');
   }
   getUser()
   {
     return this._http.get('https://api.github.com/users/'+this.username+'?client_id='+this.client_id+'&client_secret='+this.client_secret);
   }
   errorHandler(error: any): void {
    console.log(error)
  }
   searchUser(username:any)
   {
    this.username=username;
   }

  ngOnInit(): void {
  }

}
