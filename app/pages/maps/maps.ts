import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})
export class MapsPage implements OnInit {
  map: GoogleMap
  latLng: GoogleMapsLatLng

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

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {

        this.map.setZoom(16)
        this.map.setMapTypeId('MAP_TYPE_HYBRID')
        // this.map.refreshLayout()

        Geolocation.getCurrentPosition().then((resp) => {
          console.log(resp)
          this.latLng = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);
          this.map.setCenter(this.latLng);
        }, err => {
          console.log(err)
        });
        
      });


    }, err => {
      console.log(err)
    });
  }
}  
