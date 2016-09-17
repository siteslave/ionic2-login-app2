import { Component, OnInit } from '@angular/core';
import { NavController, App, LoadingController, LocalStorage, Storage } from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native'
import {LoginPage} from '../login/login'
import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'

import * as moment from 'moment'

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

  // public event = {
  //   month: '1990-02-19',
  //   timeStarts: '07:43',
  //   timeEnds: '1990-02-20'
  // }

  dateServ: any
  
  constructor(public navCtrl: NavController,
    private app: App, private apiProvider: Api,
    private configure: Configure, private loadingCtrl: LoadingController) {
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()
  }

  dateFilter() {
    SpinnerDialog.show('Loading', 'Please wait...')
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getList(this.url, token, this.dateServ)
          .then((res) => {
            let result = <HTTPResult>res;
            this.people = result.rows;
            SpinnerDialog.hide();
          }, err => {
            console.log(err)
          });
      });
  } 
  ngOnInit() {

    this.dateServ = moment().format('YYYY-MM-DD');
    
    SpinnerDialog.show('Loading', 'Please wait...')
    
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getList(this.url, token, this.dateServ)
          .then((res) => {
            let result = <HTTPResult>res;
            this.people = result.rows;
            SpinnerDialog.hide();
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
