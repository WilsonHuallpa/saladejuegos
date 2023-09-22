import { Timestamp } from "@angular/fire/firestore";

export interface Mensaje {
    user: string;
    emisor: string;
    texto: string;
    hora: Timestamp;
  }