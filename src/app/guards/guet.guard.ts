import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuetGuard implements CanLoad {
  
  constructor(private loginServ: LoginService){}

  canLoad(): boolean | Promise<boolean> {
    return this.loginServ.validateGuest();
  }
  
}
