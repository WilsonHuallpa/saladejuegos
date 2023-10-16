import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
  collectionData,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: Firestore) {}

  // getMessages(): Observable<DocumentData[]> {
  //   const q = query(
  //     collection(this.firestore, 'chat'),
  //     orderBy('date', 'asc'),
  //     limit(100)
  //   );

  //   return from(getDocs(q)).pipe(
  //     map((querySnapshot) =>
  //       querySnapshot.docs.map(
  //         (doc: QueryDocumentSnapshot<DocumentData>) => doc.data()
  //       )
  //     )
  //   );
  // }
  getMessages() {
    const col = collection(this.firestore, 'chat');
    const observable = collectionData(col);
    return observable;
  }

  createMessage(message: any) {
    return addDoc(collection(this.firestore, 'chat'), message);
  }

  // guardarMensaje(mensaje: Mensaje): Promise<any> {
  //   const aCollection = collection(this.firestore, 'chat');
  //   return addDoc(aCollection, mensaje);
  // }
  // async traerMensajes(): Promise<Mensaje[]> {
  //   const q = query(collection(this.firestore, 'chat'), orderBy('hora'));
  //   const querySnapshot = await getDocs(q);
  //   const mensajes: Mensaje[] = [];

  //   querySnapshot.forEach((doc) => {
  //     const mensaje = doc.data() as Mensaje;
  //     mensajes.push(mensaje);
  //   });

  //   return mensajes;
  // }
}
