import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private client: HttpClient) {}

  get(url: string): Observable<any> {
    return this.client.get(url);
  }

  put(url: string, body: string): Observable<any> {
    return this.client.put(url, body);
  }

  post(url: string, body: string): Observable<any> {
    return this.client.post(url, body);
  }

  patch(url: string, body: string): Observable<any> {
    return this.client.patch(url, body);
  }

  delete(url: string): Observable<any> {
    return this.client.delete(url);
  }
}
