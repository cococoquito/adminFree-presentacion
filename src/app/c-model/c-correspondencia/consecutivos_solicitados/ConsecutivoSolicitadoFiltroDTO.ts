import { PaginadorDTO } from './../../../a-components/y-directivas/paginador/PaginadorDTO';

/**
 * Clase que mapea los filtros de busqueda para los consecutivos de
 * correspondencia solicitados
 * 
 * @author Carlos Andres Diaz
 */
export class ConsecutivoSolicitadoFiltroDTO {

    /** paginador para la consulta los consecutivos **/
    public paginador: PaginadorDTO;

    /** Fecha inicial de la solicitud de los consecutivos **/
    public fechaInicial: Date;

    /** Fecha final de la solicitud de los consecutivos **/
    public fechaFinal: Date
}