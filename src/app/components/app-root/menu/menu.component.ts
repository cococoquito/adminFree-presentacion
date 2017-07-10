import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../../model/Usuario';
import { UtilitarioService } from './../../../service/utilitario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  /**Usuario autenticado en el sistema*/
  private userAutenticado: Usuario;

  /**
   * Constructor del componente Header del app
   * @param util, service utilitario
   */
  constructor(private util: UtilitarioService) { }

  /**
  * Inicializa el componente una vez Angular haya mostrado las propiedades
  */
  ngOnInit() {

    //se configura el usuario autenticado
    this.setUsuarioAutenticado();
  }

  /**
   * Metodo que permite obtener el usuario autenticado en el sistema
   */
  private setUsuarioAutenticado(): void {
    this.userAutenticado = this.util.getUsuarioAutenticado();
  }
}