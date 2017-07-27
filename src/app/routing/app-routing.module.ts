import { AppRoot } from './../components/app-root/app-root';
import { GuardRouting } from './guards/guards-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../components/app-root/home/home.component';
import { CambioClaveComponent } from './../components/seguridad/cambio-clave/cambio-clave.component';
import { SolicitarConsecutivoComponent } from './../components/correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';
import { ArchivoGestionComponent } from './../components/correspondencia/archivo_gestion/archivo-gestion.component';
import { ConsecutivosSolicitadosComponent } from './../components/correspondencia/consecutivos_solicitados/consecutivos-solicitados.component';
import { UsuariosComponent } from './../components/admin/usuarios/usuarios.component';
import { ParametrizacionRegistrosComponent } from './../components/admin/parametrizacion_registros/parametrizacion-registros.component';
import { FormatoFuenteComponent } from './../components/admin/formato_fuente/formato-fuente.component';
import { CartasLaboralesComponent } from './../components/solicitud_certificados/cartas_laborales/cartas-laborales';
import { ReporteCesantiasComponent } from './../components/solicitud_certificados/reporte_cesantias/reporte-cesantias';
import { TiempoServiciosSalariosComponent } from './../components/solicitud_certificados/tiempo_servicios_salarios/tiempo-servicios-salarios';
import { CertificadosSolicitadosComponent } from './../components/solicitud_certificados/certificados_solicitados/certificados-solicitados';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardRouting] },
  { path: 'cambio_clave', component: CambioClaveComponent, canActivate: [GuardRouting] },
  { path: 'solicitar_consecutivo', component: SolicitarConsecutivoComponent },
  { path: 'arhivo_gestion', component: ArchivoGestionComponent },
  { path: 'consecutivos_solicitados', component: ConsecutivosSolicitadosComponent },
  { path: 'admin_usuarios', component: UsuariosComponent },
  { path: 'parametrizaciones', component: ParametrizacionRegistrosComponent },
  { path: 'formato', component: FormatoFuenteComponent },
  { path: 'carta_laborales', component: CartasLaboralesComponent },
  { path: 'reporte_cesantias', component: ReporteCesantiasComponent },
  { path: 'servicios_salarios', component: TiempoServiciosSalariosComponent },
  { path: 'certificados_solicitados', component: CertificadosSolicitadosComponent },
  { path: '', component: AppRoot, canActivate: [GuardRouting] }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }