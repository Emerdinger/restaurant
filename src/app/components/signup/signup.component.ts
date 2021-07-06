import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  }

  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/inicio']);
      console.log('logged');
    }
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      res => {
        if (res.error){
          this.error = res.error
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/perfil']);
        }
      }
    )
  }

}
