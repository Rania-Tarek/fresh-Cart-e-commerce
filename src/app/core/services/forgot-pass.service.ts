import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL:string = `https://ecommerce.routemisr.com/api/v1/auth/`

  forgotpassword(userEmail:object):Observable<any>{
return this._HttpClient.post(this.baseURL+`forgotPasswords`,userEmail)
  }

  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+`verifyResetCode`,resetCode)
  }


resetPAssword(resetPasswordData:object):Observable<any>{
return this._HttpClient.put(this.baseURL+`resetPassword`,resetPasswordData) 
}






}
