import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  public encuesta: FormGroup;
  constructor(private fb: FormBuilder, private firestore: LogService, private auth: AuthRegisterService) {
    this.encuesta = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.validarTelefono]],
      pregunta01: ['', Validators.required],
      pregunta02: ['', Validators.required],
      pregunta03: ['', Validators.required],
      email: [''],
    });
  }
  ngOnInit(): void {}

  async enviarEncuesta() {
    const email = await this.auth.getUserEmail()
    this.encuesta.patchValue({ email: email });
    const auxEncuesta = this.encuesta.value;
    try {
      const resp = await this.firestore.registrarEncuesta(auxEncuesta);
      console.log('Respuesta enviada:', resp)
    } catch (error) {
      console.log(error);
    }
  }
  validarTelefono(control: AbstractControl): object | null {
    const telefono = control.value;
    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(telefono)) {
      return { soloNumeros: true };
    }
    return null;
  }
  //Agregar un spineer mañana y arreglar diseño
}
