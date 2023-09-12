import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogUser } from 'src/app/interfaces/LogUser';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { LogService } from 'src/app/services/log.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authUser: AuthRegisterService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService,
    private logService: LogService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;
    this.authUser
      .loginUser(email, password)
      .then((user) => {
        const fechaIngreso = new Date().toLocaleString() || '';
        const loguser: LogUser = {
          usuario: email,
          fechaIngreso: fechaIngreso,
        };
        this.logService.logRegisterUser(loguser);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.fireError.codeError(error.code), 'Error');
      });
  }

  quickAccess( email:string , password:string ) {
    this.loginUsuario.setValue({
      email: email,
      password: password
    });
  }
}
