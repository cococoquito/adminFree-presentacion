import { Router } from '@angular/router';
import { AlertService } from './../../../service/alert.service';
import { SeguridadService } from './../../../service/seguridad.service';
import { UtilitarioService } from './../../../service/utilitario.service';
import { HOME } from './../../../util/Constants';
import { UsuariosVO } from './../../../model/seguridad/UsuariosVO';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la autenticacion ante el sistema 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  /** variable que contiene los datos para la autenticacion */
  private user: UsuariosVO;

  /** bandera que identifica si ya se hizo submit */
  private submitted: boolean;

  /**
   * Constructor del componente para la autenticacion ante el sistema
   * @param utilService, service con las funciones utilitarias
   * @param seguridadService, service que contiene los servicioes para la seguridad 
   * @param alertService, service para la comunicacion del el mensaje de alerta
   * @param router, router para el manejo de redireccionamiento
   */
  constructor(
    private utilService: UtilitarioService,
    private seguridadService: SeguridadService,
    private alertService: AlertService,
    private router: Router) { }

  /**
   * Metodo que permite inicializar las variables del component
   */
  ngOnInit(): void {
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
   * Metodo que permite iniciar sesion sobre el sistema
   */
  private iniciarSesion(): void {
    
    // se muestra el modal de carga
    this.utilService.displayLoading(true);

    // se procede a iniciar sesion ante el sistema
    this.seguridadService.iniciarSesion(this.user).subscribe(
      data => {
        // se procede a notificar a los suscriptores que el usuario se autentico ante el sistema
        this.seguridadService.notificarUserAutenticado(data.json());

        // se procede a redireccionar a HOME
        this.router.navigate([HOME]);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      },
      error => {
        // se muestra el mensaje alert danger
        this.alertService.showAlert(error.text(), "alert alert-danger text_center", false);

        // se limpia todo ingresado por pantalla
        this.init();

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

    // se crea la instancia para el USER
    this.user = new UsuariosVO();
  }
}