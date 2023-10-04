import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { AhorcadoDibujarComponent } from './components/ahorcado-dibujar/ahorcado-dibujar.component';
import { AhorcadoPreguntaComponent } from './components/ahorcado-pregunta/ahorcado-pregunta.component';
import { AhorcadoKeyboardComponent } from './components/ahorcado-keyboard/ahorcado-keyboard.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    AhorcadoDibujarComponent,
    AhorcadoPreguntaComponent,
    AhorcadoKeyboardComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ]
})
export class JuegosModule { }
