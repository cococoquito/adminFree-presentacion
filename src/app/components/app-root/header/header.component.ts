import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from './../../../service/utilitario.service';
import { KEY_LOCAL_STORE_USER } from './../../../util/Constants';
import { Usuario } from './../../../model/Usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  /**
   * Constructor del componente Header del app
   * @param util, service utilitario
   */
  constructor(private util: UtilitarioService) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit() {
  }

  /**
   * Metodo que permite cerrar sesion del user autenticado
   */
  private cerrarSesion() {
    localStorage.removeItem(KEY_LOCAL_STORE_USER);
    window.location.reload();
  }

}