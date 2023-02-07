import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const localStorageVar={
  token: 'token',
  loginInfo: 'info',
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  public token:BehaviorSubject<string|null>;
  // public user:BehaviorSubject<string|null>;

  constructor() {
    this.token = new BehaviorSubject(localStorage.getItem(localStorageVar.token)||null);
    // this.user=new BehaviorSubject(JSON.parse(localStorage.getItem(localStorageVar.loginInfo)));
  }
}
