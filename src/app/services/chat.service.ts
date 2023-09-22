import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/Mensaje';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  guardarMensaje(mensaje: Mensaje): Promise<any> {
    const aCollection = collection(this.firestore, 'chat');
    return addDoc(aCollection, mensaje);
  }
  async traerMensajes(): Promise<Mensaje[]> {
    const q = query(collection(this.firestore, 'chat'), orderBy('hora'));
    const querySnapshot = await getDocs(q);
    const mensajes: Mensaje[] = [];

    querySnapshot.forEach((doc) => {
      const mensaje = doc.data() as Mensaje;
      mensajes.push(mensaje);
    });

    return mensajes;
  }
}
