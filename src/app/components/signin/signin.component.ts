import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      res =>{
        if (res.error) {
          this.error = res.error;
        } else {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/perfil']);
        }
      }
    )
  }

}
