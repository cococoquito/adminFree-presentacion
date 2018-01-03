import { ROWS_PAGE_DEFAULT, SKIP_DEFAULT } from './../../../z-util/Constants';
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
    public rowsPage: number;

    /** es el skip para firebird(10, 20, 30)*/
    public skip: number;

    /**
     * Constructor de los datos del paginador
     */
    constructor() {

        // se configura los datos del paginador
        this.rowsPage = ROWS_PAGE_DEFAULT;
        this.reset();
    }

    /**
     * Metodo que permite configurar los valores de los datos del paginador
     */
    public reset(): void {
        this.skip = SKIP_DEFAULT;
        this.totalRegistros = null;
    }
}