import { CAMBIO_CLAVE, RAIZ, HOME, CONF_INCIALES } from './../../util/Constants';
import { SeguridadService } from './../../service/seguridad.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioSessionDTO } from './../../model/UsuarioSessionDTO';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

/**
 * Componente Raiz de la app donde contiene HEADER, MENU, FOOTER, ROUTER, LOGIN
 */
@Component({
    selector: 'app-root',
    templateUrl: './app-root.html'
})
export class AppRoot implements OnInit, OnDestroy {

    /**Usuario autenticado en el sistema*/
    private userAutenticado: UsuarioSessionDTO;

    /** Es la subscripción para las notificaciones cuando el user ingrese al sistema */
    private subscription: Subscription;

    /**
     * Constructor del componente Raiz app
     * @param seguridadService, service de seguridad
     * @param router, Router de la app para redireccionar al login
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
     * Metodo que permite cerrar sesion del user autenticado
     */
    private cerrarSesion() {
        // se notifica el cierre de sesion
        this.seguridadService.notificarUserLogout();

        // se procede a redireccionar a RAIZ
        this.router.navigate([RAIZ]);
    }

    /**
     * Metodo que permite abrir la pagina de cambio de clave
     */
    private showCambiarClave() {
        this.router.navigate([CAMBIO_CLAVE]);
    }

    /**
     * Metodo que permite abrir la pagina de HOME de la app
     */
    private showHome() {
        this.router.navigate([HOME]);
    }

    /**
     * Metodo que permite abrir la pagina de configuraciones iniciales
     */
    private showConfigIniciales() {
        this.router.navigate([CONF_INCIALES]);
    }

    /**
     * Metodo que permite obtener la suscripcion de la autenticacion
     */
    private getSuscripcionAutenticacion(): void {
        this.subscription = this.seguridadService.behaviorAutenticacion.subscribe(
            () => {
                this.userAutenticado = this.seguridadService.getUsuarioAutenticado();
            }
        );
    }
}