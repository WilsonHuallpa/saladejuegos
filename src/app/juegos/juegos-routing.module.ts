import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';


const routes: Routes = [{ 
  path: '',
  children: [
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayor-menor', component: MayorMenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: '**', redirectTo: 'ahorcado' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
