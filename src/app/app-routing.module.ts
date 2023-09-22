import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { PasswordVerificationComponent } from './components/password-verification/password-verification.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path:'home', component: HomeComponent},
  { path:'quien-soy', component: QuiensoyComponent },
  { path:'login', component: LoginComponent},
  { path:'registrar-usuario', component: RegisterUserComponent},
  { path:'verifivar-pasword', component: PasswordVerificationComponent},
  { path:'recuperar-password', component: RecoverPasswordComponent},
  { path:'**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
