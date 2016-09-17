import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Configure {

  constructor(private http: Http) {}

  getUrl() {
    return 'http://localhost:8080'
  }
  
}

