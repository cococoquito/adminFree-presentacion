import { ModuloDTO } from './../../c-model/a-admin/seguridad/ModuloDTO';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioLoginDTO } from './../../c-model/b-seguridad/UsuarioLoginDTO';
import { CAMBIO_CLAVE, RAIZ, HOME } from './../../z-util/Constants';
import { AdministradorService } from './../../b-service/a-admin/administrador.service';

/**
 * Componente Raiz de la app donde contiene HEADER, MENU, FOOTER, ROUTER, LOGIN
 */
@Component({
    selector: 'app-root',
    templateUrl: './app-root.html'
})
export class AppRoot implements OnInit, OnDestroy {

    /**Usuario autenticado en el sistema*/
    private userAutenticado: UsuarioLoginDTO;

    /** Es la subscripción para las notificaciones cuando el user ingrese al sistema */
    private subscription: Subscription;

    /**
     * Constructor del componente Raiz app
     * @param administradorService, contiene los servicios administrativo
     * @param router, Router de la app para redireccionar al login
     */
    constructor(
        private administradorService: AdministradorService,
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
    private cerrarSesion(): void {
        // se notifica el cierre de sesion
        this.administradorService.notificarUserLogout();

        // se procede a redireccionar a RAIZ
        this.router.navigate([RAIZ]);
    }

    /**
     * Metodo que permite abrir la pagina de cambio de clave
     */
    private showCambiarClave(): void {
        this.router.navigate([CAMBIO_CLAVE]);
    }

    /**
     * Metodo que permite abrir la pagina de HOME de la app
     */
    private showHome(): void {
        this.router.navigate([HOME]);
    }

    /**
     * Metodo que soporta el redireccionamiento para los items del menu
     * @param urlRouter , es la URL donde se prentende a redireccionar
     */
    private redireccionar(urlRouter: string): void {
        this.router.navigate([urlRouter]);
    }

    /**
     * Metodo que soporta el click para los modulos del menu
     * @param modulo , es el menu donde se ejecuto el click
     */
    private clickModulo(modulo: ModuloDTO): void {
        modulo.cerradoModulo = (modulo.cerradoModulo) ? false : true;
    }

    /**
     * Metodo que permite obtener la suscripcion de la autenticacion
     */
    private getSuscripcionAutenticacion(): void {
        this.subscription = this.administradorService.behaviorAutenticacion.subscribe(
            () => {
                this.userAutenticado = this.administradorService.getUsuarioAutenticado();
            }
        );
    }
}