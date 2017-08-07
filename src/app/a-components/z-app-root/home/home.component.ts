import { Component, OnInit } from '@angular/core';
import { UsuarioLoginDTO } from './../../../c-model/b-seguridad/UsuarioLoginDTO';
import { KEY_FECHA_INGRESO } from './../../../z-util/Constants';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';

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
  private user: UsuarioLoginDTO;

  /**
   * Constructor del component de la pagina home
   * @param AdministradorService, contiene los servicios administrativos
   */
  constructor(
    private administradorService: AdministradorService) { }

  /**
  * Inicializa el componente una vez Angular haya mostrado las propiedades
  */
  ngOnInit(): void {

    // se obtiene la fecha de ingreso del localstore
    this.dateNow = localStorage.getItem(KEY_FECHA_INGRESO);

    // se obtiene los datos del user autenticado del localstore
    this.user = this.administradorService.getUsuarioAutenticado();
  }
}