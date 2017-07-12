import { URL_BASE } from './../util/Constants';
import { Usuario } from './../model/Usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

/**
 * Service que contiene las funciones para la seguridad del sistema
 */
@Injectable()
export class SeguridadService {

    /** URL para el recurso de autenticacion en el sistema */
    private static URL_AUTENTICACION = 'general/iniciarSesion';

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
    public iniciarSesion(user: Usuario): Observable<Response> {
        return this.http.post(URL_BASE + SeguridadService.URL_AUTENTICACION, user, this.options);
    }
}