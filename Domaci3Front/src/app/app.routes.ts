import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from "./components/app/app.component";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Dodajte ovu liniju
    // ... ostale komponente koje koristite
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ... ostali moduli koje koristite
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
