import { Component, OnInit } from '@angular/core';
import { NavController, LocalStorage, Storage } from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native'
import {CHART_DIRECTIVES} from 'angular2-highcharts'

import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'

interface IcdData {
  diagcode: string,
  diagtname: string,
  total: number
}

interface HospitalData {
  hosname: string,
  hoscode?: string,
  total: number
}

interface HTTPResultHospital {
  ok: boolean,
  rows?: Array<HospitalData>,
  msg?: string
}

interface HTTPResult {
  ok: boolean,
  rows?: Array<IcdData>,
  msg?: string
}

@Component({
  templateUrl: 'build/pages/graph/graph.html',
  directives: [CHART_DIRECTIVES],
  providers: [Api, Configure]
})
export class GraphPage implements OnInit {
  options: Object
  options2: Object
  slideOptions: Object
  localStorage: LocalStorage
  url: string
  icds: Array<IcdData>
  hospitals: Array<HospitalData>

  constructor(private navCtrl: NavController, private apiProvider: Api, private configure: Configure) {

    this.localStorage = new Storage(LocalStorage);
    this.url = this.configure.getUrl()

    this.slideOptions = {
      loop: true,
      pager: true
    }
  }

   
  createGraphTopIcd(categories, data) {
    this.options = {
      chart: {type: 'column'},
      title: { text: '10 อันดับโรค' },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'จำนวนคน'
        }
      },
      series: [{
        name: 'โรค',
        data: data,
      }],
      credits: false
    };
  }

   
  createGraphTopHospital(categories, data) {
    this.options2 = {
      chart: {type: 'column'},
      title: { text: '10 อันดับหน่วยบริการ' },
      yAxis: {
        title: {
          text: 'จำนวนคน'
        }
      },
      xAxis: {
        categories: categories
      },
      series: [{
        name: 'หน่วยบริการ',
        data: data,
      }],
      credits: false
    };
  }
  
  ngOnInit() {

    SpinnerDialog.show(null, 'Loading...')
    this.localStorage.get('token')
      .then(token => {
        this.apiProvider.getTopTen(this.url, token)
          .then(res => {
            let results = <HTTPResult>res;
            this.icds = results.rows
            let categories: string[] = [];
            let data: number[] = []

            this.icds.forEach(v => {
              categories.push(v.diagcode)
              data.push(v.total)
            });
            this.createGraphTopIcd(categories, data)    
            
            return this.apiProvider.getTopHospital(this.url, token);
          })
          .then(res => {
            let results = <HTTPResultHospital>res;
            this.hospitals = results.rows
            let categories: string[] = [];
            let data: number[] = []

            this.hospitals.forEach(v => {
              categories.push(v.hosname)
              data.push(v.total)
            });
            this.createGraphTopHospital(categories, data)    
            SpinnerDialog.hide()
          }, err => {
            console.log(err)
            SpinnerDialog.hide()
          });
      });
  }


}
