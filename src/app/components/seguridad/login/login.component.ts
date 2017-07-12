import { Router } from '@angular/router';
import { AlertService } from './../../../service/alert.service';
import { SeguridadService } from './../../../service/seguridad.service';
import { UtilitarioService } from './../../../service/utilitario.service';
import { KEY_LOCAL_STORE_USER, HOME } from './../../../util/Constants';
import { Usuario } from './../../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  /** variable que contiene los datos para la autenticacion */
  private user: Usuario;

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
  ngOnInit() {
    this.user = new Usuario();
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
        // se configura el usuario en el localStorage
        this.utilService.setUsuarioAutenticado(data.json());

        // se recarga la pagina para que se refresca el header y el menu
        window.location.reload();

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