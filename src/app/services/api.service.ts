import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpService {

  saveEmailDefinition(email: object) {
    return this.post(`/emailDefinition`, email);
  }

}
