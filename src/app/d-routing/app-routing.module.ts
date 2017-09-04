import { AppRoot } from './../a-components/z-app-root/app-root';
import { GuardRouting } from './guards/guards-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './../a-components/z-app-root/home/home.component';
import { CambioClaveComponent } from './../a-components/a-seguridad/cambio-clave/cambio-clave.component';

import { SolicitarConsecutivoComponent } from './../a-components/b-correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';
import { ArchivoGestionComponent } from './../a-components/b-correspondencia/archivo_gestion/archivo-gestion.component';
import { ConsecutivosSolicitadosComponent } from './../a-components/b-correspondencia/consecutivos_solicitados/consecutivos-solicitados.component';

import { TiempoServiciosSalariosComponent } from './../a-components/c-solicitud_certificados/tiempo_servicios_salarios/tiempo-servicios-salarios';
import { CartasLaboralesComponent } from './../a-components/c-solicitud_certificados/cartas_laborales/cartas-laborales';
import { ReporteCesantiasComponent } from './../a-components/c-solicitud_certificados/reporte_cesantias/reporte-cesantias';
import { CertificadosSolicitadosComponent } from './../a-components/c-solicitud_certificados/certificados_solicitados/certificados-solicitados';

import { CrearProcesosComponent } from './../a-components/d-demandas/crear_procesos/crear-procesos.component';
import { AgendaAbogadoComponent } from './../a-components/d-demandas/agenda_abogado/agenda-abogado.component';
import { AgendarEventosComponent } from './../a-components/d-demandas/agendar_eventos/agendar-eventos.component';
import { GestionProcesosComponent } from './../a-components/d-demandas/gestion_procesos/gestion-procesos.component';

import { SeguridadComponent } from './../a-components/a-admin/seguridad/seguridad.component';
import { ParametrizacionComponent } from './../a-components/a-admin/parametrizacion/parametrizacion.component';
import { FormatoFuenteComponent } from './../a-components/a-admin/formato_fuente/formato-fuente.component';

const ROUTES: Routes = [
  {
    path: '', canActivate: [GuardRouting], children: [

      { path: '', component: AppRoot },
      { path: 'home', component: HomeComponent },
      { path: 'cambio_clave', component: CambioClaveComponent },

      { path: 'solicitar_consecutivo', component: SolicitarConsecutivoComponent },
      { path: 'archivo_gestion', component: ArchivoGestionComponent },
      { path: 'consecutivos_solicitados', component: ConsecutivosSolicitadosComponent },

      { path: 'servicios_salarios', component: TiempoServiciosSalariosComponent },
      { path: 'carta_laborales', component: CartasLaboralesComponent },
      { path: 'reporte_cesantias', component: ReporteCesantiasComponent },
      { path: 'certificados_solicitados', component: CertificadosSolicitadosComponent },

      { path: 'crear_procesos', component: CrearProcesosComponent },
      { path: 'agenda', component: AgendaAbogadoComponent },
      { path: 'agendar_eventos', component: AgendarEventosComponent },
      { path: 'gestion_procesos', component: GestionProcesosComponent },

      { path: 'seguridad', component: SeguridadComponent },
      { path: 'parametrizaciones', component: ParametrizacionComponent },
      { path: 'formato_fuente', component: FormatoFuenteComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }