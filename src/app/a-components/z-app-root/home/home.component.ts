import { UsuarioRes } from './../../../model/seguridad/UsuarioRes';
import { KEY_FECHA_INGRESO } from './../../../util/Constants';
import { SeguridadService } from './../../../service/seguridad.service';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la pagina HOME de la aplicacion
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  /**Fecha de ingreso a visualizar*/
  private dateNow: String;

  /**Usuario autenticado en el sistema*/
  private user: UsuarioRes;

  /**
   * Constructor del component de la pagina home
   * @param seguridadService, contiene las funciones de seguridad
   */
  constructor(
    private seguridadService: SeguridadService) { }

  /**
  * Inicializa el componente una vez Angular haya mostrado las propiedades
  */
  ngOnInit(): void {

    // se obtiene la fecha de ingreso del localstore
    this.dateNow = localStorage.getItem(KEY_FECHA_INGRESO);

    // se obtiene los datos del user autenticado del localstore
    this.user = this.seguridadService.getUsuarioAutenticado();
  }
}