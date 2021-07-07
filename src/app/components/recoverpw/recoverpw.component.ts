import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-recoverpw',
  templateUrl: './recoverpw.component.html',
  styleUrls: ['./recoverpw.component.css']
})
export class RecoverpwComponent implements OnInit {

  user = {
    token: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  error = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  enviarEmail() {
    // Confirmar si el email cumple con el formato
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!this.user.email.match(regEx)) {
      this.error = 'Correo no valido'
      return
    }

    const movPag = <HTMLElement>document.querySelector(".movPag");
    const btnAdelante = document.querySelector(".sigPag2");

    btnAdelante?.addEventListener('click', (e) => {
      e.preventDefault();

      this.authService.getCodigo(this.user).subscribe(
        res => {
          if (res.error) {
            this.error = res.error;
          } else {
            this.error = '';
            movPag.style.marginLeft = "-33%"
          }
        }
      )
    })
  }

  enviarCodigo() {
    const movPag = <HTMLElement>document.querySelector(".movPag");
    const btnAdelante = document.querySelector(".sigPag3");

    btnAdelante?.addEventListener('click', (e) => {
      e.preventDefault();
      this.authService.sendCodigo(this.user).subscribe(
        res => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = '';
            movPag.style.marginLeft = "-66%"
          }
        }
      )
    })
  }

  cambiarPw() {
    this.authService.restablecerPw(this.user).subscribe(
      res => {
        if (res.error) {
          this.error = res.error;
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Éxito.',
            text: 'Su contraseña ha sido cambiada exitosamente!'
          }).then(()=>{
            this.router.navigate(['/login']);
          })
        }
      }
    )
  }

}
