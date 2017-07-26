import { CambioClaveDTO } from './../model/seguridad/CambioClaveDTO';
import { UsuarioSessionDTO } from './../model/seguridad/UsuarioSessionDTO';
import { UsuariosVO } from './../model/seguridad/UsuariosVO';
import { URL_BASE, KEY_LOCAL_STORE_USER } from './../util/Constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

/**
 * Service que contiene las funciones para la seguridad del sistema
 */
@Injectable()
export class SeguridadService {

    /** se utiliza para las notificaciones cuando el usuario se autentica */
    public behaviorAutenticacion: BehaviorSubject<UsuarioSessionDTO> = new BehaviorSubject<UsuarioSessionDTO>(null);

    /** URL para el recurso de autenticacion en el sistema */
    private static URL_AUTENTICACION = 'admin/iniciar_sesion';

    /** URL para el recurso de cambio de clave */
    private static URL_CAMBIO_CLAVE = 'admin/cambiar_clave';

    /** Encabezado del request donde se especifica el tipo de contenido y el tipo de producer */
    private headers = new Headers({ 'Content-Type': 'application/json' });

    /** Son las opciones donde se especifica en cada request */
    private options = new RequestOptions({ headers: this.headers });

    /**
     * Constructor del service
     * @param http, service para consumir los servicios
     */
    constructor(private http: Http) { }

    /**
     * Metodo que permite iniciar sesion sobre la APP
     * @param user, usuario que intenta autenticarse en el sistema
     */
    public iniciarSesion(user: UsuariosVO): Observable<Response> {
        return this.http.post(URL_BASE + SeguridadService.URL_AUTENTICACION, user, this.options);
    }

    /**
     * Metodo que permite cambiar la clave del usuario autenticado
     * @param cambioClave, DTO con los datos de la nueva clave a cambiar
     */
    public cambiarClave(cambioClave: CambioClaveDTO): Observable<Response> {
        return this.http.post(URL_BASE + SeguridadService.URL_CAMBIO_CLAVE, cambioClave, this.options);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario esta autenticado
     * @param user, usuario autenticado en el sistema
     */
    public notificarUserAutenticado(user: UsuarioSessionDTO): void {
        // se almacena el usuario en el local storage
        localStorage.setItem(KEY_LOCAL_STORE_USER, JSON.stringify(user));

        // se notifica a los suscriptores que el user se encuentra autenticado
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario cerro session
     */
    public notificarUserLogout() {
        // se elimina el usuario del localStorage
        localStorage.removeItem(KEY_LOCAL_STORE_USER);

        // se notifica a los suscriptores que el user se encuentra logout
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite obtener el usuario autenticado en el sistema
     */
    public getUsuarioAutenticado(): UsuarioSessionDTO {
        let userIn = localStorage.getItem(KEY_LOCAL_STORE_USER);
        if (userIn) {
            return JSON.parse(userIn);
        }
        return null;
    }
}