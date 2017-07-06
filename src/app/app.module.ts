import { AppRoutingModule } from './routing/app-routing.module';
import { AppRoot } from './components/app-root/app-root';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DialogModule, ConfirmDialogModule, DataTableModule, SharedModule, FieldsetModule, PanelModule, MessagesModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/app-root/header/header.component';
import { MenuComponent } from './components/app-root/menu/menu.component';
import { FooterComponent } from './components/app-root/footer/footer.component';
import { LoginComponent } from './components/app-root/cuenta/login/login.component';
import { CambioClaveComponent } from './components/app-root/cuenta/cambio-clave/cambio-clave.component';
import { HomeComponent } from './components/app-root/home/home.component';

@NgModule({
  declarations: [
    AppRoot,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CambioClaveComponent,
    HomeComponent
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
  providers: [],
  bootstrap: [AppRoot]
})
export class AppModule { }