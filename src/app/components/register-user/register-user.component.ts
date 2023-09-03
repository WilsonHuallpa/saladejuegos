import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireErrorService } from 'src/app/services/fire-error.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  registrarUsuarios: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authUser: AuthRegisterService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService
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
        this.loading = false;
        this.toastr.success(
          'El usuario fue registrado con exito!',
          'Usuario registrado'
        );
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.loading = false;
        console.error('Error registering user:', error);
        this.toastr.error(this.fireError.codeError(error.code), 'Error');
      });
  }
}
