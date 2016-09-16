import { Component } from '@angular/core';
import { NavController, App, LocalStorage, Storage } from 'ionic-angular';

import {LoginPage} from '../login/login'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  localStorage: LocalStorage

  constructor(public navCtrl: NavController, private app: App) {
    this.localStorage = new Storage(LocalStorage)
  }

  logout() {
    this.localStorage.remove('fullname')
      .then(() => {
        let nav = this.app.getRootNav();
        nav.setRoot(LoginPage)
      });
    
  }
}
