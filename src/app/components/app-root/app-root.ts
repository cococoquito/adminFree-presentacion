import { SeguridadService } from './../../service/seguridad.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from './../../model/Usuario';
import { Subscription } from 'rxjs/Subscription';

/**
 * Componente Raiz de la app donde contiene HEADER, MENU, FOOTER, ROUTER, LOGIN
 */
@Component({
    selector: 'app-root',
    templateUrl: './app-root.html'
})
export class AppRoot implements OnInit, OnDestroy {

    /**Usuario autenticado en el sistema*/
    private userAutenticado: Usuario;

    /** Es la subscripción para las notificaciones cuando el user ingrese al sistema */
    private subscription: Subscription;

    /**
     * Constructor del componente Raiz app
     * @param seguridadService, service de seguridad
     */
    constructor(private seguridadService: SeguridadService) { }

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
}