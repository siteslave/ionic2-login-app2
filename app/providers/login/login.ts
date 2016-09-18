import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Configure} from '../configure/configure'

@Injectable()
export class Login {

  constructor(private http: Http) { }
  
  doLogin(url, username, password) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { username: username, password: password };

      let _url = `${url}/login`;
      
      this.http.post(_url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
  
  registerDevice(url, token, username, deviceToken) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { token: token, username: username, deviceToken: deviceToken };

      let _url = `${url}/api/register-device`;
      
      this.http.post(_url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }

}

