import { Component, OnInit } from '@angular/core';
import { CambioClave } from './../../../model/CambioClave';
import { AlertService } from './../../../service/alert.service';
import { SeguridadService } from './../../../service/seguridad.service';
import { UtilitarioService } from './../../../service/utilitario.service';

/**
 * Componente para el cambio de la contrasenia
 */
@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html'
})
export class CambioClaveComponent implements OnInit {

  /** variable que contiene los datos para el cambio de clave */
  private cambioClave: CambioClave;

  /**
   * Constructor del componente para el cambio de clave
   * @param utilService, service con las funciones utilitarias
   * @param seguridadService, service que contiene los servicioes para la seguridad 
   * @param alertService, service para la comunicacion del el mensaje de alerta
   */
  constructor(
    private utilService: UtilitarioService,
    private seguridadService: SeguridadService,
    private alertService: AlertService) { }

  /**
   * Metodo que permite inicializar las variables del component
   */
  ngOnInit(): void {
    this.cambioClave = new CambioClave();
  }

  /**
   * Metodo que permite cambiar la clave en el sistema
   */
  private cambiarClave() {
    console.log("clave actual:"+this.cambioClave.claveActual);
    console.log("clave nueva:"+this.cambioClave.claveNueva);
    console.log("clave nueva again:"+this.cambioClave.repetirClaveNueva);
  }
}
