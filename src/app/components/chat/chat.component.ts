import { Component, OnInit } from '@angular/core';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  usuarioLogeado: any;
  newmessage: string = '';
  messages: any = [
    {
      emisor: 'z7xIOuZmPph1PD9K6S30kTlrNRu1',
      texto: 'hola que tal',
      hora: "18:00",
    },
    {
      emisor: 'id',
      texto: 'todo bien?',
      hora: "18:00",
    },
    {
      emisor: 'z7xIOuZmPph1PD9K6S30kTlrNRu1',
      texto: 'bien, perfecto',
    },
    {
      emisor: 'id',
      texto: 'un gusto!',
      hora: "18:00",
    },
    {
      emisor: 'z7xIOuZmPph1PD9K6S30kTlrNRu1',
      texto: 'Adios',
      hora: "18:00",
    },
  ];
  constructor(private authService: AuthRegisterService) {}
  ngOnInit(): void {
    const users = this.authService.getUserLogged();
    if (users) {
      this.usuarioLogeado = users;
    }
  }
  enviarMensaje() {
    if(this.newmessage == '') return
    let mensaje = {
      emisor: this.usuarioLogeado.uid,
      texto: this.newmessage,
    };
    this.messages.push(mensaje);
    this.newmessage = '';
    setTimeout(() => {

      this.scrollToTheLastElementByClassName();
    },10)
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    if (ultimo) {
      let toppos = ultimo.offsetTop;
      //@ts-ignore
      let contenedorDeMensaje = document.getElementById('contenedorDeMensaje');
      if (contenedorDeMensaje) {
        contenedorDeMensaje.scrollTop = toppos;
      }
    }
  }
}
