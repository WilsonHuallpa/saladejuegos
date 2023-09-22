import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { LogService } from 'src/app/services/log.service';
import { LogUser } from 'src/app/interfaces/LogUser';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrarUsuarios: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authUser: AuthRegisterService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService,
    private logService: LogService
  ) {
    this.registrarUsuarios = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  registrar() {
    const email = this.registrarUsuarios.value.email;
    const password = this.registrarUsuarios.value.password;
    const repetirpassword = this.registrarUsuarios.value.repetirPassword;
    if (password !== repetirpassword) {
      this.toastr.error(
        'Las contraseñas ingresadas deben de ser la misma',
        'Error'
      );
      return;
    }
    this.loading = true;
    this.authUser
      .registerUser(email, password)
      .then(() => {
        const fechaIngreso = new Date().toLocaleString() || '';
        const loguser: LogUser = {
          usuario: email,
          fechaIngreso: fechaIngreso,
        };
        this.logService.logRegisterUser(loguser);
        this.loading = false;
        this.toastr.success(
          'El usuario fue registrado con exito!',
          'Usuario registrado'
        );
        this.router.navigate(['/sala']);
      })
      .catch((error) => {
        this.loading = false;
        console.error('Error registering user:', error);
        this.toastr.error(this.fireError.codeError(error.code), 'Error');
      });
  }
}
