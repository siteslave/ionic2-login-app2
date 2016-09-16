import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Login} from '../../providers/login/login'
import {TabsPage} from '../tabs/tabs'

interface HTTPResult {
  ok: boolean,
  fullname?: string,
  username?: string,
  msg?: string
}

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Login]
})
export class LoginPage {
  username: string
  password: string
  constructor(private navCtrl: NavController,
    private loginProvider: Login) {

  }

  login() {
    this.loginProvider.doLogin(this.username, this.password)
      .then(res => {
        let result = <HTTPResult>res;
        if (result.ok) {
          this.navCtrl.setRoot(TabsPage)
        } else {
          alert(result.msg)
        }
      }, err => {
        alert('ไม่สามารถเชื่อมกับ server ได้')
      });
  }
}
