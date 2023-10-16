import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

import { ChatService } from 'src/app/services/chat.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/services/notification.service';
// import { Timestamp } from '@angular/fire/firestore';
// import { AuthRegisterService } from 'src/app/services/auth-register.service';
// import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user: any = null;
  newMessage: string = '';
  messageList: any = [];
  sendIcon = faPaperPlane;
  usuarioLogeado: any;
  constructor(
    private router: Router,
    private afAuth: AuthRegisterService,
    private chatService: ChatService,
    private notifyService: NotificationService
  ) {}
  // mostrarChat = false;
  // usuarioLogeado: any;
  // newmessage: string = '';
  // messages: any = [];
  // constructor(private authService: AuthRegisterService, private chatService: ChatService) {}

  ngOnInit(): void {
    // const users = this.authService.getUserLogged();
    // if (users) {
    //   this.usuarioLogeado = users;
    // }
    // this.cargarMensajesDesdeFirebase()
    this.afAuth
      .obtenerUserRegistrado()
      .then((user) => {
        if (user) {
          this.user = user;
          this.chatService.getMessages().subscribe((messages) => {
            if (messages !== null) {
              this.messageList = messages;

              console.log('lista mensaje:', this.messageList);
              for (let i = 0; i < this.messageList.length; i++) {
                const chat = this.messageList[i];
                chat.date = this.convertDateToUnix(chat);
              }
              this.messageList.sort((a: any, b: any) => a.date - b.date);
              for (let i = 0; i < this.messageList.length; i++) {
                const chat = this.messageList[i];
                chat.date = moment(new Date(chat.date)).format(
                  'DD-MM-YYYY HH:mm:ss'
                );
              }
              setTimeout(() => {
                this.scrollToTheLastElementByClassName();
              }, 100);
            }
          });
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario autenticado:', error);
      });
  }

  sendMessage() {
    if (this.newMessage.trim() == '') {
      this.notifyService.showWarning('Debes escribir un mensaje', 'Chat');
      return;
    }
    const date = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    const message = {
      user: {
        userId: this.user.uid,
        userName: this.user.email,
      },
      text: this.newMessage,
      date: date,
    };
    this.chatService.createMessage(message);
    this.newMessage = '';
    this.scrollToTheLastElementByClassName();
  } // end of sendMessage

  scrollToTheLastElementByClassName() {
    const elements = document.getElementsByClassName('mensajes');
    if (elements.length > 0) {
      const lastElement: any = elements[elements.length - 1];
      const toppos = lastElement.offsetTop;
      //@ts-ignore
      document.getElementById('contenedor-mensajes').scrollTop = toppos;
    }
  } // end of scrollToTheLastElementByClassName

  convertDateToUnix(chat: any) {
    const initialDate = chat.date;
    const splitDate = initialDate.split(' ');
    const date = splitDate[0].split('-');
    const time = splitDate[1].split(':');
    const dd = date[0];
    const mm = date[1] - 1;
    const yyyy = date[2];
    const hh = time[0];
    const min = time[1];
    const ss = time[2];
    const dateDate = new Date(yyyy, mm, dd, hh, min, ss);

    return dateDate.getTime();
  } // end of convertDateToUnix

  // enviarMensaje() {
  //   try {
  //     if(this.newmessage == '') return
  //     const ahora = new Date();
  //     const timestamp = Timestamp.fromDate(ahora);
  //     let mensaje = {
  //       user: this.usuarioLogeado.email,
  //       emisor: this.usuarioLogeado.uid,
  //       texto: this.newmessage,
  //       hora: timestamp,
  //     };
  //     this.messages.push(mensaje);
  //     this.chatService.guardarMensaje(mensaje)
  //     this.newmessage = '';
  //     setTimeout(() => {
  //       this.scrollToTheLastElementByClassName();
  //     },10)
  //   } catch (error) {
  //     console.log('Error:', error)
  //   }
  // }

  // scrollToTheLastElementByClassName() {
  //   let elements = document.getElementsByClassName('msj');
  //   let ultimo: any = elements[elements.length - 1];
  //   if (ultimo) {
  //     let toppos = ultimo.offsetTop;
  //     let contenedorDeMensaje = document.getElementById('contenedorDeMensaje');
  //     if (contenedorDeMensaje) {
  //       contenedorDeMensaje.scrollTop = toppos;
  //     }
  //   }
  // }

  // cargarMensajesDesdeFirebase() {
  //   this.chatService.traerMensajes().then((mensajes) => {
  //     this.messages = mensajes;
  //     this.scrollToTheLastElementByClassName();
  //     console.log(mensajes)
  //   }).catch((error) => {
  //     console.log('Error al cargar mensajes desde Firebase:', error);
  //   });
  // }
}
