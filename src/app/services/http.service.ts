import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 private apiURI: string;

  constructor(
    private httpClient: HttpClient
  ) {
      this.apiURI = environment.api.uri;
  }

  private setHeaders() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }

  private setParams(params) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(p => {
      if (params[p]) {
        httpParams = httpParams.append(p, params[p].toString());
      }
    });
    return httpParams;
  }

 protected get(path: string, params = {}) {
    return this.httpClient.get(
      this.apiURI + path,
      {
        headers: this.setHeaders(),
        params: this.setParams(params),
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map(response => {
        return { data: response.body };
      }),
    );
  }

  protected post(path: string, data: any) {
    return this.httpClient.post(
      this.apiURI + path,
      data,
      {
        headers: this.setHeaders(),
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map(response => {
        return { data: response };
      }),
    );
  }

  protected patch(path: string, data: any) { // use for updating a document
    return this.httpClient.patch(
      this.apiURI + path,
      data,
      {
        headers: this.setHeaders(),
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map(response => {
        return { data: response };
      }),
    );
  }

  protected put(path: string, data: any) { // use for replacing a document
    return this.httpClient.put(
      this.apiURI + path,
      data,
      {
        headers: this.setHeaders(),
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map(response => {
        return { data: response };
      }),
    );
  }

  protected delete(path: string, params = {}) {
    return this.httpClient.delete(
      this.apiURI + path,
      {
        headers: this.setHeaders(),
        params: this.setParams(params),
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(
      map(response => {
        return { data: response.body };
      }),
    );
  }
}
