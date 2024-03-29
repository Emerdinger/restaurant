import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://restaurantapiemer.herokuapp.com/users'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: {}){
    return this.http.post<any>(this.URL + '/registro', user)
  }

  signIn(user: {}){
    return this.http.post<any>(this.URL + '/login', user);
  }

  getProfile(){
    return this.http.get<any>(this.URL + '/mydata');
  }

  editProfile(user: {}){
    return this.http.post<any>(this.URL + '/editar/usuario', user);
  }

  getCodigo(user: {}){
    return this.http.post<any>(this.URL + '/cambiar/password/email', user);
  }

  sendCodigo(user: {}){
    return this.http.post<any>(this.URL + '/cambiar/password/verificarCodigo', user);
  }

  restablecerPw(user: {}){
    return this.http.post<any>(this.URL + '/restablecer/password', user);
  }

  enviarCodigoUser(){
    return this.http.get<any>(this.URL + '/cambiar/password/user');
  }

  verificarCodigoUser(token:{}){
    return this.http.post<any>(this.URL + '/cambiar/password/verificarCodigo/user', token);
  }

  cambiarPasswordUser(user: {}){
    return this.http.post<any>(this.URL + '/cambiar/password', user);
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
    this.router.navigate(['/login']);
  }

}
