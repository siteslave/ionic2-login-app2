import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CryptoJS from 'crypto-js'

@Injectable()
export class Encrypt {
  masterKey: string = '1234567890'

  constructor(private http: Http) {}

  encrypt(data) {
    var ciphertext = CryptoJS.AES.encrypt(data, this.masterKey);
    return ciphertext.toString()
  }  

  decrypt(encryptedText) {
    var bytes  = CryptoJS.AES.decrypt(encryptedText, this.masterKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext
  }
}

