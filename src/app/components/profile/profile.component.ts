import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {
    username: '',
    email: '',
    name: '',
    lastname: '',
    cellphone: '',
    address: '',
    city: ''
  }

  cambioPw = {
    password: '',
    confirmPassword: '',
    token: ''
  }

  error = ''
  errorPw = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      res => {
        if (res.error) {
          this.error = res.error
        } else {
          this.user = res.user
        }
      },
      error => {
        if (error) {
          this.authService.logOut();
        }
      }
    )
  }

  editarInfo() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Tus datos serán guardados automáticamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, editar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Editado!',
          'Tus datos se han actualizado correctamente!.',
          'success'
        ).then(() => {
          this.authService.editProfile(this.user).subscribe(
            res => {
              if (res.error) {
                this.error = res.error;
              } else {
                window.location.reload();
              }
            }
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se ha hecho ningún cambio',
          'error'
        )
      }
    })

  }

  abrirModal() {
    const modal = <HTMLElement>document.querySelector('.modal');
    const modalb = <HTMLElement>document.querySelector('.modal-border');

    modal.classList.add('active')
    modalb.classList.add('active')

    this.authService.enviarCodigoUser().subscribe(
      res => {
        if (res.error) {
          this.errorPw = res.error;
        } else {
          this.errorPw = ''
        }
      }
    )
  }

  cerrarModal() {
    const modal = <HTMLElement>document.querySelector('.modal');
    const modalb = <HTMLElement>document.querySelector('.modal-border');
    const moverForm = <HTMLElement>document.querySelector('.mover-form');
    moverForm.style.marginLeft = "0%"

    modal.classList.remove('active')
    modalb.classList.remove('active')
    this.errorPw = ''
    this.cambioPw.token = ''
  }

  enviarCode() {
    this.authService.verificarCodigoUser(this.cambioPw).subscribe(
      res => {
        if (res.error) {
          this.errorPw = res.error;
        } else {
          const moverForm = <HTMLElement>document.querySelector('.mover-form');
          moverForm.style.marginLeft = "-50%"
          this.errorPw = ''
        }
      }
    )
  }

  cambiarPw() {
    this.authService.cambiarPasswordUser(this.cambioPw).subscribe(
      res => {
        if (res.error) {
          this.errorPw = res.error;
        } else {
          const modal = <HTMLElement>document.querySelector('.modal');
          const modalb = <HTMLElement>document.querySelector('.modal-border');
          const moverForm = <HTMLElement>document.querySelector('.mover-form');
          moverForm.style.marginLeft = "0%"

          modal.classList.remove('active')
          modalb.classList.remove('active')
          this.errorPw = ''
          this.cambioPw.token = ''
        }
      }
    )
  }
}
