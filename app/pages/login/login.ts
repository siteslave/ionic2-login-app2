import { Component, OnInit } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';

import { Push } from 'ionic-native'

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
export class LoginPage implements OnInit {
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

  ngOnInit() {
    this.registerPush();
  }

  registerPush() {
    var push = Push.init({
      android: {
        senderID: '896674945440'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    });

    push.on('registration', res => {
      console.log(res)
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
