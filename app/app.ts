import { Component } from '@angular/core';
import { Platform, ionicBootstrap, AlertController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';

import {LoginPage} from './pages/login/login'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform, private alertCtrl: AlertController) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#00796B');
    });

    platform.registerBackButtonAction(() => {
      let confirm = this.alertCtrl.create({
        title: 'Exit app?',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Exit',
            handler: () => { platform.exitApp(); }
          },
          {
            text: 'Cancel',
            handler: () => { }
          }
        ]
      });
      confirm.present();

    });

  }
}

ionicBootstrap(MyApp);
