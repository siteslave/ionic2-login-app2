import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {CHART_DIRECTIVES} from 'angular2-highcharts'

@Component({
  templateUrl: 'build/pages/graph/graph.html',
  directives: [CHART_DIRECTIVES]
})
export class GraphPage {
  options: Object
  options2: Object
  slideOptions: Object

  constructor(private navCtrl: NavController) {

    this.slideOptions = {
      loop: true,
      pager: true
    }

    this.options = {
      chart: {type: 'line'},
      title: { text: 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }],
      credits: false
    };

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

}
