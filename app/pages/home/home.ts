import { Component, OnInit } from '@angular/core';
import { NavController, App, LoadingController, LocalStorage, Storage } from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native'
import {LoginPage} from '../login/login'
import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'

import {EmrPage} from '../emr/emr'

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
  dateServ: any
  myImg: string
  
  constructor(public navCtrl: NavController,
    private app: App, private apiProvider: Api,
    private configure: Configure, private loadingCtrl: LoadingController) {
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()

    this.myImg = 'data:image/jpeg;base64,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'
  }

  dateFilter() {
    SpinnerDialog.show(null, 'Please wait...')
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
    
    SpinnerDialog.show(null, 'Please wait...')
    
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
      SpinnerDialog.show(null, 'Searching...')
      this.localStorage.get('token')
      .then(token => {
        this.apiProvider.search(this.url, this.query, token)
          .then((res) => {
            let result = <HTTPResult>res;
            this.people = result.rows;
            SpinnerDialog.hide()
          }, err => {
            SpinnerDialog.hide()
            console.log(err)
          });
      });
    }
  }

  goEmr(person: Object) {
    this.navCtrl.push(EmrPage, {data: person})
  }


  logout() {
    this.localStorage.remove('token')
      .then(() => {
        let nav = this.app.getRootNav();
        nav.setRoot(LoginPage)
      });
  }
}
