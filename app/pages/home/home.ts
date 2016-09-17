import { Component, OnInit } from '@angular/core';
import { NavController, App, LocalStorage, Storage } from 'ionic-angular';

import {LoginPage} from '../login/login'
import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'

interface HTTPResult {
  ok: boolean,
  msg?: string,
  rows?: Array<Object>
}

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Api, Configure]
})
export class HomePage implements OnInit {

  localStorage: LocalStorage
  people: Array<Object>
  url: string
  query: string

  constructor(public navCtrl: NavController,
    private app: App, private apiProvider: Api, private configure: Configure) {
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()
  }

  ngOnInit() {
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getList(this.url, token)
          .then((res) => {
            let result = <HTTPResult>res;
            this.people = result.rows;
          }, err => {
            console.log(err)
          });
      });
  }  

  search(event: any) {
    if (this.query.length >= 2) {
      // search
      this.localStorage.get('token')
      .then(token => {
        this.apiProvider.search(this.url, this.query, token)
          .then((res) => {
            let result = <HTTPResult>res;
            this.people = result.rows;
          }, err => {
            console.log(err)
          });
      });
    }
  }

  logout() {
    this.localStorage.remove('token')
      .then(() => {
        let nav = this.app.getRootNav();
        nav.setRoot(LoginPage)
      });
  }
}
