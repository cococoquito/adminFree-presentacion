import { AppRoot } from './../components/app-root/app-root';
import { GuardRouting } from './guards/guards-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './../components/app-root/home/home.component';
import { CambioClaveComponent } from './../components/seguridad/cambio-clave/cambio-clave.component';

import { SolicitarConsecutivoComponent } from './../components/correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';
import { ArchivoGestionComponent } from './../components/correspondencia/archivo_gestion/archivo-gestion.component';
import { ConsecutivosSolicitadosComponent } from './../components/correspondencia/consecutivos_solicitados/consecutivos-solicitados.component';

import { TiempoServiciosSalariosComponent } from './../components/solicitud_certificados/tiempo_servicios_salarios/tiempo-servicios-salarios';
import { CartasLaboralesComponent } from './../components/solicitud_certificados/cartas_laborales/cartas-laborales';
import { ReporteCesantiasComponent } from './../components/solicitud_certificados/reporte_cesantias/reporte-cesantias';
import { CertificadosSolicitadosComponent } from './../components/solicitud_certificados/certificados_solicitados/certificados-solicitados';

import { CrearProcesosComponent } from './../components/demandas/crear_procesos/crear-procesos.component';
import { AgendaAbogadoComponent } from './../components/demandas/agenda_abogado/agenda-abogado.component';
import { AgendarEventosComponent } from './../components/demandas/agendar_eventos/agendar-eventos.component';
import { GestionProcesosComponent } from './../components/demandas/gestion_procesos/gestion-procesos.component';

import { UsuariosComponent } from './../components/admin/usuarios/usuarios.component';
import { ParametrizacionRegistrosComponent } from './../components/admin/parametrizacion_registros/parametrizacion-registros.component';
import { FormatoFuenteComponent } from './../components/admin/formato_fuente/formato-fuente.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardRouting] },
  { path: 'cambio_clave', component: CambioClaveComponent, canActivate: [GuardRouting] },

  { path: 'solicitar_consecutivo', component: SolicitarConsecutivoComponent, canActivate: [GuardRouting] },
  { path: 'archivo_gestion', component: ArchivoGestionComponent, canActivate: [GuardRouting] },
  { path: 'consecutivos_solicitados', component: ConsecutivosSolicitadosComponent, canActivate: [GuardRouting] },

  { path: 'servicios_salarios', component: TiempoServiciosSalariosComponent, canActivate: [GuardRouting] },
  { path: 'carta_laborales', component: CartasLaboralesComponent, canActivate: [GuardRouting] },
  { path: 'reporte_cesantias', component: ReporteCesantiasComponent, canActivate: [GuardRouting] },
  { path: 'certificados_solicitados', component: CertificadosSolicitadosComponent, canActivate: [GuardRouting] },

  { path: 'crear_procesos', component: CrearProcesosComponent, canActivate: [GuardRouting] },
  { path: 'agenda', component: AgendaAbogadoComponent, canActivate: [GuardRouting] },
  { path: 'agendar_eventos', component: AgendarEventosComponent, canActivate: [GuardRouting] },
  { path: 'gestion_procesos', component: GestionProcesosComponent, canActivate: [GuardRouting] },  

  { path: 'admin_usuarios', component: UsuariosComponent, canActivate: [GuardRouting] },
  { path: 'parametrizaciones', component: ParametrizacionRegistrosComponent, canActivate: [GuardRouting] },
  { path: 'formato_fuente', component: FormatoFuenteComponent, canActivate: [GuardRouting] },
  { path: '', component: AppRoot, canActivate: [GuardRouting] }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }