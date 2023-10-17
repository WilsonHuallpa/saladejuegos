import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaRoutingModule } from './sala-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './pages/chat/chat.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component'; 


@NgModule({
  declarations: [
    HomeComponent,
    QuienSoyComponent,
    HeaderComponent,
    ChatComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SalaModule { }
