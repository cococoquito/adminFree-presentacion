import { UtilitarioService } from './../../service/utilitario.service';
import { Usuario } from './../../model/Usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  /**Fecha de ingreso a visualizar*/
  private dateNow: Date = new Date();
}
