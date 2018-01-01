/**
 * DTO que contiene los atributos del paginador, se debe utilizar este DTO para
 * las consultas masivas del sistema
 * 
 * @author Carlos Andres Diaz
 * 
 */
export class PaginadorDTO {
    
    /** es la cantidad total de registros que tiene la tabla*/
    public totalRegistros: number;

    /** es la cantidad de filas por paginas*/
    public rowsPage: string;

    /** es el skip para firebird(10, 20, 30)*/
    public skip: string;
}