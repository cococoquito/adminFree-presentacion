import { CANTIDAD_FILAS_POR_PAGINA_DEFAULT, ROWS_PER_PAGE_OPTIONS } from './../../../z-util/Constants';
import { PaginadorResponseDTO } from './PaginadorResponseDTO';
import { PaginadorDTO } from './PaginadorDTO';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';

/**
 * Clase que contiene el modelo del paginador, se debe utilizar esta clase para
 * las consultas masivas del sistema
 * 
 * @author Carlos Andres Diaz
 */
export class PaginadorModel {

    /** Indica si es la primera invocacion del metodo paginar*/
    public esPrimerInvocacion: boolean;

    /** son los registros a visualizar por pantalla*/
    public registros: Array<any>;

    /** son los datos del paginador*/
    public datos: PaginadorDTO;

    /** define el metodo que se invocara al momento de interactuar con el paginador*/
    public listener: any;

    /** Es la cantidad de filas por default*/
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
        this.rowsDefault = CANTIDAD_FILAS_POR_PAGINA_DEFAULT;

        // se configura las opciones que tiene el paginador
        this.rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS;

        /** Indica si es la primera invocacion del metodo paginar*/
        this.esPrimerInvocacion = true;
    }

    /**
     * Escuchador del scroller de la tabla que visualiza la pagina
     * @param event, evento ejecutado desde el scroll de la tabla
     */
     public scrollerListener(event: LazyLoadEvent): void {

         // los valores first y rows se pasa a string
         let first = event.first + "";
         let rows = event.rows + "";

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

        // se configura el total de registro solo si es la primera vez que se consulta
        if (!this.datos.totalRegistros) {
            this.datos.totalRegistros = response.registrosTotal;
        }

        // se configura los registros consultados
        this.registros = response.registros;
    }

    /**
     * Metodo que soporta el evento click del boton filtrar
     * 
     * @param dataTable , tabla asociada al paginador
     */
    public filtrar(dataTable: DataTable): void {

        // se ejecuta el filtrar del listener
        this.listener.filtrar(this);

        // se resetea el estado del paginador
        this.reset(dataTable);

    }

    /**
     * Metodo que soporta el evento click del boton limpiar filtro
     * 
     * @param dataTable , tabla asociada al paginador
     */
    public limpiarFiltro(dataTable: DataTable): void {

        // se ejecuta el limpiar filtro del listener
        this.listener.limpiarFiltro(this);

        // se resetea el estado del paginador
        this.reset(dataTable);
    }

    /**
     * Metodo que permite resetear el paginador
     * 
     * @param dataTable , tabla asociada al paginador
     */
    private reset(dataTable: DataTable): void {

        // se limpia el total de registro, esto con el fin para que sea de nuevo calculado
        this.datos.totalRegistros = null;

        // se limpia los registros consultado con anterioridad
        this.registros = null;

        // se resetea el estado del paginador
        dataTable.reset();
    }
}