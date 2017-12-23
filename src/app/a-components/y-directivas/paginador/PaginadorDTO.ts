/**
 * DTO que contiene los atributos del paginador, se debe utilizar este DTO para
 * las consultas masivas del sistema
 * 
 * @author Carlos Andres Diaz
 * 
 */
export class PaginadorDTO {

    /** bandera que indica si es la primera vez que se ejecuta la consulta */
    public init: boolean;

    /** es la cantidad total de registros que tiene la tabla*/
    public totalRegistros: number;

    /** es el total de items por pagina*/
    public rowsPage: number;

    /** es el registro inicial a consultar*/
    public inicioR: number;

    /** es el registro final a consultar*/
    public finalR: number;
}