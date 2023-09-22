import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: '**', redirectTo: 'home' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaRoutingModule { }
