import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})
export class MapsPage implements OnInit {
  map: GoogleMap
  constructor(private navCtrl: NavController) {

  }

  ngOnInit() {
    GoogleMap.isAvailable().then(() => {
      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        }
      });
    }, err => {
      console.log(err)
    });
  }
}  
