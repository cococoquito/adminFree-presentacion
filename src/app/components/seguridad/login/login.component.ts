import { Router } from '@angular/router';
import { AlertService } from './../../../service/alert.service';
import { SeguridadService } from './../../../service/seguridad.service';
import { UtilitarioService } from './../../../service/utilitario.service';
import { HOME } from './../../../util/Constants';
import { UsuarioDTO } from './../../../model/UsuarioDTO';
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
  private user: UsuarioDTO;

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
    this.user = new UsuarioDTO();
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
        this.alertService.showAlert(error.json().mensaje, "alert alert-danger text_center", false);

        // se cierra el modal de carga
        this.utilService.displayLoading(false);
      }
    );
  }
}