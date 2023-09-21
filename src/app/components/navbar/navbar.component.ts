import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  dataUser: any;
  constructor(private afAuth: AuthRegisterService, private router: Router) {}

  logout() {
    this.afAuth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
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
