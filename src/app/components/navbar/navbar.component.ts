import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private afAuth: AuthRegisterService, private router: Router) {}
  
  logout(){
    this.afAuth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
