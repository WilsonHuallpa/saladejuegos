import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, User, getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthRegisterService {
  private user = {
    email: '',
    acceptedTerms: false,
  };

  getUser() {
    return this.user;
  }

  setUser(email: string, acceptedTerms: boolean) {
    this.user.email = email;
    this.user.acceptedTerms = acceptedTerms;
  }
  constructor(private auth: Auth) { }

  obtenerUserRegistrado(): Promise<User | null> {
    const user = this.auth.currentUser;
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.resolve(null);
    }
  }

  registerUser(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
  loginUser(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  resetPassword(email: string): Promise<any> {
    return sendPasswordResetEmail(this.auth, email);
  }
  logout() {
    return this.auth.signOut();
  }
  getUserLogged(){
    return this.auth.currentUser;
  }
  getUserEmail(): string | null {
    const user = this.auth.currentUser;
    return user ? user.email : null;
  }
}