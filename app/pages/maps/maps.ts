import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsMarker,
  GoogleMapsLatLng, GoogleMapsMarkerOptions,
  Geolocation, LaunchNavigator, LaunchNavigatorOptions} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/maps/maps.html',
})
export class MapsPage implements OnInit {
  map: GoogleMap
  latLng: GoogleMapsLatLng
  allMarkers: GoogleMapsMarker[]
  lat: number
  lng: number
  
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


  go() {
    let latLng = new GoogleMapsLatLng(15.408987, 104.510826)
    this.createMarker('นายทดสอบ เล่นๆ', latLng);
    this.map.setZoom(18)
    this.map.setCenter(latLng);
  }  

  getDirection() {
    let start = `${this.lat}, ${this.lng}`
    let end = '15.408987, 104.510826'
    let options: LaunchNavigatorOptions = {
      start: start
    };

    LaunchNavigator.navigate(end, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
    );
    
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
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          this.latLng = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);
          this.map.setCenter(this.latLng);
        }, err => {
          console.log(err)
          });
        


        // create markers 
        /*
        let latLngs: GoogleMapsLatLng[]
        latLngs = [];

        let marker1 = new GoogleMapsLatLng(15.408987, 104.510826)
        let marker2 = new GoogleMapsLatLng(15.311723, 104.421262)
        let marker3 = new GoogleMapsLatLng(15.895975, 105.111973)

        latLngs.push(marker1)
        latLngs.push(marker2)
        latLngs.push(marker3)
        this.allMarkers = [];

        latLngs.forEach(v => {
          let markerOptions: GoogleMapsMarkerOptions = {
            position: v,
            title: null,
            draggable: true
          }

          this.map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
              this.allMarkers.push(marker)
            });
        })

        */
        
      });


    }, err => {
      console.log(err)
    });
  }
}  
