import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saladejuegos';
  constructor(private router: Router) { }

  shouldShowNavbar(): boolean {
    const currentRoute = this.router.url;
    return !currentRoute.includes('/auth/login') && !currentRoute.includes('/auth/forgot') && !currentRoute.includes('/auth/register');
  }
}
