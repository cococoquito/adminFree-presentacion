import { Component, OnInit } from '@angular/core';
import { CambioClaveDTO } from './../../../model/CambioClaveDTO';
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
  private cambioClave: CambioClaveDTO;

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
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit(): void {
    // se inicializa las variables globales
    this.init();
  }

  /**
   * Metodo que permite cambiar la clave en el sistema
   */
  private cambiarClave(): void {
    console.log(this.cambioClave);

    // se muestra el modal de carga
    this.utilService.displayLoading(true);

    // se procede a cambiar la clave del usuario
    this.seguridadService.cambiarClave(this.cambioClave).subscribe(
      data => {
        // se muestra el mensaje exitoso
        this.alertService.showAlert(data.json().mensaje, "alert alert-success text_center", false);

        // se inicializa las variables
        this.init();

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      },
      error => {
        // se muestra el mensaje alert danger
        this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      }
    );
  }

  /**
   * Metodo que permite inicializar las variables del component
   */
  private init(): void {
    this.cambioClave = new CambioClaveDTO();
    this.cambioClave.usuario = this.seguridadService.getUsuarioAutenticado();
  }
}