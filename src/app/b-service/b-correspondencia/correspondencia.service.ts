import { PaginadorDTO } from './../../a-components/y-directivas/paginador/PaginadorDTO';
import { ConsecutivoCorrespondenciaDTO } from './../../c-model/c-correspondencia/solicitar_consecutivo/ConsecutivoCorrespondenciaDTO';
import { URL_BASE } from './../../z-util/Constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

/**
 * Contiene los servicios para el modulo de Correspondencia
 */
@Injectable()
export class CorrespondenciaService {

    /** Path raiz de los servicios REST del modulo de correspondencia */
    private static PATH = 'correspondencia/';

    /** Path del recurso para obtener los datos iniciales del submodulo solicitar consecutivo */
    private static PATH_INIT_SOLICITAR_CONSECUTIVO = 'init_solicitar_consecutivo';

    /** Path del recurso para solicitar un consecutivo de correspondencia*/
    private static PATH_SOLICITAR_CONSECUTIVO = 'solicitar_consecutivo';

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
        return this.http.get(URL_BASE + CorrespondenciaService.PATH + CorrespondenciaService.PATH_INIT_SOLICITAR_CONSECUTIVO);
    }

    /**
     * Metodo que permite generar un consecutivo de correspondencia para el anio actual
     * @param consecutivo , correspondencia, Datos de los valores relacionados al consecutivo
     */
    public solicitarConsecutivoAnioActual(consecutivo: ConsecutivoCorrespondenciaDTO): Observable<Response> {
        return this.http.post(URL_BASE + CorrespondenciaService.PATH + CorrespondenciaService.PATH_SOLICITAR_CONSECUTIVO, consecutivo, this.options);
    }

    public getConsecutivosSolicitados(paginador: PaginadorDTO) : Observable<Response> {
        return this.http.post(URL_BASE + CorrespondenciaService.PATH + CorrespondenciaService.PATH_SOLICITAR_CONSECUTIVO, this.options);
    }
}