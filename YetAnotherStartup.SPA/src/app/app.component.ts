import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {ApiService} from './core/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yet Another Startup SPA';
  claims: object;
  
  values: object;
  valuesError: string;
  
  securedValues: object;
  securedValuesError: string;

  constructor(private oauthService: OAuthService, private apiService: ApiService) {
    this.configureAuth();
  }

  private configureAuth(): void {
    this.oauthService.configure({
      issuer: 'https://yasb2c.b2clogin.com/d8a2d95d-e34e-40ad-ac6b-539559f73be7/v2.0/',
      loginUrl: 'https://yasb2c.b2clogin.com/yasb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signuporin',
      logoutUrl: 'https://yasb2c.b2clogin.com/yasb2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_signuporin',
      redirectUri: window.location.origin + '/index.html',
      clientId: '589431de-d040-45ff-b9d5-45b8d8ec26c4',
      scope: 'openid',
      requestAccessToken: false
    });

    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    var identityClaims = this.oauthService.getIdentityClaims();
    if (!identityClaims) {
      return null;
    }
    this.claims = identityClaims;
    return identityClaims["name"];
  }

  public getValues(){
    this.apiService.getValues().subscribe(result => {
      this.values = result;
    }, error => this.valuesError = error);

    this.apiService.getSecuredValues().subscribe(result => {
      this.securedValues = result;
    }, error => this.securedValuesError = error);
  }
}