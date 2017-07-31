/**
 * Providers
 */
import { UtilitarioService } from './service/utilitario.service';
import { SeguridadService } from './service/seguridad.service';
import { AlertService } from './service/alert.service';
import { GuardRouting } from './routing/guards/guards-routing';
import { AdminFreeService } from './service/admin-free.service';
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

/**
 * imports
 */
import { AppRoutingModule } from './routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DataTableModule, ConfirmDialogModule, CheckboxModule, DataGridModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * declarations
 */
import { AppRoot } from './components/app-root/app-root';
import { NgModule } from '@angular/core';

import { FooterComponent } from './components/app-root/footer/footer.component';
import { HomeComponent } from './components/app-root/home/home.component';
import { AlertComponent } from './components/directivas/alert/alert.component';
import { LoadingComponent } from './components/directivas/loading/loading.component';

import { LoginComponent } from './components/seguridad/login/login.component';
import { CambioClaveComponent } from './components/seguridad/cambio-clave/cambio-clave.component';

import { SolicitarConsecutivoComponent } from './components/correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';
import { ArchivoGestionComponent } from './components/correspondencia/archivo_gestion/archivo-gestion.component';
import { ConsecutivosSolicitadosComponent } from './components/correspondencia/consecutivos_solicitados/consecutivos-solicitados.component';

import { TiempoServiciosSalariosComponent } from './components/solicitud_certificados/tiempo_servicios_salarios/tiempo-servicios-salarios';
import { CartasLaboralesComponent } from './components/solicitud_certificados/cartas_laborales/cartas-laborales';
import { ReporteCesantiasComponent } from './components/solicitud_certificados/reporte_cesantias/reporte-cesantias';
import { CertificadosSolicitadosComponent } from './components/solicitud_certificados/certificados_solicitados/certificados-solicitados';

import { CrearProcesosComponent } from './components/demandas/crear_procesos/crear-procesos.component';
import { AgendaAbogadoComponent } from './components/demandas/agenda_abogado/agenda-abogado.component';
import { AgendarEventosComponent } from './components/demandas/agendar_eventos/agendar-eventos.component';
import { GestionProcesosComponent } from './components/demandas/gestion_procesos/gestion-procesos.component';

import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { AdminRolesComponent } from './components/admin/usuarios/admin_roles/admin-roles.component';
import { AdminUsersComponent } from './components/admin/usuarios/admin_usuarios/admin-usuarios.component';
import { RestablecerClaveComponent } from './components/admin/usuarios/restablecer_clave/restablecer-clave.component';
import { ParametrizacionRegistrosComponent } from './components/admin/parametrizacion_registros/parametrizacion-registros.component';
import { FormatoFuenteComponent } from './components/admin/formato_fuente/formato-fuente.component';

@NgModule({
  declarations: [
    AppRoot,
    FooterComponent,
    LoginComponent,
    LoadingComponent,
    AlertComponent,
    HomeComponent,
    CambioClaveComponent,
    SolicitarConsecutivoComponent,
    ArchivoGestionComponent,
    ConsecutivosSolicitadosComponent,
    UsuariosComponent,
    ParametrizacionRegistrosComponent,
    FormatoFuenteComponent,
    CartasLaboralesComponent,
    ReporteCesantiasComponent,
    TiempoServiciosSalariosComponent,
    CertificadosSolicitadosComponent,
    CrearProcesosComponent,
    AgendaAbogadoComponent,
    AgendarEventosComponent,
    GestionProcesosComponent,
    AdminRolesComponent,
    AdminUsersComponent,
    RestablecerClaveComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CheckboxModule,
    DataGridModule
  ],

  providers: [
    UtilitarioService,
    SeguridadService,
    AlertService,
    GuardRouting,
    AdminFreeService,
    ConfirmationService,
    DatePipe
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }