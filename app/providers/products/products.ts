import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Products {

  constructor(private http: Http) {}

  getList(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let url = `http://192.168.1.48:8080/products?token=${token}`;
      // let url = 'http://localhost:8080/products?token=' + token;
      
      this.http.get(url, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
  
}

