import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import localStorageVar from '../../constants/local-storage-var';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  public token: BehaviorSubject<string | null>;
  public user: BehaviorSubject<string | null>;

  constructor(private router: Router, private _service: AuthService) {
    this.token = new BehaviorSubject(
      localStorage.getItem(localStorageVar.token) || null
    );
    this.user = new BehaviorSubject(
      localStorage.getItem(localStorageVar.loginInfo) || null
    );
    // const loginInfo = localStorage.getItem(localStorageVar.loginInfo);
    // this.user = new BehaviorSubject((loginInfo));
    // this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  ngOnInit(): void {
  }


  logout() {
    localStorage.removeItem(localStorageVar.token);
    localStorage.removeItem(localStorageVar.loginInfo);
    this.token.next(null);
    this.user.next(null);
    this.router.navigate(['']);
  }
}
