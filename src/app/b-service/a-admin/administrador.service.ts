import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { CambioClaveDTO } from './../../model/seguridad/CambioClaveDTO';
import { UsuarioLoginDTO } from './../../model/seguridad/UsuarioLoginDTO';
import { UsuariosVO } from './../../model/seguridad/UsuariosVO';
import { URL_BASE, KEY_LOCAL_STORE_USER, KEY_FECHA_INGRESO } from './../../util/Constants';

/**
 * Contiene los servicios para el modulo de Administrador y de Seguridad
 */
@Injectable()
export class AdministradorService {

    /** se utiliza para las notificaciones cuando el usuario se autentica */
    public behaviorAutenticacion: BehaviorSubject<UsuarioLoginDTO> = new BehaviorSubject<UsuarioLoginDTO>(null);

    /** URL para el recurso de autenticacion en el sistema */
    private static URL_INICIAR_SESION = 'admin/iniciar_sesion';

    /** URL para el recurso de cambio de clave */
    private static URL_CAMBIAR_CLAVE = 'admin/cambiar_clave';

    /** URL para listar los modulos del sistema */
    private static URL_LISTAR_MODULOS = 'admin/listar_modulos';

    /** URL para listar los ROLES del sistema */
    private static URL_LISTAR_ROLES = 'admin/listar_roles';

    /** URL para obtener el ROLE de acuerdo a su ID */
    private static URL_GET_ROLE = 'admin/role/';

    /** Encabezado del request donde se especifica el tipo de contenido y el tipo de producer */
    private headers = new Headers({ 'Content-Type': 'application/json' });

    /** Son las opciones donde se especifica en cada request */
    private options = new RequestOptions({ headers: this.headers });

    /**
     * Constructor del service
     * @param http , service para consumir los servicios
     * @param datePipe , pipe para los formatos de la fecha
     */
    constructor(private http: Http, private datePipe: DatePipe) { }

    /**
     * Metodo que permite iniciar sesion sobre la APP
     * @param user, usuario que intenta autenticarse en el sistema
     */
    public iniciarSesion(user: UsuariosVO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.URL_INICIAR_SESION, user, this.options);
    }

    /**
     * Metodo que permite cambiar la clave del usuario autenticado
     * @param cambioClave, DTO con los datos de la nueva clave a cambiar
     */
    public cambiarClave(cambioClave: CambioClaveDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdministradorService.URL_CAMBIAR_CLAVE, cambioClave, this.options);
    }

    /**
     * Metodo que permite obtener todos los modulos del sistema
     */
    public getModulosItems(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.URL_LISTAR_MODULOS);
    }

    /**
     * Metodo que permite obtener todos los ROLES del sistema
     */
    public getRoles(): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.URL_LISTAR_ROLES);
    }

    /**
     * Metodo que permite obtener el detalle del ROLE
     * @param idRole , identificador del ROLE
     */
    public getDetalleRole(idRole: number): Observable<Response> {
        return this.http.get(URL_BASE + AdministradorService.URL_GET_ROLE + idRole);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario esta autenticado
     * @param user, usuario autenticado en el sistema
     */
    public notificarUserAutenticado(user: UsuarioLoginDTO): void {
        // se almacena el usuario y la fecha de ingreso en el local storage
        localStorage.setItem(KEY_LOCAL_STORE_USER, JSON.stringify(user));
        localStorage.setItem(KEY_FECHA_INGRESO, this.datePipe.transform(new Date(), 'dd/MM/yyyy - h:mma'));

        // se notifica a los suscriptores que el user se encuentra autenticado
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite notificar a los susbcritores que el usuario cerro session
     */
    public notificarUserLogout() {
        // se elimina el usuario y la fecha de ingreso del localStorage
        localStorage.removeItem(KEY_LOCAL_STORE_USER);
        localStorage.removeItem(KEY_FECHA_INGRESO);

        // se notifica a los suscriptores que el user se encuentra logout
        this.behaviorAutenticacion.next(null);
    }

    /**
     * Metodo que permite obtener el usuario autenticado en el sistema
     */
    public getUsuarioAutenticado(): UsuarioLoginDTO {
        let userIn = localStorage.getItem(KEY_LOCAL_STORE_USER);
        if (userIn) {
            return JSON.parse(userIn);
        }
        return null;
    }
}