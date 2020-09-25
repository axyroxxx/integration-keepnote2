import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {

  constructor(private httpClient:HttpClient) {}

   authentication(user):any{
     return this.httpClient.post('http://localhost:8084/authService/login', user);
   }

   storeToken(token){
     localStorage.setItem('token',token);
   }

   getToken(){
     return localStorage.getItem('token');
   }

   isAuthenticated(){
  
     if(this.getToken()){
       return true;
     }
     else{
       return false;
     }
   }

   saveUser(user){
    console.log(user);
     return this.httpClient.post('http://localhost:8084/user'
    ,user
  );     
  }
}
