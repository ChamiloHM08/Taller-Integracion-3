import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { ContactoComponent } from './contacto/contacto.component';
import { NumberValueAccessor } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { ActualizadatosComponent } from './actualizadatos/actualizadatos.component';
import { GenerarOfertaComponent } from './generar-oferta/generar-oferta.component';
import { PublicacionComponent } from './publicacion/publicacion.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, ...canActivate(()=> redirectUnauthorizedTo(['/principal'])) },
  { path: 'profile', component: ProfileComponent, ...canActivate(()=> redirectUnauthorizedTo(['/principal'])) },
  { path: 'update', component: ActualizadatosComponent, ...canActivate(()=> redirectUnauthorizedTo(['/principal'])) }, 
  { path: 'generarof', component: GenerarOfertaComponent, ...canActivate(()=> redirectUnauthorizedTo(['/principal']))},
  { path: 'publicacion/:UidPubl', component: PublicacionComponent, ...canActivate(()=> redirectUnauthorizedTo(['/principal']))}, //publicaciones/:UidPubl
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'contacto', component: ContactoComponent}, 
  { path: 'principal', component: PrincipalComponent}, 
  /* DEJAR SIEMPRE ESTAS DOS RUTAS ALFINAL EN CASO DE CREAR NUEVAS, GENERA ERROR SINO */
  { path: '', pathMatch: 'full', redirectTo: '/principal'}, 
  { path: '**', pathMatch: 'full', redirectTo: '/principal'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }