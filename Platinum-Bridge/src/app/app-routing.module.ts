import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  { path: 'main', component: MainComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'profile', component: ProfileComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', pathMatch: 'full', redirectTo: '/main'},
  { path: '**', pathMatch: 'full', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }