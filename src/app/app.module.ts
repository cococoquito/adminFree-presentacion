import { GuardRouting } from './routing/guards/guards-routing';
import { AlertService } from './service/alert.service';
import { SeguridadService } from './service/seguridad.service';
import { UtilitarioService } from './service/utilitario.service';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppRoot } from './components/app-root/app-root';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DialogModule, ConfirmDialogModule, DataTableModule, SharedModule, FieldsetModule, PanelModule, MessagesModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/app-root/footer/footer.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { AlertComponent } from './components/directivas/alert/alert.component';
import { LoadingComponent } from './components/directivas/loading/loading.component';
import { HomeComponent } from './components/home/home.component';
import { CambioClaveComponent } from './components/seguridad/cambio-clave/cambio-clave.component';

@NgModule({
  declarations: [
    AppRoot,
    FooterComponent,
    LoginComponent,
    LoadingComponent,
    AlertComponent,
    HomeComponent,
    CambioClaveComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DataTableModule,
    SharedModule,
    FormsModule,
    FieldsetModule,
    PanelModule,
    MessagesModule
  ],
  providers: [
    UtilitarioService,
    SeguridadService,
    AlertService,
    GuardRouting
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }