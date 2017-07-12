import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../components/home/home.component';
import { LoginComponent } from './../components/seguridad/login/login.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }