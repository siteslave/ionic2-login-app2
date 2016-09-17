import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LocalStorage, Storage } from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native'

import * as moment from 'moment'

import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'
import {EmrDetailPage} from '../emr-detail/emr-detail'

interface HTTPResult {
  ok: boolean,
  msg?: string,
  rows?: Array<Object>
}

interface Person {
  HOSPCODE: string,
  PID: string,
  NAME: string,
  LNAME: string,
  DATE_SERV: string
}

interface RowData {
  date_serv: string,
  hoscode: string,
  hosname?: string,
  diagcode?: string,
  diagtname?: string
}

@Component({
  templateUrl: 'build/pages/emr/emr.html',
  providers: [Api, Configure]
})
export class EmrPage implements OnInit {
  localStorage: LocalStorage
  person: Person
  visit: Array<Object>
  url: string
  constructor(private navCtrl: NavController, private navParams: NavParams,
  private apiProvider: Api, private configure: Configure) {
    this.person = <Person>this.navParams.get('data');
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()
  }

  goEmrDetail() {
    let hpid = `${this.person.HOSPCODE}${this.person.PID}`;
    let dateServ = this.person.DATE_SERV;

    this.navCtrl.push(EmrDetailPage, { hpid: hpid, dateServ: dateServ });
  }

  ngOnInit() {
    let hpid = `${this.person.HOSPCODE}${this.person.PID}`;
    SpinnerDialog.show(null, 'Please wait...');
    
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getEmr(this.url, token, hpid)
          .then((res) => {
            let result = <HTTPResult>res;
            // this.visit = result.rows;
            this.visit = [];

            result.rows.forEach((v: RowData) => {
              let _date_serv = `${moment(v.date_serv, 'YYYY-MM-DD').format('DD')}/${moment(v.date_serv, 'YYYY-MM-DD').format('MM')}/${moment(v.date_serv, 'YYYY-MM-DD').get('year') + 543}`
              let obj: RowData = {
                date_serv: _date_serv,
                hoscode: v.hoscode,
                hosname: v.hosname
              }

              this.visit.push(obj);

            });

            SpinnerDialog.hide();
          }, err => {
            console.log(err)
          });
      });
  }

}
