import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5000/users'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: {}){
    return this.http.post<any>(this.URL + '/register', user)
  }

  loggedIn(){
    if (localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

}
