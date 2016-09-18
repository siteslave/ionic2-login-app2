import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {CHART_DIRECTIVES} from 'angular2-highcharts'

@Component({
  templateUrl: 'build/pages/graph/graph.html',
  directives: [CHART_DIRECTIVES]
})
export class GraphPage {
  options: Object
  constructor(private navCtrl: NavController) {
    this.options = {
      chart: {type: 'column'},
      title: { text: 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2],
      }]
    };
  }

}
