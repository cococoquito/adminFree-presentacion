import { AppRoot } from './../components/app-root/app-root';
import { GuardRouting } from './guards/guards-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../components/app-root/home/home.component';
import { CambioClaveComponent } from './../components/seguridad/cambio-clave/cambio-clave.component';
import { ConfInicialesComponent } from './../components/admin/conf-iniciales/conf-iniciales.component';
import { SolicitarConsecutivoComponent } from './../components/correspondencia/solicitar_consecutivo/solicitar-consecutivo.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardRouting] },
  { path: 'cambio_clave', component: CambioClaveComponent, canActivate: [GuardRouting] },
  { path: 'solicitar_consecutivo', component: SolicitarConsecutivoComponent },
  { path: '', component: AppRoot, canActivate: [GuardRouting] }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }