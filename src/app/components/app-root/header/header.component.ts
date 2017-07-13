import { LOGIN } from './../../../util/Constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from './../../../service/seguridad.service';
import { Usuario } from './../../../model/Usuario';
import { Subscription } from 'rxjs/Subscription';

/**
 * Componente del Encabezado de la app donde contiene el logout, cuenta, notificaciones
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  /**Usuario autenticado en el sistema*/
  private userAutenticado: Usuario;

  /** es la subscripción para las notificaciones cuando el user ingrese al sistema */
  private subscription: Subscription;

  /**
   * Constructor del componente Header del app
   * @param seguridadService, seguridad service para la notificacion de la autenticacion
   */
  constructor(
    private seguridadService: SeguridadService,
    private router: Router) { }

  /**
   * Inicializa el componente una vez Angular haya mostrado las propiedades
   */
  ngOnInit(): void {
    // se obtiene la suscripcion para la notificacion cuando el user ingrese
    this.getSuscripcionAutenticacion();
  }

  /**
   * Se debe eliminar las subscripciones realizadas por el componente
   */
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Metodo que permite obtener la suscripcion de la autenticacion
   */
  private getSuscripcionAutenticacion(): void {
    this.subscription = this.seguridadService.behaviorAutenticacion.subscribe(
      (user: Usuario) => {
        this.userAutenticado = user;
      }
    );
  }

  /**
   * Metodo que permite cerrar sesion del user autenticado
   */
  private cerrarSesion() {
    // se notifica el cierre de sesion
    this.seguridadService.notificarUserLogout();

    // se procede a redireccionar a LOGIN
    this.router.navigate([LOGIN]);
  }
}