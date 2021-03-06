import { Component, OnInit } from '@angular/core';
import { CambioClaveDTO } from './../../../c-model/b-seguridad/CambioClaveDTO';
import { AlertService } from './../../../b-service/z-common/alert.service';
import { AdministradorService } from './../../../b-service/a-admin/administrador.service';
import { UtilitarioService } from './../../../b-service/z-common/utilitario.service';

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

  /** bandera que identifica si ya se hizo submit */
  private submitted: boolean;

  /**
   * Constructor del componente para el cambio de clave
   * @param utilService, service con las funciones utilitarias
   * @param AdministradorService, contiene los servicios administrativo
   * @param alertService, service para la comunicacion del el mensaje de alerta
   */
  constructor(
    private utilService: UtilitarioService,
    private administradorService: AdministradorService,
    private alertService: AlertService) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit(): void {
    // se inicializa las variables globales
    this.init();
  }

  /**
   * Metodo que permite establecer que el user ya hizo submitted
   */
  private onSubmit(): boolean {
    // se oculta el alert esto por si hay errores con el submit anterior
    this.alertService.hiddenAlert();

    // se notifica que el user hizo submitted
    this.submitted = true;
    return this.submitted;
  }

  /**
   * Metodo que permite cambiar la clave en el sistema
   */
  private cambiarClave(): void {
    
    // se muestra el modal de carga
    this.utilService.displayLoading(true);

    // se procede a cambiar la clave del usuario
    this.administradorService.cambiarClave(this.cambioClave).subscribe(
      data => {
        // se muestra el mensaje exitoso
        this.alertService.showAlert(data.text(), "alert alert-success text_center", false);

        // se inicializa las variables
        this.init();

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      },
      error => {
        // se muestra el mensaje alert danger
        this.alertService.showAlert(error.text(), "alert alert-danger text_center", false);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      }
    );
  }

  /**
   * Metodo que permite inicializar las variables del component
   */
  private init(): void {
    // incialmente la pantalla no se ha dado submit
    this.submitted = false;

    // se crea la instancia para el DTO cambio de clave
    this.cambioClave = new CambioClaveDTO();
    this.cambioClave.idUsuario = this.administradorService.getUsuarioAutenticado().usuario.idUsuario;
  }
}