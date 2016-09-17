import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsMarkerOptions, Geolocation} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})
export class MapsPage implements OnInit {
  map: GoogleMap
  latLng: GoogleMapsLatLng
  allMarkers: GoogleMapsMarker[]
  
  constructor(private navCtrl: NavController) {

  }

  createMarker(title, latLng: GoogleMapsLatLng) {
    let _title = title || 'Your location';
    let markerOptions: GoogleMapsMarkerOptions = {
      position: latLng,
      title: _title,
      draggable: true
    }

    this.map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        // this.mapsMarker = marker
        // marker.showInfoWindow();
      });
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
        


        // create markers 
        let markers: GoogleMapsLatLng[]
        markers = [];

        let marker1 = new GoogleMapsLatLng(15.408987, 104.510826)
        let marker2 = new GoogleMapsLatLng(15.311723, 104.421262)
        let marker3 = new GoogleMapsLatLng(15.895975, 105.111973)

        markers.push(marker1)
        markers.push(marker2)
        markers.push(marker3)

        markers.forEach(v => {
          let markerOptions: GoogleMapsMarkerOptions = {
            position: v,
            title: null,
            draggable: true
          }

          this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {});
        })
        
      });


    }, err => {
      console.log(err)
    });
  }
}  
