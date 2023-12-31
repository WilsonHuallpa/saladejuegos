import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dataUser: any;

  constructor(private afAuth: AuthRegisterService, private router: Router) {}

  ngOnInit(): void {
    this.afAuth
      .obtenerUserRegistrado()
      .then((user) => {
        if (user) {
          this.dataUser = user;
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario autenticado:', error);
      });
  }
}
