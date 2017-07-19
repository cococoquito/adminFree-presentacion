import { URL_BASE } from './../util/Constants';
import { CommonDTO } from './../model/CommonDTO';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

/**
 * Service que contiene la logica especifica para administracion de condominios
 */
@Injectable()
export class AdminFreeService {

    /** URL para obtener los items del sistema */
    private static URL_LISTAR_ITEMS = 'general/listar_items';

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
     * Metodo que permite listar los items del sistema
     * @param parametro , indica que tipo de parametros necesita para consultar los items
     */
    public listarItems(parametro: CommonDTO): Observable<Response> {
        return this.http.post(URL_BASE + AdminFreeService.URL_LISTAR_ITEMS, parametro, this.options);
    }
}