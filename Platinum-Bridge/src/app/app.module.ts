import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';

// ---- Componentes ----- //
import { PrincipalComponent } from './principal/principal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActualizadatosComponent } from './actualizadatos/actualizadatos.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { ContactoComponent } from './contacto/contacto.component';

// ---- Servivicios ---- //
import { RestService } from './Servicios/rest.service';
import { UsersService } from './Servicios/users.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ContactoComponent,
    PrincipalComponent,
    NavbarComponent, 
    ActualizadatosComponent
    
  ],
  imports: [
    GoogleMapsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatCardModule,
    ReactiveFormsModule, 
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [UsersService, RestService],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule { }
