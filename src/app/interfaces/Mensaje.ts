import { Timestamp } from "@angular/fire/firestore";

export interface Mensaje {
    emisor: string;
    texto: string;
    hora: Timestamp;
  }