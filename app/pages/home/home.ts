import { Component, OnInit } from '@angular/core';
import { NavController, App, LocalStorage, Storage } from 'ionic-angular';

import {LoginPage} from '../login/login'
import {Products} from '../../providers/products/products'

interface HTTPResult {
  ok: boolean,
  msg?: string,
  rows?: Array<Object>
}

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Products]
})
export class HomePage implements OnInit {

  localStorage: LocalStorage
  products: Array<Object>

  constructor(public navCtrl: NavController,
    private app: App, private productProvider: Products) {
    this.localStorage = new Storage(LocalStorage)
  }

  ngOnInit() {
    this.localStorage.get('token')
      .then(token => {
        this.productProvider.getList(token)
          .then((res) => {
            let result = <HTTPResult>res;
            this.products = result.rows;
          }, err => {
            console.log(err)
          });
      });
  }  

  logout() {
    this.localStorage.remove('token')
      .then(() => {
        let nav = this.app.getRootNav();
        nav.setRoot(LoginPage)
      });
  }
}
