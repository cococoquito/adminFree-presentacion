import { URL_BASE } from './../../z-util/Constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

/**
 * Contiene los servicios para el modulo de Correspondencia
 */
@Injectable()
export class CorrespondenciaService {

    /** URL para el recurso de los datos init del modulo solicitar consecutivo */
    private static URL_INIT_SOLICITAR_CONSECUTIVOS = 'correspondencia/init_solicitar_consecutivo';

    /** Encabezado del request donde se especifica el tipo de contenido y el tipo de producer */
    private headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });

    /** Son las opciones donde se especifica en cada request */
    private options = new RequestOptions({ headers: this.headers });

    /**
     * Constructor del service
     * @param http , service para consumir los servicios
     */
    constructor(private http: Http) { }

    /**
     * Metodo que permite obtener los datos iniciales para el submodulo de
	 * solicitar consecutivo de correspondencia
     */
    public getDatosInitSolicitarConsecutivo(): Observable<Response> {
        return this.http.get(URL_BASE + CorrespondenciaService.URL_INIT_SOLICITAR_CONSECUTIVOS);
    }
}