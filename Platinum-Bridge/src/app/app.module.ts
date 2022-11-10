import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import {MatIconModule} from '@angular/material/icon';
import { ContactoComponent } from './contacto/contacto.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PrincipalComponent } from './principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ActualizadatosComponent } from './actualizadatos/actualizadatos.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
