import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  
  constructor(private loginServ: LoginService){}

  canLoad(): boolean | Promise<boolean> {
    return this.loginServ.validateUser();
  }
}
