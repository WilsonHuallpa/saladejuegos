import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { FireErrorService } from 'src/app/services/fire-error.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  recuperarUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authUser: AuthRegisterService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService
  ) {
    this.recuperarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  recuperar(){
    const email = this.recuperarUsuario.value.email;
    this.loading = true;
    this.authUser.resetPassword(email).then(() => {
      this.toastr.info('Le enviamos un correo para restablecer contraseña','Recuperar contraseña')
      this.router.navigate(['/login'])
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.fireError.codeError(error.code), 'Error');
    })
  }
}
