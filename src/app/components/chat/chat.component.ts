import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  mostrarChat = false;
  usuarioLogeado: any;
  newmessage: string = '';
  messages: any = [];
  constructor(private authService: AuthRegisterService, private chatService: ChatService) {}
  ngOnInit(): void {
    const users = this.authService.getUserLogged();
    if (users) {
      this.usuarioLogeado = users;
    }
    this.cargarMensajesDesdeFirebase()
  }
  enviarMensaje() {
    try {
      if(this.newmessage == '') return
      const ahora = new Date();
      const timestamp = Timestamp.fromDate(ahora);
      let mensaje = {
        user: this.usuarioLogeado.email,
        emisor: this.usuarioLogeado.uid,
        texto: this.newmessage,
        hora: timestamp,
      };
      this.messages.push(mensaje);
      this.chatService.guardarMensaje(mensaje)
      this.newmessage = '';
      setTimeout(() => {
        this.scrollToTheLastElementByClassName();
      },10)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    if (ultimo) {
      let toppos = ultimo.offsetTop;
      let contenedorDeMensaje = document.getElementById('contenedorDeMensaje');
      if (contenedorDeMensaje) {
        contenedorDeMensaje.scrollTop = toppos;
      }
    }
  }
  
  cargarMensajesDesdeFirebase() {
    this.chatService.traerMensajes().then((mensajes) => {
      this.messages = mensajes;
      this.scrollToTheLastElementByClassName();
      console.log(mensajes)
    }).catch((error) => {
      console.log('Error al cargar mensajes desde Firebase:', error);
    });
  }
}
