import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Camera, CameraOptions} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {

  img: string
  constructor(public navCtrl: NavController) {
  }

  takePicture() {
    let options: CameraOptions = {
      destinationType: 0,
      quality: 50,
      targetHeight: 400,
      targetWidth: 400
    }
    Camera.getPicture(options)
      .then(imageData => {
      this.img = 'data:image/jpeg;base64,' + imageData;
    })

  }

  getPicture() {
    let options: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      quality: 50,
      targetHeight: 400,
      targetWidth: 400
    }
    Camera.getPicture(options)
      .then(imageData => {
      this.img = 'data:image/jpeg;base64,' + imageData;
    })

  }
}
