import { Component, OnInit } from '@angular/core';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  usuarioLogeado: any;
  newmessage: string= "";
  messages: any = [
    {
      emisor: "z7xIOuZmPph1PD9K6S30kTlrNRu1",
      texto: "hola que tal",
    },
    {
      emisor: "id",
      texto: "todo bien?",
    },
    {
      emisor: "z7xIOuZmPph1PD9K6S30kTlrNRu1",
      texto: "bien, perfecto",
    },
    {
      emisor: "id",
      texto: "un gusto!",
    },
    {
      emisor: "z7xIOuZmPph1PD9K6S30kTlrNRu1",
      texto: "Adios",
    },
  ]
  constructor(private authService: AuthRegisterService){

  }
  ngOnInit():void {
    const users =  this.authService.getUserLogged();
    if(users){
      this.usuarioLogeado = users;
    }
  }
  enviarMensaje(){
  let mensaje = {
    emisor: this.usuarioLogeado.uid,
    texto:this.newmessage,
  }
  this.messages.push(mensaje)
    this.newmessage = "";
  }
}
