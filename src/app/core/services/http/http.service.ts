import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  public get(url:string):Observable<any>{
    return this._http.get(environment.baseUrl+url);
  }

  public post(url:string, body:any):Observable<any>{
    return this._http.post(environment.baseUrl+url,body);
  }
  public patch(url:string,id:any, body:any):Observable<any>{
    return this._http.patch(environment.baseUrl+url+id,body);
  }
  public put(url:string,id:any, body:any):Observable<any>{
    return this._http.put(environment.baseUrl+url+id,body);
  }
  public delete(url:string, id:any):Observable<any>{
    return this._http.delete(environment.baseUrl+url+id);
  }
}
