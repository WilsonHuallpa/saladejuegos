import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

//Rutas secundarias
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'forgot', component: ForgotComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component:  LoginComponent},
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
