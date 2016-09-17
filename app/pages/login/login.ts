import { Component } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';

import {Login} from '../../providers/login/login'
import {TabsPage} from '../tabs/tabs'
import {Configure} from '../../providers/configure/configure'

interface HTTPResult {
  ok: boolean,
  token?: string,
  msg?: string
}

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Login, Configure]
})
export class LoginPage {
  username: string
  password: string
  localStorage: LocalStorage
  url: string

  constructor(private navCtrl: NavController,
    private loginProvider: Login, private configure: Configure) {
    this.localStorage = new Storage(LocalStorage)
    this.url = this.configure.getUrl()

    this.localStorage.get('token')
      .then(token => {
        if (token) {
          this.navCtrl.setRoot(TabsPage)
        }
      });
  }

  login() {
    this.loginProvider.doLogin(this.url, this.username, this.password)
      .then(res => {
        let result = <HTTPResult>res;
        if (result.ok) {
          this.localStorage.set('token', result.token)
          this.navCtrl.setRoot(TabsPage)
        } else {
          alert(result.msg)
        }
      }, err => {
        alert('ไม่สามารถเชื่อมกับ server ได้')
      });
  }
}
