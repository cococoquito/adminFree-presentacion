import { CommonVO } from './../a-admin/parametrizacion/CommonVO';
/**
 * Clase wrapper para los filtros de busqueda
 * 
 * @author Carlos andres diaz
 */
export class WrapperFilter {

    // es el filtro principal a envolver
    public filtro: any;

    // filtro por lista de nomenclaturas
    public nomenclaturasVO: Array<CommonVO>;

    // filtro por lista de estados
    public estadosVO: Array<CommonVO>;

    /**
     * Constructor del wrapper, se requiere el filtro principal
     * 
     * @param filtro , instancia del filtro principal a envolver
     */
    constructor(filtro: any) {
        this.filtro = filtro;
    }

    /**
     * Metodo que permite clonar los datos del filtro principal
     * 
     * @param clone , datos del filtro a clonar
     */
    public clone(clone: any): void {
        this.filtro.clone(clone);
    }

    /**
     * Metodo que permite configurar el filtro de busqueda para las nomenclaturas
     */
    public configurarNomenclaturas(): void {

        // se reinicia el filtro para las nomenclaturas
        this.filtro.nomenclaturas = null;

        // se valida si hay nomenclaturas seleccionadas
        if (this.nomenclaturasVO) {

            // se configura los consecutivos de las nomenclaturas seleccionadas
            this.filtro.nomenclaturas = new Array<number>();
            for (let item of this.nomenclaturasVO) {
                this.filtro.nomenclaturas.push(item.id);
            }
        }
    }

    /**
     * Metodo que permite configurar el filtro de busqueda para los estados
     */
    public configurarEstados(): void {

        // se reinicia el filtro para los estados
        this.filtro.estados = null;

        // se valida si hay estados seleccionadas
        if (this.estadosVO) {

            // se configura los consecutivos de los estados seleccionados
            this.filtro.estados = new Array<number>();
            for (let item of this.estadosVO) {
                this.filtro.estados.push(item.id);
            }
        }
    }
}