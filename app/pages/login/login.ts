import { Component, OnInit } from '@angular/core';
import { NavController, Storage, LocalStorage } from 'ionic-angular';

import { Push } from 'ionic-native'

import {Login} from '../../providers/login/login'
import {TabsPage} from '../tabs/tabs'
import {Configure} from '../../providers/configure/configure'

import {Api} from '../../providers/api/api'

interface HTTPResult {
  ok: boolean,
  token?: string,
  msg?: string
}

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [Login, Configure, Api]
})
export class LoginPage implements OnInit {
  username: string
  password: string
  localStorage: LocalStorage
  url: string

  constructor(private navCtrl: NavController,
    private loginProvider: Login, private configure: Configure, private apiProvider: Api) {
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


  }

  login() {
    this.loginProvider.doLogin(this.url, this.username, this.password)
      .then(res => {
        let result = <HTTPResult>res;
        if (result.ok) {

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
            let deviceToken = res.registrationId
            this.localStorage.set('token', result.token)
            this.loginProvider.registerDevice(this.url, result.token, this.username, deviceToken)
              .then(() => {
                 this.navCtrl.setRoot(TabsPage);
              }, err => {
                alert ('connection error!')
              });
          });
          
        } else {
          alert(result.msg)
        }
      }, err => {
        alert('ไม่สามารถเชื่อมกับ server ได้')
      });
  }
}
