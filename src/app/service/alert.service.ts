import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/**
 * Service que soporta las acciones del componente de alerta de la app
 */
@Injectable()
export class AlertService {

    /** Se utiliza para la comunicacion de los component con el alert */
    private subject: Subject<any>;

    /** Bandera que indica si se debe mantener el mensaje de alert despues de un redireccionamiento*/
    private keepAfterNavigationChange: boolean;

    /**
     * Constructor del service del alert
     * @param router, Es el component router para la manipulacion de los redireccionamiento
     */
    constructor(private router: Router) {
        // se inicializa las variables globales
        this.init();

        // se obtiene la suscripcion del router esto para detectar cuando cambia
        this.getSubcripcionRouter();
    }

    /**
     * Metodo que permite visualizar el mensaje de alerta
     * @param message, mensaje a notificar al componente
     * @param styleClass, estilos aplicado al componente (alert-success, alert-danger, text_center)
     * @param keepAfterNavigationChange, indica si se debe mantener el alert despues del redireccionamiento
     */
    public showAlert(message: string, styleClass: string, keepAfterNavigationChange: boolean): void {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ text: message, clasStyle: styleClass });
    }

    /**
     * Retorna el observador del subject para las notificaciones
     */
    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
     * Metodo que permite inicializar las variables globales del service
     */
    private init(): void {
        this.subject = new Subject<any>();
        this.keepAfterNavigationChange = false;
    }

    /**
     * Se procede a suscribirse a los eventos del router esto para identificar 
     * si se debe limpiar el mensaje o mantener el mensaje en la siguiente pagina a visualizar
     */
    private getSubcripcionRouter(): void {
        // limpia el mensaje de alerta cuando el router cambia
        this.router.events.subscribe(event => {

            // se detecta si el evento del router es una nueva navegacion
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // Solo se guarda para un solo cambio de ubicación
                    this.keepAfterNavigationChange = false;
                } else {
                    // limpia el component alert
                    this.subject.next();
                }
            }
        });
    }
}