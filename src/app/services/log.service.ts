import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { LogUser } from '../interfaces/LogUser';
import Resultado from '../interfaces/Resultado';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestore: Firestore) { }

  logRegisterUser(empleado: LogUser): Promise<any> {
    const aCollection = collection(this.firestore, 'logRegister'); 
    return addDoc(aCollection, empleado);
  }
  registerResultado(nombreJuego: string, resultado: Resultado){
    const aCollection = collection(this.firestore, nombreJuego); 
    return addDoc(aCollection, resultado);
  }
}
