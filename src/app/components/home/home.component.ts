import { Component } from '@angular/core';

/**
 * Componente para la pagina HOME de la aplicacion
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  /**Fecha de ingreso a visualizar*/
  private dateNow: Date = new Date();
}
