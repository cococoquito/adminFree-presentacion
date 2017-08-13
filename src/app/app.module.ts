/**
 * Providers
 */
import { UtilitarioService } from './b-service/z-common/utilitario.service';
import { ConfirmationService } from 'primeng/primeng';
import { AdministradorService } from './b-service/a-admin/administrador.service';
import { AlertService } from './b-service/z-common/alert.service';
import { GuardRouting } from './d-routing/guards/guards-routing';
import { DatePipe } from '@angular/common';

/**
 * imports
 */
import { DataTableModule, ConfirmDialogModule, CheckboxModule, DataGridModule, DialogModule } from 'primeng/primeng';
import { AppRoutingModule } from './d-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * declarations
 */
import { NgModule } from '@angular/core';
import { AppRoot } from './a-components/z-app-root/app-root';

import { FooterComponent } from './a-components/z-app-root/footer/footer.component';
import { HomeComponent } from './a-components/z-app-root/home/home.component';
import { AlertComponent } from './a-components/y-directivas/alert/alert.component';
import { LoadingComponent } from './a-components/y-directivas/loading/loading.component';

import { LoginComponent } from './a-components/a-seguridad/login/login.component';
import { CambioClaveComponent } from './a-components/a-seguridad/cambio-clave/cambio-clave.component';

import { SolicitarConsecutivoComponent } from './a-components/b-correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';
import { ArchivoGestionComponent } from './a-components/b-correspondencia/archivo_gestion/archivo-gestion.component';
import { ConsecutivosSolicitadosComponent } from './a-components/b-correspondencia/consecutivos_solicitados/consecutivos-solicitados.component';

import { TiempoServiciosSalariosComponent } from './a-components/c-solicitud_certificados/tiempo_servicios_salarios/tiempo-servicios-salarios';
import { CartasLaboralesComponent } from './a-components/c-solicitud_certificados/cartas_laborales/cartas-laborales';
import { ReporteCesantiasComponent } from './a-components/c-solicitud_certificados/reporte_cesantias/reporte-cesantias';
import { CertificadosSolicitadosComponent } from './a-components/c-solicitud_certificados/certificados_solicitados/certificados-solicitados';

import { CrearProcesosComponent } from './a-components/d-demandas/crear_procesos/crear-procesos.component';
import { AgendaAbogadoComponent } from './a-components/d-demandas/agenda_abogado/agenda-abogado.component';
import { AgendarEventosComponent } from './a-components/d-demandas/agendar_eventos/agendar-eventos.component';
import { GestionProcesosComponent } from './a-components/d-demandas/gestion_procesos/gestion-procesos.component';

import { UsuariosComponent } from './a-components/a-admin/usuarios/usuarios.component';
import { AdminRolesComponent } from './a-components/a-admin/usuarios/admin_roles/admin-roles.component';
import { AdminUsersComponent } from './a-components/a-admin/usuarios/admin_usuarios/admin-usuarios.component';
import { RestablecerClaveComponent } from './a-components/a-admin/usuarios/restablecer_clave/restablecer-clave.component';
import { ParametrizacionRegistrosComponent } from './a-components/a-admin/parametrizacion_registros/parametrizacion-registros.component';
import { FormatoFuenteComponent } from './a-components/a-admin/formato_fuente/formato-fuente.component';

import { RolPrivilegioModal } from './a-components/y-directivas/modales/rol-privilegio.modal';

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
    RestablecerClaveComponent,
    RolPrivilegioModal
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
    DataGridModule,
    DialogModule
  ],

  providers: [
    UtilitarioService,
    ConfirmationService,
    AdministradorService,
    AlertService,
    GuardRouting,
    DatePipe
  ],
  bootstrap: [AppRoot]
})
export class AppModule { }