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

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardRouting] },
  { path: 'cambio_clave', component: CambioClaveComponent, canActivate: [GuardRouting] },
  { path: 'solicitar_consecutivo', component: SolicitarConsecutivoComponent },
  { path: 'arhivo_gestion', component: ArchivoGestionComponent },
  { path: 'consecutivos_solicitados', component: ConsecutivosSolicitadosComponent },
  { path: 'admin_usuarios', component: UsuariosComponent },
  { path: '', component: AppRoot, canActivate: [GuardRouting] }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }