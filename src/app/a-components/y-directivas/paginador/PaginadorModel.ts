import { PaginadorResponseDTO } from './PaginadorResponseDTO';
import { PaginadorDTO } from './PaginadorDTO';
import { LazyLoadEvent } from 'primeng/primeng';

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

    /**
     * Constructor del modelo del paginador
     * @param listener , escuchador del controlador para invocar el metodo a consultar
     */
    constructor(listener: any) {

        // se configura el listener
        this.listener = listener;

        // se crea el DTO donde contiene los atributos del paginador
        this.datos = new PaginadorDTO();
    }

    /**
     * Escuchador del scroller de la tabla que visualiza la pagina
     * @param event, evento ejecutado desde el scroll de la tabla
     */
    public scrollerListener(event: LazyLoadEvent): void {

        // solo aplica si no es la misma pagina
        if (this.datos.skip != event.first || event.rows != this.datos.rowsPage) {

            // se configura el numero por paginas dado que puede llegar valores diferentes
            this.datos.rowsPage = event.rows;

            // se configura el skip para consultar paginadas FIREBIRD
            this.datos.skip = event.first;

            // se invoca el metodo a consultar los registros
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
}