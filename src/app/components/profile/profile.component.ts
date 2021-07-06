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

  error = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      res =>{
        if (res.error){
          this.error = res.error
        } else {
          this.user = res.user
        }
      },
      error => {
        if (error){
          this.authService.logOut();
        }
      }
    )
  }

  editarInfo(){
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
              if (res.error){
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

}
