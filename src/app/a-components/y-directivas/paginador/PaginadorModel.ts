import { PaginadorResponseDTO } from './PaginadorResponseDTO';
import { CANTIDAD_FILAS_POR_PAGINA_DEFAULT } from './../../../z-util/Constants';
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
        this.datos.init = true;
        this.datos.rowsPage = CANTIDAD_FILAS_POR_PAGINA_DEFAULT;
    }

    /**
     * Escuchador del scroller de la tabla que visualiza la pagina
     * @param event, evento ejecutado desde el scroll de la tabla
     */
    public scrollerListener(event: LazyLoadEvent): void {

        // se configura registro inicio y final a consultar
        this.datos.inicioR = event.first;
        this.datos.finalR = (event.first + event.rows);

        // se invoca el metodo a consultar los registros
        this.listener.paginar(this);
    }

    /**
     * Metodo que permite configurar lo registros consultados
     */
    public configurarRegistros(response: PaginadorResponseDTO): void {

        // se configura el total de registro solo si es la primera vez que se consulta
        if (this.datos.init) {
            this.datos.init = false;
            this.datos.totalRegistros = response.registrosTotal;
        }

        // se configura los registros consultados
        this.registros = response.registros;
    }
}