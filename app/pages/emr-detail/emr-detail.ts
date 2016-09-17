import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LocalStorage, Storage } from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native'

import * as moment from 'moment'

import {Configure} from '../../providers/configure/configure'
import {Api} from '../../providers/api/api'

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
  diagtname?: string,
  village?: string,
  tambon?: string,
  ampur?: string
}

@Component({
  templateUrl: 'build/pages/emr-detail/emr-detail.html',
  providers: [Configure, Api]
})
export class EmrDetailPage implements OnInit {

  localStorage: LocalStorage
  url: string
  info: Object
  dateServ: string
  hpid: string

  hoscode: string
  hosname: string
  diagtname: string
  diagcode: string
  date_serv: string
  address: string

  constructor(private navCtrl: NavController, private configure: Configure,
    private apiProvider: Api, private navParams: NavParams) {
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()

    this.dateServ = moment(this.navParams.get('dateServ')).format('YYYY-MM-DD')
    this.hpid = this.navParams.get('hpid')

  }

  ngOnInit() {
    
    SpinnerDialog.show(null, 'Please wait...')
    
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getEmrDetail(this.url, token, this.hpid, this.dateServ)
          .then((res) => {
            let result = <HTTPResult>res;

            let data = <RowData>result.rows[0];
            this.date_serv = `${moment(data.date_serv, 'YYYY-MM-DD').format('DD')}/${moment(data.date_serv, 'YYYY-MM-DD').format('MM')}/${moment(data.date_serv, 'YYYY-MM-DD').get('year') + 543}`
            this.hoscode = data.hoscode
            this.hosname = data.hosname
            this.diagcode = data.diagcode
            this.diagtname = data.diagtname
            this.address = `หมู่บ้าน ${data.village} ต.${data.tambon} อ.${data.ampur}`
            
            SpinnerDialog.hide();
          }, err => {
            console.log(err)
          });
      });
  }  


}
