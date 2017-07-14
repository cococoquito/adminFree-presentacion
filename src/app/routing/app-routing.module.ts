import { GuardRouting } from './guards/guards-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../components/home/home.component';
import { LoginComponent } from './../components/seguridad/login/login.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuardRouting] },
  { path: 'home', component: HomeComponent, canActivate: [GuardRouting] },
  { path: '', component: LoginComponent, canActivate: [GuardRouting] }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }