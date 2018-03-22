import { WrapperFilter } from './../../z-common/WrapperFilter';
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

    /** filtro para los estados **/
    public estados: Array<number>;

    /** filtro para las nomenclaturas **/
    public nomenclaturas: Array<number>;

    /** filtro para los consecutivos **/
    public consecutivos: Array<string>;

    /** filtro para el usuario quien solicitó los consecutivos **/
    public user: number;

    /** Fecha inicial de la solicitud de los consecutivos **/
    public fechaInicial: Date;

    /** Fecha final de la solicitud de los consecutivos **/
    public fechaFinal: Date;

    /**
     * Metodo que permite copiar los atributos de otro filtro
     */
    public clone(clone: ConsecutivoSolicitadoFiltroDTO) {

        // se configura el filtro de busqueda por rango de fecha solicitud
        this.fechaFinal = new Date(clone.fechaFinal);
        this.fechaInicial = new Date(clone.fechaInicial);

        // se configura el filtro de busqueda del user quien solicito el consecutivo
        this.user = clone.user;

        // se configura el filtro de busqueda de consecutivos
        if (clone.consecutivos) {
            this.consecutivos = new Array<string>();
            for (let consecutivo of clone.consecutivos) {
                this.consecutivos.push(consecutivo);
            }
        }

        // se configura el filtro de busqueda de nomenclaturas
        if (clone.nomenclaturas) {
            this.nomenclaturas = new Array<number>();
            for (let nomenclatura of clone.nomenclaturas) {
                this.nomenclaturas.push(nomenclatura);
            }
        }

        // se configura el fltro de busqueda de estados
        if (clone.estados) {
            this.estados = new Array<number>();
            for (let estado of clone.estados) {
                this.estados.push(estado);
            }
        }
    }

    /**
     * Metodo que permite validar si este filtro 
     * es igual al que llega por parametro
     * 
     * @param clone , DTO a validar si son iguales
     */
    public equals(clone: WrapperFilter): boolean {
       if(this.user != clone.filtro.user){
         return false;
       }

       if (this.fechaInicial != clone.filtro.fechaInicial) {
           return false;
       }

       if (this.fechaFinal != clone.filtro.fechaFinal) {
           return false;
       }

       if(this.consecutivos && !clone.clone ){
          return false;
       }

       

       

    }
}