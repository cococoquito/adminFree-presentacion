/**
 * Providers
 */
import { UtilitarioService } from './service/utilitario.service';
import { SeguridadService } from './service/seguridad.service';
import { AlertService } from './service/alert.service';
import { GuardRouting } from './routing/guards/guards-routing';
import { AdminFreeService } from './service/admin-free.service';
import { ConfirmationService } from 'primeng/primeng';

/**
 * imports
 */
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataTableModule, ConfirmDialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * declarations
 */
import { AppRoot } from './components/app-root/app-root';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/app-root/footer/footer.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { AlertComponent } from './components/directivas/alert/alert.component';
import { LoadingComponent } from './components/directivas/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { CambioClaveComponent } from './components/seguridad/cambio-clave/cambio-clave.component';
import { ConfInicialesComponent } from './components/admin/conf-iniciales/conf-iniciales.component';

@NgModule({
  declarations: [
    AppRoot,
    FooterComponent,
    LoginComponent,
    LoadingComponent,
    AlertComponent,
    HomeComponent,
    CambioClaveComponent,
    ConfInicialesComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    ConfirmDialogModule,
    BrowserAnimationsModule
  ],

  providers: [
    UtilitarioService,
    SeguridadService,
    AlertService,
    GuardRouting,
    AdminFreeService,
    ConfirmationService
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }