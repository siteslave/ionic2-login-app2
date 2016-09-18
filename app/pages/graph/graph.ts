import { Component, OnInit } from '@angular/core';
import { NavController, LocalStorage, Storage } from 'ionic-angular';

import {CHART_DIRECTIVES} from 'angular2-highcharts'

import {Api} from '../../providers/api/api'
import {Configure} from '../../providers/configure/configure'

interface IcdData {
  diagcode: string,
  diagtname: string,
  total: number
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

  constructor(private navCtrl: NavController, private apiProvider: Api, private configure: Configure) {

    this.localStorage = new Storage(LocalStorage);    
    this.url = this.configure.getUrl()

    this.slideOptions = {
      loop: true,
      pager: true
    }


    this.options2 = {
      chart: {
        type: 'column'
      },
      credits: false,

      title: {
        text: 'Total fruit consumtion, grouped by gender'
      },

      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Number of fruits'
        }
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y + '<br/>' +
            'Total: ' + this.point.stackTotal;
        }
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },

      series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2],
        stack: 'male'
      }, {
          name: 'Joe',
          data: [3, 4, 4, 2, 5],
          stack: 'male'
        }, {
          name: 'Jane',
          data: [2, 5, 6, 2, 1],
          stack: 'female'
        }, {
          name: 'Janet',
          data: [3, 0, 4, 4, 3],
          stack: 'female'
        }]
    };

  }

  createGraphTopIcd(categories, data) {
    this.options = {
      chart: {type: 'column'},
      title: { text: '10 อันดับโรค' },
      xAxis: {
        categories: categories
      },
      series: [{
        data: data,
      }],
      credits: false
    };
  }
  
  ngOnInit() {

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

          }, err => {
          
          });
      });
  }


}
