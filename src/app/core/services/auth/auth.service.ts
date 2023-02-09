import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import localStorageVar from '../../constants/local-storage-var';
import { UserInfo } from '../../interfaces/user-info.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  public token: BehaviorSubject<string | null>;
  public user: BehaviorSubject<string | null>;
  users:UserInfo|undefined;

  constructor(private router: Router, private _service: AuthService,private http:HttpClient) {
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



isAuthenticated = ():boolean => (this.token.value!='null' && this.token.value!=null)?true:false;
getUserRole=():string=>this.users?.role.toLocaleLowerCase()||'';


  logout() {
    localStorage.removeItem(localStorageVar.token);
    localStorage.removeItem(localStorageVar.loginInfo);
    this.token.next(null);
    this.user.next(null);
    this.router.navigate(['']);
  }

  async refreshToken(): Promise<any> {
    let prom = await this.http.post('', { token:localStorage.getItem(localStorageVar.refreshToken) })
      .toPromise();
    this.token.next(null);
    localStorage.setItem(localStorageVar.token,'');
    localStorage.setItem(localStorageVar.refreshToken, '');
    return prom;
  }
}
