import { ROWS_PER_PAGE_OPTIONS } from './../../../z-util/Constants';
import { PaginadorResponseDTO } from './PaginadorResponseDTO';
import { PaginadorDTO } from './PaginadorDTO';
import { DataTable } from 'primeng/primeng';

/**
 * Clase que contiene el modelo del paginador, se debe utilizar esta clase para
 * las consultas masivas del sistema
 * 
 * @author Carlos Andres Diaz
 */
export class PaginadorModel {

    /** son los registros a visualizar por pantalla*/
    public registros: Array<any>;

    /** son los datos del paginador*/
    public datos: PaginadorDTO;

    /** define el metodo que se invocara al momento de interactuar con el paginador*/
    public listener: any;

    /** Es el nro de filas por paginas por default*/
    private rowsDefault: number;

    /** son las opciones para el tamanio de cada pagina (10,20,30,40,50)*/
    private rowsPerPageOptions: Array<number>;

    /**
     * Constructor del modelo del paginador
     * @param listener , escuchador del controlador para invocar el metodo a consultar
     */
    constructor(listener: any) {

        // se configura el listener
        this.listener = listener;

        // se crea el DTO donde contiene los atributos del paginador
        this.datos = new PaginadorDTO();

        // se configura la cantidad de filas por default
        this.rowsDefault = this.datos.rowsPage;

        // se configura las opciones que tiene el paginador
        this.rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS;
    }

    /**
     * Escuchador del scroller de la tabla asociada al paginador
     * 
     * @param event, evento ejecutado desde el scroll de la tabla
     */
    public scrollerListener(event): void {

        // se valida cuales datos se deben tomar
        let first = (event) ? event.first : this.datos.skip;
        let rows = (event) ? event.rows : this.datos.rowsPage;

        // aplica cuando no sea la misma pagina o el usuario cambio el valor filas por paginas
        // O el totalRegistros es null por algun reinicio del filtro de busqueda
        if (this.datos.skip != first ||
            this.datos.rowsPage != rows ||
            this.datos.totalRegistros == null) {

            // se configura el numero por paginas dado que puede llegar valores diferentes
            this.datos.rowsPage = rows;

            // se configura el skip para consultas paginadas en FIREBIRD
            this.datos.skip = first;

            // se invoca el metodo paginar del listener
            this.listener.paginar(this);
        }
    }

    /**
     * Metodo que permite configurar lo registros consultados
     */
    public configurarRegistros(response: PaginadorResponseDTO): void {

        // se configura el total de registros solamente para la 1 invocacion
        if (!this.datos.totalRegistros) {

            // se configura el total de registros
            this.datos.totalRegistros = response.registrosTotal;
        }

        // se configura los registros consultados
        this.registros = response.registros;
    }

    /**
     * Metodo que soporta el evento click del boton filtrar
     * 
     * @param table, tabla asociada al paginador
     */
    public filtrar(table: DataTable): void {

        // dependiendo de lo que retorne el listener se to reset el paginador
        if (this.listener.filtrar(this)) {
            this.reset(table);
        }
    }

    /**
     * Metodo que soporta el evento click del boton limpiar filtro
     * 
     * @param table, tabla asociada al paginador
     */
    public limpiarFiltro(table: DataTable): void {

        // dependiendo de lo que retorne el listener se to reset el paginador
        if (this.listener.limpiarFiltro(this)) {
            this.reset(table);
        }
    }

    /**
     * Metodo que permite to reset el paginador de la tabla
     *
     * @param table, tabla asociada al paginador
     */
    private reset(table: DataTable): void {

        // se to reset el paginador, esto con el fin para que sea de nuevo calculado
        this.datos.reset();

        // se to reset el paginador de la tabla
        table.reset();

        // se limpia los registros consultado con anterioridad
        this.registros = null;

        // se ejecutar el paginador
        this.scrollerListener(null);
    }
}